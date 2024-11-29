use anchor_lang::prelude::*;

#[derive(AnchorDeserialize, AnchorSerialize, Clone)]
pub struct CreatorWithShare {
    pub address: Pubkey,
    pub share: u8,
}

#[derive(AnchorDeserialize, AnchorSerialize, Clone)]
pub struct UpdateRoyaltiesArgs {
    pub royalty_basis_points: u16,
    pub creators: Vec<CreatorWithShare>,
}

pub mod add;
pub mod modify;
pub mod transfer_hook;

pub use add::*;
pub use modify::*;
pub use transfer_hook::*;
