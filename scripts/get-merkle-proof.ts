import { ObjectManager } from "@filebase/sdk";
import dotenv from "dotenv";
import { IncomingMessage } from "http";

dotenv.config();

const FILEBASE_S3_KEY = process.env.FILEBASE_S3_KEY;
const FILEBASE_S3_SECRET = process.env.FILEBASE_S3_SECRET;
const FILEBASE_BUCKET_NAME = process.env.FILEBASE_BUCKET_NAME;

const getProofForAddress = async (address: string) => {
  if (!FILEBASE_S3_KEY || !FILEBASE_S3_SECRET || !FILEBASE_BUCKET_NAME) {
    throw new Error("Filebase credentials are not set");
  }
  const objectManager = new ObjectManager(FILEBASE_S3_KEY, FILEBASE_S3_SECRET, {
    bucket: FILEBASE_BUCKET_NAME,
  });

  try {
    const objectKey = `proofs/${address}.json`;
    const downloadResult = await objectManager.download(objectKey, {});

    if (downloadResult instanceof IncomingMessage) {
      const chunks: Buffer[] = [];
      for await (const chunk of downloadResult) {
        chunks.push(Buffer.from(chunk));
      }
      const data = Buffer.concat(chunks).toString('utf8');
      const proofData = JSON.parse(data);
      console.log(`Proof for address ${address}:`, proofData);
      return proofData;
    } else {
      throw new Error("Unexpected download result type");
    }
  } catch (error) {
    console.error(`Error fetching proof for address ${address}:`, error);
    return null;
  }
};

// Example usage
const queryProof = async () => {
  const addressToQuery = "83UjNAQynt3EHdwzv7S9fsw4r3ExbmUYf2AvDJmk7bcZ"; // Replace with the address you want to query
  await getProofForAddress(addressToQuery);
};

// Run the query
queryProof().catch(console.error);
