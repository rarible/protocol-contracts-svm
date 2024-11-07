import { generateAllowlist } from "../src/generate-allowlist";
import dotenv from "dotenv";

dotenv.config();

const main = async () => {
  if (
    !process.env.AIRTABLE_API_KEY ||
    !process.env.AIRTABLE_BASE_ID ||
    !process.env.AIRTABLE_TABLE_NAME ||
    !process.env.BURN_CONTRACT_ADDRESS
  ) {
    throw new Error("AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME, and BURN_CONTRACT_ADDRESS must be set");
  }

  await generateAllowlist(
    process.env.AIRTABLE_API_KEY,
    process.env.AIRTABLE_BASE_ID,
    process.env.AIRTABLE_TABLE_NAME,
    process.env.BURN_CONTRACT_ADDRESS
  );
};

main();
