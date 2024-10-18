import {
  Keypair,
  MessageV0,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
  VersionedTransaction,
} from "@solana/web3.js";
import {
  BidArgs,
  getCancelBid,
  fetchOrdersByMarket,
  fetchOrdersByMint,
  fetchOrdersByUser,
  fillOrder,
  getBid,
  getCancelListing,
  getComputeBudgetInstructions,
  getInitializeMarket,
  getListNft,
  getMarketPda,
  getOrderAccount,
  getProvider,
  getVerifyMint,
  ListArgs,
  getMarketplaceProgram,
  getEventAuthority,
} from "../../clients/rarible-svm-ts/src";
import { IExecutorParams } from "../utils/IExecutorParams";
import { AnchorProvider } from "@coral-xyz/anchor";
import { BN } from "bn.js";
import { sendSignedTransaction } from "../utils/txUtils";

export interface IInitMarket {
  feeRecipient: PublicKey;
  feeBps: number;
  marketIdentifier: string;
}

export const initMarket = async ({
  wallet,
  params,
  connection,
}: IExecutorParams<IInitMarket>) => {
  const { feeRecipient, feeBps, marketIdentifier } = params;

  // Log the input parameters
  console.log("Initializing market with the following parameters:");
  console.log(`- Fee Recipient: ${feeRecipient.toBase58()}`);
  console.log(`- Fee BPS: ${feeBps}`);
  console.log(`- Market Identifier: ${marketIdentifier}`);

  // Get the program instance for the market
  //const marketProgram = getProgramInstanceMarketplace(connection);
  const instructions: TransactionInstruction[] = [];

  const marketProgram = getMarketplaceProgram(
    new AnchorProvider(connection, wallet)
  );
  const marketPda = getMarketPda(marketIdentifier);

  // Log the derived PDA and bump
  console.log(`Derived Market PDA: ${marketPda.toBase58()}`);
  const eventAuthority = getEventAuthority();

  //const ix = await getInitializeMarket()

  // Create the instruction to initialize the market
  console.log("Creating instruction to initialize market...");
  instructions.push(
    await marketProgram.methods
      .initMarket({
        feeRecipient: feeRecipient,
        feeBps: new BN(feeBps),
      })
      .accountsStrict({
        initializer: wallet.publicKey,
        marketIdentifier: marketIdentifier,
        market: marketPda,
        systemProgram: SystemProgram.programId,
        eventAuthority: eventAuthority,
        program: marketIdentifier,
      })
      .instruction()
  );

  // Transaction boilerplate
  const tx = new Transaction().add(...instructions);
  tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
  tx.feePayer = wallet.publicKey;

  // Log before signing the transaction
  console.log("Transaction created, signing with wallet...");

  await wallet.signTransaction(tx);

  // Log before sending the transaction
  console.log("Transaction signed, sending to network...");

  // Send the signed transaction
  const txid = await sendSignedTransaction({
    signedTransaction: tx,
    connection,
    skipPreflight: false,
  });

  // Log the transaction ID
  console.log(`Transaction sent successfully! TxID: ${txid}`);

  return { txid };
};
