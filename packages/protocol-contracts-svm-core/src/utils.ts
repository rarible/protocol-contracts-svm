import { Keypair } from "@solana/web3.js";
import { LedgerWallet } from "./ledgerWallet"; // Adjust the import path based on your project structure
import { PrivateKeyWallet } from "./privateKeyWallet"; // Adjust the import path based on your project structure
import * as fs from "fs";
import path from "path";

/**
 * Creates a wallet based on the environment variable `WALLET_TYPE`.
 * @returns A wallet instance of either PrivateKeyWallet or LedgerWallet.
 */
export async function getWallet(
  isLedger: boolean = false,
  keypairPath: string = ""
): Promise<PrivateKeyWallet | LedgerWallet> {
  let walletType = process.env.WALLET_TYPE;
  if (isLedger) {
    walletType = "ledger";
  }
  if (!walletType) {
    walletType = "keypair";
  }
  if (walletType === "keypair") {
    // Load the keypair from the file
    if (keypairPath.length == 0) {
      keypairPath = process.env.KEYPAIR_PATH!;
    }
    const keyfile = JSON.parse(fs.readFileSync(keypairPath, "utf8"));
    const signerKeypair = Keypair.fromSecretKey(new Uint8Array(keyfile));
    return new PrivateKeyWallet(signerKeypair);
  } else if (walletType === "ledger") {
    // Initialize Ledger Wallet
    const wallet = new LedgerWallet();
    await wallet.init(); // Make sure to initialize the Ledger device
    return wallet;
  } else {
    throw new Error(`Unsupported wallet type: ${walletType}`);
  }
}

// Load or generate group and groupMint keypairs
export function loadOrCreateKeypair(fileName: string, deployDirectory: string): Keypair {
  const filePath = path.join(deployDirectory, fileName);
  if (fs.existsSync(filePath)) {
    const secretKeyString = fs.readFileSync(filePath, 'utf-8');
    const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
    return Keypair.fromSecretKey(secretKey);
  } else {
    const keypair = Keypair.generate();
    // Ensure the directory exists
    if (!fs.existsSync(deployDirectory)) {
      fs.mkdirSync(deployDirectory, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(Array.from(keypair.secretKey)));
    return keypair;
  }
}
