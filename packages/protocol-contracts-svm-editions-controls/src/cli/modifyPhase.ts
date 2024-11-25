import { Connection, PublicKey } from "@solana/web3.js";
import fs from "fs";
import path from "path";
import { Command } from "commander";
import { modifyPhase } from "../instructions";
import { getWallet } from "@rarible_int/protocol-contracts-svm-core";

const cli = new Command();

const parseNumber = (value, previous) => {
  const parsedValue = Number(value);
  if (isNaN(parsedValue)) {
    throw new Error('Not a number.');
  }
  return parsedValue;
};

cli
  .version("1.0.0")
  .description("Modify an existing phase in a control deployment")
  .requiredOption("-k, --keypairPath <keypairPath>", "Keypair")
  .requiredOption("-r, --rpc <rpc>", "RPC URL")
  .requiredOption("-d, --deploymentId <deploymentId>", "Controls ID")
  .requiredOption("-i, --phaseIndex <phaseIndex>", "Index of the phase to modify", parseNumber)
  .option("-s, --startTime <startTime>", "Start time (Unix timestamp)", parseNumber)
  .option("-e, --endTime <endTime>", "End time (Unix timestamp)", parseNumber)
  .requiredOption("--maxMintsPerWallet <maxMintsPerWallet>", "Max mints per wallet (0 for unlimited)", parseNumber)
  .requiredOption("--maxMintsTotal <maxMintsTotal>", "Max mints total for the phase (0 for unlimited)", parseNumber)
  .requiredOption("--priceAmount <priceAmount>", "Price per mint in lamports (can be 0)", parseNumber)
  .option("--priceToken, --priceToken", "If set, the custome token 2022 will be used")
  .option("-p, --isPrivate", "If set, the phase will be allow-list only")
  .option("-m, --merkleRootPath <merkleRootPath>", "Path to JSON file containing merkle root")
  .option("-p, --isPrivate", "If set, the phase will be allow-list only")
  .option("-a, --active", "If set, the phase will be active")
  .option("--ledger", "Use Ledger hardware wallet")
  .parse(process.argv);

const opts = cli.opts();

(async () => {
  const connection = new Connection(opts.rpc);

  // Get merkle root from the provided path
  let merkleRoot = null;
  if (opts.merkleRootPath) {
    const merkleData = JSON.parse(
      fs.readFileSync(path.resolve(opts.merkleRootPath), "utf8")
    );
    merkleRoot = merkleData.merkle_root;
  }

  // If the phase is private, merkle root is required
  if (opts.isPrivate && !merkleRoot) {
    throw new Error("Merkle root is required for a private phase");
  }

  const wallet = await getWallet(opts.ledger, opts.keypairPath);

  try {
    const { txid } = await modifyPhase({
      wallet,
      params: {
          deploymentId: opts.deploymentId,
          phaseIndex: opts.phaseIndex,
          priceAmount: opts.priceAmount,
          maxMintsPerWallet: opts.maxMintsPerWallet,
          maxMintsTotal: opts.maxMintsTotal,
          startTime: opts.startTime ? +opts.startTime : null,
          endTime: opts.endTime ? +opts.endTime : null,
          merkleRoot: merkleRoot,
          isPrivate: !!opts.isPrivate,
          active: !!opts.active,
          priceToken: opts.priceToken ? opts.priceToken : "So11111111111111111111111111111111111111112"
      },
      connection,
    });

    console.log(`Transaction successful. txid: ${txid}`);
  } catch (e) {
    console.error("An error occurred while modifying the phase:", e);
  }
})();
