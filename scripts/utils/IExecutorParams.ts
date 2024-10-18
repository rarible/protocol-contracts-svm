import { AnchorWallet } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";

export interface IExecutorParams<T> {
    wallet: AnchorWallet,
    params: T,
    connection: Connection
}