#!/usr/bin/env ts-node

import { Connection, PublicKey } from "@solana/web3.js";
import { Command } from "commander";
import { getWallet } from "../utils/utils";
import { initMarket } from "../sdk/initMarketplace"; // Adjust the import path accordingly
import { getProvider } from "../../clients/rarible-svm-ts/src"; // Adjust the import path accordingly

// Define the command-line interface using commander
const cli = new Command();

cli
  .version("1.0.0")
  .description("Initialize a new market")
  .requiredOption("-k, --keypairPath <keypairPath>", "Path to the keypair file")
  .requiredOption("-r, --rpc <rpc>", "RPC endpoint URL")
  .requiredOption("--feeRecipient <feeRecipient>", "Public key of the fee recipient")
  .requiredOption("--feeBps <feeBps>", "Fee in basis points (bps)")
  .requiredOption("--marketIdentifier <marketIdentifier>", "Unique identifier for the market")
  .option("--ledger", "Use Ledger hardware wallet")
  .parse(process.argv);

const opts = cli.opts();

(async () => {
  try {
    // Establish a connection to the Solana network
    const connection = new Connection(opts.rpc);
    console.log("keypairPath", opts.keypairPath);
    // Retrieve the wallet (from keypair file or Ledger device)
    const wallet = await getWallet(opts.ledger, opts.keypairPath);

    console.log("Wallet Public Key:", wallet.publicKey.toBase58());

    // Parse the fee recipient public key
    const feeRecipient = new PublicKey(opts.feeRecipient);

    // Parse the fee basis points
    const feeBps = parseInt(opts.feeBps, 10);
    if (isNaN(feeBps)) {
      throw new Error("Invalid feeBps value. It must be a number.");
    }

    // Extract the market identifier
    const marketIdentifier = opts.marketIdentifier;

    // Log the input parameters
    console.log("Initializing market with the following parameters:");
    console.log(`- Fee Recipient: ${feeRecipient.toBase58()}`);
    console.log(`- Fee BPS: ${feeBps}`);
    console.log(`- Market Identifier: ${marketIdentifier}`);

    // Call the initMarket function
    const { txid } = await initMarket({
      wallet,
      params: {
        feeRecipient,
        feeBps,
        marketIdentifier,
      },
      connection,
    });

    console.log(`Market initialized successfully! Transaction ID: ${txid}`);
  } catch (e) {
    console.error("An error occurred during market initialization:", e);
  }
})();
