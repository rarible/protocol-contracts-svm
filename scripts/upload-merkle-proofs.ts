import { ObjectManager } from "@filebase/sdk";
import * as fsPromises from "fs/promises";
import * as path from "path";
import { PublicKey } from "@solana/web3.js";
import dotenv from "dotenv";

dotenv.config();

const FILEBASE_S3_KEY = process.env.FILEBASE_S3_KEY;
const FILEBASE_S3_SECRET = process.env.FILEBASE_S3_SECRET;
const FILEBASE_BUCKET_NAME = process.env.FILEBASE_BUCKET_NAME;

const uploadMerkleTree = async () => {
  if (!FILEBASE_S3_KEY || !FILEBASE_S3_SECRET || !FILEBASE_BUCKET_NAME) {
    throw new Error("Filebase credentials are not set");
  }
  const objectManager = new ObjectManager(FILEBASE_S3_KEY, FILEBASE_S3_SECRET, {
    bucket: FILEBASE_BUCKET_NAME,
  });

  const rootDir = path.resolve(__dirname, "..");
  const merkleTreePath = path.join(rootDir, "crates/merkle-tree-cli/data/merkle-tree.json");
  const proofsDir = path.join(rootDir, "crates/merkle-tree-cli/data/proofs");

  const merkleTreeData = JSON.parse(await fsPromises.readFile(merkleTreePath, "utf-8"));
  await fsPromises.mkdir(proofsDir, { recursive: true });

  console.log("Processing merkle tree data...");
  const totalNodes = merkleTreeData.tree_nodes.length;
  let counter = 0;

  for (const node of merkleTreeData.tree_nodes) {
    counter++;
    const claimant = new PublicKey(Buffer.from(node.claimant)).toBase58();
    const nodeData = {
      claimant,
      claim_price: node.claim_price,
      max_claims: node.max_claims,
      proof: node.proof,
    };
    const fileName = `${claimant}.json`;
    const filePath = path.join(proofsDir, fileName);

    // write proof to the proofs folder
    const stringifiedProof = JSON.stringify(nodeData, null, 2);
    await fsPromises.writeFile(filePath, stringifiedProof);

    // upload proof to the object manager (filebase)
    console.log(`Uploading proof for ${claimant} (${counter}/${totalNodes})...`);
    const uploadedObject = await objectManager.upload(`proofs/${fileName}`, stringifiedProof, {}, {});
    console.log(`Uploaded: proofs/${fileName}`);
  }
  console.log("Finished uploading merkle tree proofs successfully.");
};

uploadMerkleTree().catch(error => {
  console.error("Error:", error);
  process.exit(1);
});
