import * as fs from "fs";
import * as path from "path";
import Airtable from "airtable";
import { createObjectCsvWriter } from "csv-writer";
import { verifyBurnTransaction } from "./verify-burn-tx";

interface CsvEntry {
  address: string;
  quantity: string;
}

interface RejectedEntry extends CsvEntry {
  rejectionReason: string;
}

// Fetch records from Airtable
async function fetchAndVerifyRecords(
  AIRTABLE_API_KEY: string,
  AIRTABLE_BASE_ID: string,
  AIRTABLE_TABLE_NAME: string,
  CONTRACT_ADDRESS: string
) {
  Airtable.configure({
    apiKey: AIRTABLE_API_KEY,
  });
  const base = Airtable.base(AIRTABLE_BASE_ID);
  const table = base(AIRTABLE_TABLE_NAME);

  const verifiedBurners: CsvEntry[] = [];
  const rejectedBurners: RejectedEntry[] = [];

  console.log("Verifying burn transactions... this may take a while.");

  let pageCounter = 0;
  await table.select().eachPage(async (records, fetchNextPage) => {
    pageCounter++;
    console.log(`Processing Airtable page ${pageCounter}...`);
    let transactionCounter = 0;

    for (const record of records) {
      transactionCounter++;
      console.log(`Verifying transaction ${transactionCounter} on page ${pageCounter}...`);

      const txHash = record.get("tx_hash") as string;
      const address = record.get("solana_address") as string;
      const quantity = record.get("quantity") as string;
      const message = record.get("message") as string;
      const signer = record.get("signer") as string;
      const signature = record.get("signature") as string;

      try {
        if (await verifyBurnTransaction(txHash, signer, CONTRACT_ADDRESS, message, signature)) {
          verifiedBurners.push({ address, quantity });
        }
      } catch (error) {
        rejectedBurners.push({ address, quantity, rejectionReason: error.message });
      }
    }

    fetchNextPage();
  });

  return { verifiedBurners, rejectedBurners };
}

async function writeToCSV(filePath: string, entries: CsvEntry[]) {
  // Create data directory if it doesn't exist
  const dataDir = path.join(__dirname, "../data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const writer = createObjectCsvWriter({
    path: path.join(dataDir, filePath),
    header: [
      { id: "address", title: "address" },
      { id: "price", title: "price" },
      { id: "max_claims", title: "max_claims" },
    ],
  });

  const records = entries.map(entry => ({
    address: entry.address,
    price: 0,
    max_claims: entry.quantity,
  }));

  await writer.writeRecords(records);
  console.log(`CSV file written successfully: ${path.join(dataDir, filePath)}`);
}

async function writeToCSVWithErrorCode(filePath: string, entries: RejectedEntry[]) {
  const dataDir = path.join(__dirname, "../data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const writer = createObjectCsvWriter({
    path: path.join(dataDir, filePath),
    header: [
      { id: "address", title: "address" },
      { id: "price", title: "price" },
      { id: "max_claims", title: "max_claims" },
      { id: "error_code", title: "error_code" },
    ],
  });

  const records = entries.map(entry => ({
    address: entry.address,
    price: 0,
    max_claims: entry.quantity,
    error_code: entry.rejectionReason,
  }));

  await writer.writeRecords(records);
}

function mergeEntries(entries: CsvEntry[]): CsvEntry[] {
  const merged = new Map<string, number>();

  // Sum up quantities for each address
  entries.forEach(entry => {
    const currentQuantity = merged.get(entry.address) || 0;
    merged.set(entry.address, currentQuantity + parseInt(entry.quantity));
  });

  // Convert back to array format
  return Array.from(merged).map(([address, quantity]) => ({
    address,
    quantity: quantity.toString(),
  }));
}

export const generateAllowlist = async (
  AIRTABLE_API_KEY: string,
  AIRTABLE_BASE_ID: string,
  AIRTABLE_TABLE_NAME: string,
  BURN_CONTRACT_ADDRESS: string
) => {
  try {
    const { verifiedBurners, rejectedBurners } = await fetchAndVerifyRecords(
      AIRTABLE_API_KEY,
      AIRTABLE_BASE_ID,
      AIRTABLE_TABLE_NAME,
      BURN_CONTRACT_ADDRESS
    );

    await writeToCSV("verified-burners.csv", verifiedBurners);
    await writeToCSVWithErrorCode("rejected-burners.csv", rejectedBurners);

    const mergedEntries = mergeEntries(verifiedBurners);
    await writeToCSV("allow_list.csv", mergedEntries);

    console.log("Allowlist generated successfully.");
  } catch (error) {
    console.error("Error generating allowlist:", error);
  }
};
