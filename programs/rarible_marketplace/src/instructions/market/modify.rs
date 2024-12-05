use anchor_lang::prelude::*;

use crate::state::*;

#[derive(AnchorDeserialize, AnchorSerialize, Clone)]
pub struct ModifyMarketParams {
    pub fee_recipient: Pubkey,
    pub fee_bps: u64,
}

#[derive(Accounts)]
#[instruction()]
#[event_cpi]
pub struct ModifyMarket<'info> {
    #[account(mut,
        constraint = market.initializer == initializer.key())]
    pub initializer: Signer<'info>,
    #[account()]
    /// CHECK: doesn't actually need to be a mint
    pub market_identifier: UncheckedAccount<'info>,
    #[account(mut,
        seeds = [MARKET_SEED,
        market_identifier.key().as_ref()],
        bump,
    )]
    pub market: Box<Account<'info, Market>>,
    pub system_program: Program<'info, System>,
}

#[inline(always)]
pub fn handler(ctx: Context<ModifyMarket>, params: ModifyMarketParams) -> Result<()> {
    msg!("Modify existing market");
    Market::modify_fee(
        &mut ctx.accounts.market,
        params.fee_recipient,
        params.fee_bps,
    );

    Ok(())
}
