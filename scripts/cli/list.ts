#!/usr/bin/env ts-node

import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { Command } from "commander";
import { getWallet } from "../utils/utils";
import { listNft } from "../sdk/list"; // Adjust the import path accordingly
import { getProvider } from "../../clients/rarible-svm-ts/src"; // Adjust the import path accordingly
import { BN } from "bn.js";

// Define the command-line interface using commander
const cli = new Command();

cli
  .version("1.0.0")
  .description("List an NFT on the marketplace")
  .requiredOption("-k, --keypairPath <keypairPath>", "Path to the keypair file")
  .requiredOption("-r, --rpc <rpc>", "RPC endpoint URL")
  .requiredOption("--paymentMint <paymentMint>", "Public key of the payment mint")
  .requiredOption("--price <price>", "Price of the NFT in lamports (e.g., 1 SOL = 1,000,000,000 lamports)")
  .requiredOption("--marketIdentifier <marketIdentifier>", "Unique identifier for the market")
  .requiredOption("--nftMint <nftMint>", "Public key of the NFT mint")
  .option("--nonce <nonce>", "Nonce for the order (if not provided, a random one will be generated)")
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

    // Parse the payment mint public key
    const paymentMint = new PublicKey(opts.paymentMint);

    // Parse the price
    const price = parseInt(opts.price, 10);
    if (isNaN(price)) {
      throw new Error("Invalid price value. It must be a number.");
    }

    // Parse the NFT mint public key
    const nftMint = new PublicKey(opts.nftMint);

    // Extract the market identifier
    const marketIdentifier = opts.marketIdentifier;

    // Generate or parse the nonce
    let nonce: PublicKey;
    if (opts.nonce) {
      nonce = new PublicKey(opts.nonce);
    } else {
      // Generate a new nonce if not provided
      nonce = Keypair.generate().publicKey;
    }

    // Log the input parameters
    console.log("Listing NFT with the following parameters:");
    console.log(`- Nonce: ${nonce.toBase58()}`);
    console.log(`- Payment Mint: ${paymentMint.toBase58()}`);
    console.log(`- Price: ${price}`);
    console.log(`- Market Identifier: ${marketIdentifier}`);
    console.log(`- NFT Mint: ${nftMint.toBase58()}`);

    // Call the listNft function
    const { txid } = await listNft({
      wallet,
      params: {
        nonce,
        paymentMint,
        price,
        marketIdentifier,
        nftMint,
        // Include extraAccountParams if needed
      },
      connection,
    });

    console.log(`NFT listed successfully! Transaction ID: ${txid}`);
  } catch (e) {
    console.error("An error occurred during NFT listing:", e);
  }
})();
