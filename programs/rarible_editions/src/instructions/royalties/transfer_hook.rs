use anchor_lang::prelude::*;
use solana_program::{
    program::invoke,
    system_instruction,
    pubkey::Pubkey,
};
use std::str::FromStr;
use crate::{ROYALTY_BASIS_POINTS_FIELD, utils::get_mint_metadata};

#[derive(Accounts)]
pub struct TransferHookContext<'info> {
    /// CHECK: This is the mint account of the token being transferred, verified through the token program
    #[account(mut)]
    pub mint: AccountInfo<'info>,
    
    /// CHECK: This is the source token account, verified through the token program
    #[account(mut)]
    pub source: AccountInfo<'info>,
    
    /// CHECK: This is the destination token account, verified through the token program
    #[account(mut)]
    pub destination: AccountInfo<'info>,
    
    /// CHECK: This is the authority (owner/delegate) of the source account, verified through the token program
    pub authority: AccountInfo<'info>,
    
    /// System program for transfers
    pub system_program: Program<'info, System>,
}

pub fn process_transfer_hook(
    ctx: Context<TransferHookContext>,
    amount: u64,
) -> Result<()> {
    msg!("Processing transfer hook for amount: {}", amount);

    // Get royalty info from mint metadata
    let metadata = get_mint_metadata(&mut ctx.accounts.mint)?;
    
    // Find royalty basis points in additional metadata
    let royalty_basis_points = metadata
        .additional_metadata
        .iter()
        .find(|(key, _)| key == ROYALTY_BASIS_POINTS_FIELD)
        .map(|(_, value)| value.parse::<u16>().unwrap())
        .unwrap_or(0);

    msg!("Royalty basis points: {}", royalty_basis_points);

    if royalty_basis_points == 0 {
        msg!("No royalties configured");
        return Ok(());
    }

    // Calculate total royalty amount
    let total_royalty = (amount * royalty_basis_points as u64) / 10000;
    msg!("Total royalty amount: {}", total_royalty);

    // Process royalty payments to each recipient
    let mut remaining_royalty = total_royalty;
    
    // Iterate through metadata to find creator addresses and their shares
    for (key, share) in metadata.additional_metadata.iter() {
        if let Ok(recipient) = Pubkey::from_str(key) {
            if let Ok(share_percentage) = share.parse::<u8>() {
                let recipient_amount = (total_royalty * share_percentage as u64) / 100;
                remaining_royalty = remaining_royalty.saturating_sub(recipient_amount);
                
                msg!(
                    "Transferring {} to recipient {} ({}% share)", 
                    recipient_amount, 
                    recipient, 
                    share_percentage
                );

                // Transfer royalty to recipient
                invoke(
                    &system_instruction::transfer(
                        ctx.accounts.authority.key,
                        &recipient,
                        recipient_amount,
                    ),
                    &[
                        ctx.accounts.authority.to_account_info(),
                        ctx.accounts.system_program.to_account_info(),
                    ],
                )?;
            }
        }
    }

    Ok(())
}
