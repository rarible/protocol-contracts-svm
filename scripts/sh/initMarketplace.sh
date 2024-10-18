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
MARKET_IDENTIFIER="B6ckscvApoZpBZ7cKGYa4VK4vTc1x9XjPk6osKfK7rSZ"

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
