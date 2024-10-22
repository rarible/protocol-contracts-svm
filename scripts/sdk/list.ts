import {
    PublicKey,
    SystemProgram,
    Transaction,
    TransactionInstruction,
    SYSVAR_INSTRUCTIONS_PUBKEY,
  } from "@solana/web3.js";
  import {
    getMarketplaceProgram,
    getMarketPda,
    getOrderAccount,
    getVerificationPda,
    getEventAuthority,
    marketplaceProgramId,
    getAtaAddress,
  } from "../../clients/rarible-svm-ts/src"; // Adjust the import path accordingly
  import { IExecutorParams } from "../utils/IExecutorParams";
  import { AnchorProvider, BN } from "@coral-xyz/anchor";
  import { sendSignedTransaction } from "../utils/txUtils";
  import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";
  
  export interface IListNft {
    nonce: PublicKey;
    paymentMint: PublicKey;
    price: number;
    marketIdentifier: string;
    nftMint: PublicKey;
    // Additional parameters if needed, such as extra accounts for WNS tokens
    extraAccountParams?: any; // Adjust the type as per your requirements
  }
  
  export const listNft = async ({
    wallet,
    params,
    connection,
  }: IExecutorParams<IListNft>) => {
    const { nonce, paymentMint, price, marketIdentifier, nftMint, extraAccountParams } = params;
  
    // Log the input parameters
    console.log("Listing NFT with the following parameters:");
    console.log(`- Nonce: ${nonce.toBase58()}`);
    console.log(`- Payment Mint: ${paymentMint.toBase58()}`);
    console.log(`- Price: ${price}`);
    console.log(`- Market Identifier: ${marketIdentifier}`);
    console.log(`- NFT Mint: ${nftMint.toBase58()}`);
  
    // Get the program instance for the marketplace
    const provider = new AnchorProvider(connection, wallet, {});
    const marketplaceProgram = getMarketplaceProgram(provider);
    const marketPda = getMarketPda(marketIdentifier);
  
    // Derive PDAs for order and verification accounts
    const orderPda = getOrderAccount(nonce.toBase58(), marketPda.toBase58(), wallet.publicKey);
    const verificationPda = getVerificationPda(marketPda.toBase58(), nftMint.toBase58());
  
    // Log the derived PDAs
    console.log(`Derived Market PDA: ${marketPda.toBase58()}`);
    console.log(`Derived Order PDA: ${orderPda.toBase58()}`);
    console.log(`Derived Verification PDA: ${verificationPda.toBase58()}`);
  
    const instructions: TransactionInstruction[] = [];
  
    // Define the accounts required for the instruction
  
    const initializerNftTa = getAtaAddress(nftMint.toBase58(), wallet.publicKey, TOKEN_2022_PROGRAM_ID.toString());
    const orderNftTa = getAtaAddress(nftMint.toString(), orderPda.toString(), TOKEN_2022_PROGRAM_ID.toString());
    // Event authority (if required)
    const eventAuthority = getEventAuthority();
  
    // Additional accounts (e.g., metadata, edition) if required by your program
    const remainingAccounts: any[] = []; // Populate this array as needed
  
    // Create the instruction to list the NFT
    console.log("Creating instruction to list NFT...");
    instructions.push(
      await marketplaceProgram.methods
        .list({
          nonce,
          paymentMint,
          price: new BN(price),
        })
        .accountsStrict({
            initializer: wallet.publicKey,
            market: marketPda,
            order: orderPda,
            verification: verificationPda,
            nftMint: nftMint,
            initializerNftTa: initializerNftTa,
            orderNftTa: orderNftTa,
            sysvarInstructions: SYSVAR_INSTRUCTIONS_PUBKEY,
            systemProgram: SystemProgram.programId,
            nftTokenProgram: TOKEN_2022_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
            nftProgram: nftMint, // Adjust if necessary
            eventAuthority: eventAuthority,
            program: marketplaceProgramId
        })
        .remainingAccounts(remainingAccounts)
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
  