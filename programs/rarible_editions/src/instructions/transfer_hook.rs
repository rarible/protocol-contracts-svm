use anchor_lang::prelude::*;
use anchor_spl::token_interface::{
    Mint, TokenAccount,
    spl_token_2022::extension::transfer_hook::TransferHook,
};
use spl_transfer_hook_interface::instruction::ExecuteInstruction;
use spl_tlv_account_resolution::state::ExtraAccountMetaList;

use crate::{
    errors::TransferError,
    utils::{get_metadata_from_mint, get_royalty_basis_points, get_creators, get_extension_data, get_creator_token_account},
};

#[derive(Accounts)]
pub struct TransferHook<'info> {
    #[account(
        token::mint = mint,
        token::authority = owner,
    )]
    pub source_token: InterfaceAccount<'info, TokenAccount>,
    pub mint: InterfaceAccount<'info, Mint>,
    #[account(
        token::mint = mint,
    )]
    pub destination_token: InterfaceAccount<'info, TokenAccount>,
    /// CHECK: source token account owner
    pub owner: UncheckedAccount<'info>,
    /// CHECK: ExtraAccountMetaList Account
    #[account(
        seeds = [b"extra-account-metas", mint.key().as_ref()],
        bump
    )]
    pub extra_account_meta_list: UncheckedAccount<'info>,
    /// CHECK: Metadata account storing royalty info
    pub metadata: UncheckedAccount<'info>,
}

pub fn handle_transfer_hook(ctx: Context<TransferHook>, amount: u64) -> Result<()> {
    // Verify this is being called during a transfer
    assert_is_transferring(&ctx)?;

    // Get royalty info from metadata
    let metadata = get_metadata_from_mint(&ctx.accounts.mint.to_account_info())?;
    let royalty_basis_points = get_royalty_basis_points(&metadata)?;
    let creators = get_creators(&metadata)?;

    // Calculate royalty amounts for each creator
    let total_royalty = (amount * royalty_basis_points as u64) / 10000;
    
    for creator in creators {
        let creator_amount = (total_royalty * creator.share as u64) / 100;
        
        // Get creator's token account
        let creator_token_account = get_creator_token_account(
            &creator.address,
            &ctx.accounts.mint.key(),
            &ctx.accounts.token_program.key(),
        );

        // Create creator's token account if it doesn't exist
        if ctx.accounts.token_program.to_account_info().data_is_empty() {
            anchor_spl::associated_token::create(
                CpiContext::new(
                    ctx.accounts.token_program.to_account_info(),
                    anchor_spl::associated_token::Create {
                        payer: ctx.accounts.owner.to_account_info(),
                        associated_token: creator_token_account.to_account_info(),
                        authority: creator.address.to_account_info(),
                        mint: ctx.accounts.mint.to_account_info(),
                        system_program: ctx.accounts.system_program.to_account_info(),
                        token_program: ctx.accounts.token_program.to_account_info(),
                    },
                ),
            )?;
        }
        
        // Transfer royalty to creator
        anchor_spl::token_interface::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                anchor_spl::token_interface::Transfer {
                    from: ctx.accounts.source_token.to_account_info(),
                    to: creator_token_account.to_account_info(),
                    authority: ctx.accounts.owner.to_account_info(),
                },
            ),
            creator_amount,
        )?;
    }

    Ok(())
}

fn assert_is_transferring(ctx: &Context<TransferHook>) -> Result<()> {
    let source_token_info = ctx.accounts.source_token.to_account_info();
    let extension = get_extension_data::<TransferHook>(&mut source_token_info)?;

    if !bool::from(extension.transferring) {
        return Err(error!(TransferError::IsNotCurrentlyTransferring));
    }

    Ok(())
} 