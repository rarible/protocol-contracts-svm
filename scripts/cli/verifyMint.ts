#!/usr/bin/env ts-node

import { Connection, PublicKey } from "@solana/web3.js";
import { Command } from "commander";
import { getWallet } from "../utils/utils";
import { verifyMint } from "../sdk/verifyMint"; // Adjust the import path accordingly

// Define the command-line interface using commander
const cli = new Command();

cli
  .version("1.0.0")
  .description("Verify an NFT mint for a market")
  .requiredOption("-k, --keypairPath <keypairPath>", "Path to the keypair file")
  .requiredOption("-r, --rpc <rpc>", "RPC endpoint URL")
  .requiredOption("--marketIdentifier <marketIdentifier>", "Unique identifier for the market")
  .requiredOption("--nftMint <nftMint>", "Public key of the NFT mint to verify")
  .option("--ledger", "Use Ledger hardware wallet")
  .parse(process.argv);

const opts = cli.opts();

(async () => {
  try {
    // Establish a connection to the Solana network
    const connection = new Connection(opts.rpc);

    // Retrieve the wallet (from keypair file or Ledger device)
    const wallet = await getWallet(opts.ledger, opts.keypairPath);

    console.log("Wallet Public Key:", wallet.publicKey.toBase58());

    // Parse the NFT mint public key
    const nftMint = new PublicKey(opts.nftMint);

    // Extract the market identifier
    const marketIdentifier = opts.marketIdentifier;

    // Log the input parameters
    console.log("Verifying NFT mint with the following parameters:");
    console.log(`- Market Identifier: ${marketIdentifier}`);
    console.log(`- NFT Mint: ${nftMint.toBase58()}`);

    // Call the verifyMint function
    const { txid } = await verifyMint({
      wallet,
      params: {
        marketIdentifier,
        nftMint,
      },
      connection,
    });

    console.log(`NFT mint verified successfully! Transaction ID: ${txid}`);
  } catch (e) {
    console.error("An error occurred during NFT mint verification:", e);
  }
})();
