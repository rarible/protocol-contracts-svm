import { ethers } from "ethers";
import dotenv from 'dotenv';

dotenv.config();

export async function verifyBurnTransaction(
  txHash: string,
  expectedSigner: string,
  expectedContract: string,
  message: string,
  signature: string
): Promise<boolean> {
  const prefix = process.env.CHAIN_NAME;
  const deprefixedSigner = expectedSigner.replace(new RegExp(`^${prefix}:`), '');

  // Connect to an Ethereum node
  const provider = new ethers.InfuraProvider(process.env.NETWORK, process.env.INFURA_PROJECT_ID);

  // Verify the signature
  const messageHash = ethers.hashMessage(message);
  const recoveredAddress = ethers.recoverAddress(messageHash, signature);

  if (recoveredAddress.toLowerCase() !== deprefixedSigner.toLowerCase()) {
    throw new Error("!SignatureMatch");
  }

  // Fetch the transaction
  const tx = await provider.getTransaction(txHash);

  // Check if the transaction is to the expected contract
  if (tx.to.toLowerCase() !== expectedContract.toLowerCase()) {
    throw new Error("!ContractAddressMatch");
  }

  return true;
}
