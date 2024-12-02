// fillOrder.ts

import {
  AccountMeta,
  ComputeBudgetProgram,
  Keypair,
  PublicKey,
  SystemProgram,
  SYSVAR_INSTRUCTIONS_PUBKEY,
  Transaction,
} from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";
import {
  getAtaAddress,
  getEventAuthority,
  getMarketPda,
  getNftProgramFromMint,
  getOrderAccount,
  getProvider,
  getRemainingAccountsForMint,
  getTokenProgramFromMint,
  fetchOrderByAddress,
  fetchMarketByAddress,
} from "../utils";
import {
  getProgramInstanceRaribleMarketplace,
  IExecutorParams,
  sendSignedTransaction,
} from "@rarible_int/protocol-contracts-svm-core";
import { FillOrderParams } from "../model";
import { PROGRAM_ID_MARKETPLACE } from "@rarible_int/protocol-contracts-svm-core";
import { ASSOCIATED_TOKEN_PROGRAM_ID } from "@solana/spl-token";

import { getTokenMetadata } from "@solana/spl-token";
import { TOKEN_2022_PROGRAM_ID } from "spl-token-4";

export const fillOrder = async ({
  wallet,
  params,
  connection,
}: IExecutorParams<FillOrderParams>) => {
  const marketProgram = getProgramInstanceRaribleMarketplace(connection);
  const eventAuthority = getEventAuthority();

  const taker = wallet.publicKey;
  if (!taker) {
    console.error("Wallet public key is missing.");
    return undefined;
  }

  const provider = getProvider(connection.rpcEndpoint);

  const orderAddress = params.orderAddress;
  const amountToFill = params.amountToFill;

  const extraAccountParams = params.extraAccountParams;

  // Fetch order by address
  const order = await fetchOrderByAddress(provider, orderAddress);
  if (!order) {
    console.error("Order not found.");
    return undefined;
  }
  const nftMint = new PublicKey(order.nftMint);

  // Fetch market
  const market = await fetchMarketByAddress(provider, order.market.toString());
  if (!market) {
    console.error("Market not found.");
    return undefined;
  }

  const nftTokenProgram = await getTokenProgramFromMint(
    provider,
    nftMint.toBase58()
  );
  const paymentTokenProgram = await getTokenProgramFromMint(
    provider,
    order.paymentMint.toBase58()
  );
  if (!paymentTokenProgram || !nftTokenProgram) {
    console.error("Token programs not found.");
    return undefined;
  }

  const nftProgram = await getNftProgramFromMint(provider, nftMint.toBase58());

  const isBuy = order.side === 0; // Assuming 0 represents Buy

  const nftRecipient = isBuy ? order.owner : taker;
  const nftFunder = isBuy ? taker : order.owner;
  const paymentFunder = isBuy ? new PublicKey(orderAddress) : taker;
  const paymentRecipient = isBuy ? taker : order.owner;

  const buyerPaymentTa = getAtaAddress(
    order.paymentMint.toBase58(),
    paymentFunder.toBase58(),
    paymentTokenProgram.toBase58()
  );
  const sellerPaymentTa = getAtaAddress(
    order.paymentMint.toBase58(),
    paymentRecipient.toBase58(),
    paymentTokenProgram.toBase58()
  );
  const buyerNftTa = getAtaAddress(
    nftMint.toBase58(),
    nftRecipient.toBase58(),
    nftTokenProgram.toBase58()
  );
  const sellerNftTa = getAtaAddress(
    nftMint.toBase58(),
    nftFunder.toBase58(),
    nftTokenProgram.toBase58()
  );

  const feeRecipient = market.feeRecipient;
  const feeRecipientTa = getAtaAddress(
    order.paymentMint.toBase58(),
    feeRecipient.toBase58(),
    paymentTokenProgram.toBase58()
  );

  const remainingAccounts: AccountMeta[] = await getRemainingAccountsForMint(
    provider,
    nftMint.toBase58(),
    extraAccountParams
  );

  // Log all account addresses before creating the instruction
  console.log("Accounts used in the transaction:");
  console.log("Taker (wallet):", taker.toBase58());
  console.log("Maker (order owner):", order.owner.toBase58());
  console.log("Market Address:", order.market.toBase58());
  console.log("Order Address:", orderAddress);
  console.log("Buyer NFT Token Account:", buyerNftTa.toBase58());
  console.log("Buyer Payment Token Account:", buyerPaymentTa.toBase58());
  console.log("Seller NFT Token Account:", sellerNftTa.toBase58());
  console.log("Seller Payment Token Account:", sellerPaymentTa.toBase58());
  console.log("NFT Token Program:", nftTokenProgram.toBase58());
  console.log("Payment Token Program:", paymentTokenProgram.toBase58());
  console.log(
    "NFT Program:",
    nftProgram ? nftProgram.toBase58() : PublicKey.default.toBase58()
  );
  console.log(
    "Associated Token Program ID:",
    ASSOCIATED_TOKEN_PROGRAM_ID.toBase58()
  );
  console.log("System Program ID:", SystemProgram.programId.toBase58());
  console.log("Marketplace Program ID:", marketProgram.programId.toBase58());
  console.log("Payment Mint:", order.paymentMint.toBase58());
  console.log("NFT Mint:", nftMint.toBase58());
  console.log("Event Authority:", eventAuthority.toBase58());
  console.log("Fee Recipient:", feeRecipient.toBase58());
  console.log("Fee Recipient Token Account:", feeRecipientTa.toBase58());
  console.log(
    "SYSVAR Instructions Pubkey:",
    SYSVAR_INSTRUCTIONS_PUBKEY.toBase58()
  );

  // Retrieve and log the metadata state
  const metadata = await getTokenMetadata(
    connection, // Connection instance
    nftMint, // PubKey of the Mint Account
    "confirmed", // Commitment
    TOKEN_2022_PROGRAM_ID
  );

  console.log("NFT Metadata:", JSON.stringify(metadata));

  // Parse additionalMetadata to get royalty and creators information
  let hasRoyalties = false;
  let creatorsInfo: { pubkey: PublicKey; percentage: number }[] = [];
  let royaltyBasisPoints = 0;

  const additionalMetadata = metadata.additionalMetadata;
  if (additionalMetadata && additionalMetadata.length > 0) {
    for (const [key, value] of additionalMetadata) {
      if (key === "royalty_basis_points") {
        royaltyBasisPoints = parseInt(value, 10);
        if (royaltyBasisPoints > 0) {
          hasRoyalties = true;
        }
      } else {
        // Assume any other key-value pairs are creator pubkeys and their percentages
        try {
          const creatorPubkey = new PublicKey(key);
          const percentage = parseInt(value, 10);
          if (percentage > 0 && percentage <= 100) {
            creatorsInfo.push({
              pubkey: creatorPubkey,
              percentage: percentage,
            });
          } else {
            console.error(`Invalid percentage for creator ${key}: ${value}`);
          }
        } catch (e) {
          // Key is not a valid public key, skip
          console.error(`Invalid public key in additionalMetadata: ${key}`);
        }
      }
    }
  }

  // Validate that total percentages add up to 100
  const totalPercentage = creatorsInfo.reduce(
    (acc, creator) => acc + creator.percentage,
    0
  );
  if (totalPercentage > 100) {
    console.error("Total creator percentages exceed 100%");
    return undefined;
  }

  if (hasRoyalties) {
    // For each creator, add their public key and their payment ATA to remainingAccounts
    for (const creatorInfo of creatorsInfo) {
      // Add the creator's public key
      remainingAccounts.push({
        pubkey: creatorInfo.pubkey,
        isSigner: false,
        isWritable: false,
      });

      // Get the creator's payment ATA
      const creatorPaymentTa = getAtaAddress(
        order.paymentMint.toBase58(),
        creatorInfo.pubkey.toBase58(),
        paymentTokenProgram.toBase58()
      );

      remainingAccounts.push({
        pubkey: creatorPaymentTa,
        isSigner: false,
        isWritable: true,
      });
    }
  }

  console.log("Remaining Accounts:");
  remainingAccounts.forEach((account, index) => {
    console.log(
      `Account ${index}: ${account.pubkey.toBase58()}, isSigner: ${
        account.isSigner
      }, isWritable: ${account.isWritable}`
    );
  });

  // Build the instruction
  const instruction = await marketProgram.methods
    .fillOrder(new BN(amountToFill))
    .accountsStrict({
      taker: taker,
      maker: order.owner,
      market: order.market,
      order: new PublicKey(orderAddress),
      buyerNftTa,
      buyerPaymentTa,
      sellerNftTa,
      sellerPaymentTa,
      nftTokenProgram,
      paymentTokenProgram,
      nftProgram: nftProgram ?? PublicKey.default,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
      program: marketProgram.programId,
      eventAuthority,
      paymentMint: order.paymentMint,
      nftMint,
      sysvarInstructions: SYSVAR_INSTRUCTIONS_PUBKEY,
      feeRecipient,
      feeRecipientTa,
    })
    .remainingAccounts(remainingAccounts)
    .instruction();

  // Create the transaction and add the instruction
  const instructions = [];

  // Add compute budget instruction
  instructions.push(
    ComputeBudgetProgram.setComputeUnitLimit({
      units: 850_000,
    })
  );

  instructions.push(instruction);

  const tx = new Transaction().add(...instructions);

  // Set recent blockhash and fee payer
  const latestBlockhash = await connection.getLatestBlockhash();
  tx.recentBlockhash = latestBlockhash.blockhash;
  tx.feePayer = wallet.publicKey;

  // Sign and send the transaction
  await wallet.signTransaction(tx);

  const txid = await sendSignedTransaction({
    signedTransaction: tx,
    connection,
    skipPreflight: false,
  });

  console.log(`Transaction ID: ${txid}`);
  console.log(`Order Address: ${orderAddress}`);
  console.log(`Market: ${market}`);

  return { txid, tx, order, market };
};
