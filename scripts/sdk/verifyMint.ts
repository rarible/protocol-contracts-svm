import {
    PublicKey,
    SystemProgram,
    Transaction,
    TransactionInstruction,
  } from "@solana/web3.js";
  import {
    getMarketplaceProgram,
    getMarketPda,
    getVerificationPda,
  } from "../../clients/rarible-svm-ts/src"; // Adjust the import path accordingly
  import { IExecutorParams } from "../utils/IExecutorParams";
  import { AnchorProvider } from "@coral-xyz/anchor";
  import { sendSignedTransaction } from "../utils/txUtils";
  
  export interface IVerifyMint {
    marketIdentifier: string;
    nftMint: PublicKey;
  }
  
  export const verifyMint = async ({
    wallet,
    params,
    connection,
  }: IExecutorParams<IVerifyMint>) => {
    const { marketIdentifier, nftMint } = params;
  
    // Log the input parameters
    console.log("Verifying NFT mint with the following parameters:");
    console.log(`- Market Identifier: ${marketIdentifier}`);
    console.log(`- NFT Mint: ${nftMint.toBase58()}`);
  
    // Get the program instance for the marketplace
    const provider = new AnchorProvider(connection, wallet, {});
    const marketplaceProgram = getMarketplaceProgram(provider);
    const marketPda = getMarketPda(marketIdentifier);
  
    // // Fetch the market account to verify the initializer
    // const marketAccount = await marketplaceProgram.account.market.fetch(marketPda);
    // const marketInitializer = marketAccount.initializer;
  
    // // Check that the wallet is the initializer of the market
    // if (!wallet.publicKey.equals(marketInitializer)) {
    //   throw new Error("Only the initializer of the market can verify mints.");
    // }
  
    // Derive the verification PDA
    const verificationPda = getVerificationPda(marketPda.toBase58(), nftMint.toBase58())
  
    // Log the derived PDAs
    console.log(`Derived Market PDA: ${marketPda.toBase58()}`);
    console.log(`Derived Verification PDA: ${verificationPda.toBase58()}`);
  
    const instructions: TransactionInstruction[] = [];
  
    // Create the instruction to verify the NFT mint
    console.log("Creating instruction to verify NFT mint...");
    instructions.push(
      await marketplaceProgram.methods
        .verifyMint()
        .accountsStrict({
          initializer: wallet.publicKey,
          market: marketPda,
          nftMint: nftMint,
          verification: verificationPda,
          systemProgram: SystemProgram.programId,
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
  