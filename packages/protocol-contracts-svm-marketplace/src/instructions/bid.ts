import {
  ComputeBudgetProgram,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { type Provider, BN } from "@coral-xyz/anchor";
import {
  getAtaAddress,
  getEventAuthority,
  getMarketPda,
  getOrderAccount,
  getProvider,
  getTokenProgramFromMint,
} from "../utils";
import {
  getProgramInstanceRaribleMarketplace,
  IExecutorParams,
  sendSignedTransaction,
} from "@rarible_int/protocol-contracts-svm-core";
import { BidParams } from "../model";
import { PROGRAM_ID_MARKETPLACE } from "@rarible_int/protocol-contracts-svm-core";
import { ASSOCIATED_TOKEN_PROGRAM_ID } from "spl-token-4";

export const bid = async ({
  wallet,
  params,
  connection,
}: IExecutorParams<BidParams>) => {
  const marketProgram = getProgramInstanceRaribleMarketplace(connection);
  const market = getMarketPda(params.marketIdentifier);
  const eventAuthority = getEventAuthority();

  const initializer = wallet.publicKey?.toString();
  if (!initializer) {
    return undefined;
  }

  const paymentTokenProgram = await getTokenProgramFromMint(
    getProvider(connection.rpcEndpoint),
    params.paymentMint.toString()
  );
  if (!paymentTokenProgram) {
    return undefined;
  }

  const nonceKp = Keypair.generate();
  const nonce = nonceKp.publicKey;

  const order = getOrderAccount(
    nonce.toString(),
    market.toString(),
    initializer
  );
  const initializerPaymentTa = getAtaAddress(
    params.paymentMint,
    initializer,
    paymentTokenProgram.toString()
  );
  const orderPaymentTa = getAtaAddress(
    params.paymentMint,
    order.toString(),
    paymentTokenProgram.toString()
  );

  const instruction = await marketProgram.methods
    .bid({
      nonce,
      price: new BN(params.price),
      size: new BN(params.size),
    })
    .accountsStrict({
      initializer: wallet.publicKey,
      market,
      nftMint: params.nftMint ?? PublicKey.default,
      order,
      initializerPaymentTa,
      orderPaymentTa,
      paymentTokenProgram,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
      program: marketProgram.programId,
      eventAuthority,
      paymentMint: params.paymentMint,
    })
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
  tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
  tx.feePayer = wallet.publicKey;

  // Sign and send the transaction
  await wallet.signTransaction(tx);

  const txid = await sendSignedTransaction({
    signedTransaction: tx,
    connection,
    skipPreflight: false,
  });

  return { tx, market: market };
};
