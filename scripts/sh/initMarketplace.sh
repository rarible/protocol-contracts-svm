#!/bin/bash

# Path to the keypair file
KEYPAIR_PATH="/Users/vfadeev/.config/solana/id.json"

# Solana RPC endpoint
RPC_URL="https://api.devnet.solana.com"

# Fee recipient public key
FEE_RECIPIENT="QjzRL6VwKGnpco8wx3cPjtq8ZPhewy7ohq7F5mv2eeR"

# Fee basis points (e.g., 1000 for 10%)
FEE_BPS=250

# Market identifier (unique identifier for your market)
MARKET_IDENTIFIER="12Bc5qMMBK1YTPvMFX8CDa1aKEGrfQfkeZwYgnR3Ey5M"

# Use Ledger hardware wallet (set to true if using Ledger)
USE_LEDGER=false

# Run the initMarket.ts script using npx and ts-node
npx ts-node ./scripts/cli/initMarketplace.ts \
  --keypairPath "$KEYPAIR_PATH" \
  -r "$RPC_URL" \
  --feeRecipient "$FEE_RECIPIENT" \
  --feeBps "$FEE_BPS" \
  --marketIdentifier "$MARKET_IDENTIFIER" \
  $( [ "$USE_LEDGER" = true ] && echo "--ledger" )


# vfadeev@Vadims-MBP protocol-contracts-svm % ./scripts/sh/initMarketplace.sh         
# keypairPath /Users/vfadeev/.config/solana/id.json
# keypairPath!!!! /Users/vfadeev/.config/solana/id.json
# Wallet Public Key: QjzRL6VwKGnpco8wx3cPjtq8ZPhewy7ohq7F5mv2eeR
# Initializing market with the following parameters:
# - Fee Recipient: QjzRL6VwKGnpco8wx3cPjtq8ZPhewy7ohq7F5mv2eeR
# - Fee BPS: 250
# - Market Identifier: 12Bc5qMMBK1YTPvMFX8CDa1aKEGrfQfkeZwYgnR3Ey5M
# Initializing market with the following parameters:
# - Fee Recipient: QjzRL6VwKGnpco8wx3cPjtq8ZPhewy7ohq7F5mv2eeR
# - Fee BPS: 250
# - Market Identifier: 12Bc5qMMBK1YTPvMFX8CDa1aKEGrfQfkeZwYgnR3Ey5M
# Derived Market PDA: 6R7CExXArmyy421c5Jm3op1LeTB5v2YgtBzjS3sCtALo
# Creating instruction to initialize market...
# Transaction created, signing with wallet...
# Transaction signed, sending to network...
# Raw transaction length: 351
# Transaction ID: 3dS7CfdK5eoujniBS8XUgbqUVrbaRpcaJ5fFS4YZ3DauJNx2ViPmk8QDq8SHrqGXDMaw1AnbERERdW27EuxXUG9i
# REST null result for 3dS7CfdK5eoujniBS8XUgbqUVrbaRpcaJ5fFS4YZ3DauJNx2ViPmk8QDq8SHrqGXDMaw1AnbERERdW27EuxXUG9i null