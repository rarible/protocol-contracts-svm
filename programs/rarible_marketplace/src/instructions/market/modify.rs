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
    #[account(mut)]
    pub initializer: Signer<'info>,
    #[account()]
    /// CHECK: doesn't actually need to be a mint
    pub market_identifier: UncheckedAccount<'info>,
    #[account(
        seeds = [MARKET_SEED,
        market_identifier.key().as_ref()],
        bump,
        constraint = market.initializer == initializer.key()
    )]
    pub market: Box<Account<'info, Market>>,
    pub system_program: Program<'info, System>,
}

#[inline(always)]
pub fn handler(ctx: Context<ModifyMarket>, params: ModifyMarketParams) -> Result<()> {
    msg!("Modify existing market");
    let market = &mut ctx.accounts.market;

    market.fee_recipient = params.fee_recipient;
    market.fee_bps = params.fee_bps;

    emit_cpi!(Market::get_edit_event(
        &mut ctx.accounts.market.clone(),
        ctx.accounts.market.key(),
        MarketEditType::Modify
    ));
    Ok(())
}
