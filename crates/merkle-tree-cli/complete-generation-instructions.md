### Instructions:

1. Clone the `protocol-contracts-svm` repository.
2. Switch to the `mybranch` branch.
3. Run `yarn install` to install dependencies.

4. Navigate to the `packages/protocol-contracts-svm-allowlist` directory.
5. Populate the `.env` file with the required environment variables.
6. Run `npm run generate-burn-allowlist` to generate the allowlist.
7. Copy the generated `allow-list.csv` file.

8. Navigate to the `crates/merkle-tree-cli` directory.
9. Paste the `allow-list.csv` file into the `/data` folder.
10. Run `cargo run create-merkle-tree --csv-path ./data/allow_list.csv --merkle-tree-path ./data/merkle_tree.json` to create the Merkle tree.

To upload the proofs to Filebase and let them ready to be pulled from the minting-sdk:
11. Navigate to the `packages/protocol-contracts-svm-allowlist` directory.
12. Update your environment variables with the necessary Collection and Filebase configuration.
13. Run `npm run upload-proofs`.