use anchor_lang::prelude::*;
use rarible_editions::EditionsDeployment;
use crate::EditionsControls;

#[derive(Accounts)]
pub struct TransferOwnershipCtx<'info> {
    /// CHECK: Only used for validation
    #[account()]
    pub editions_deployment: Account<'info, EditionsDeployment>,

    #[account(
        mut,
        seeds = [b"editions_controls", editions_deployment.key().as_ref()],
        bump,
        constraint = editions_controls.creator == current_owner.key()
    )]
    pub editions_controls: Box<Account<'info, EditionsControls>>,

    #[account(mut)]
    pub current_owner: Signer<'info>,

    /// CHECK: Can be any account that will become the new owner
    pub new_owner: UncheckedAccount<'info>,

}

pub fn handler(ctx: Context<TransferOwnershipCtx>) -> Result<()> {
    // Update the creator in editions_controls only
    ctx.accounts.editions_controls.creator = ctx.accounts.new_owner.key();

    Ok(())
} 