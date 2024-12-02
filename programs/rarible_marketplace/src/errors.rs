use anchor_lang::prelude::*;

#[error_code]
pub enum MarketError {
    #[msg("Account passed in incorrectly")]
    WrongAccount,
    #[msg("Order too small")]
    InsufficientOrderSize,
    #[msg("Amount overflow")]
    AmountOverflow,
    #[msg("Amount underflow")]
    AmountUnderflow,
    #[msg("Unsupported NFT Type")]
    UnsupportedNft,
    #[msg("Invalid NFT for Market")]
    InvalidNft,
    #[msg("Invalid Royalties Account")]
    InvalidRoyaltiesAccount,
    #[msg("Invalid Royalties Percentage")]
    InvalidRoyaltyPercentage,
    #[msg("Total Royalty Percentage Exceeded")]
    TotalRoyaltyPercentageExceeded,
    #[msg("Not Enough Remaining Accounts")]
    NotEnoughRemainingAccounts,
}
