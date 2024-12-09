# F3GQTWUBM11RFb4HbDhtt21b8xHGqRc5UzqufRk8rRyY

#!/bin/bash

# Example shell script to buy an NFT on the Rarible Marketplace
# ~/.config/solana/id-buyer.json
export ANCHOR_WALLET=~/.config/solana/id-buyer.json

npx ts-node ./src/cli/fillOrder.ts \
  -k ~/.config/solana/id-buyer.json \
  -r https://testnet.dev2.eclipsenetwork.xyz \
  -o DTMXmwgojSC8NvFsvMaamCzsQd1N8rRusgrmQyMdcDPr \
  --amountToFill 1
#  --ledger # Remove this flag if you are not using a Ledger

## DTMXmwgojSC8NvFsvMaamCzsQd1N8rRusgrmQyMdcDPr

npx ts-node ./src/cli/fillOrder.ts \
  -k ~/.config/solana/id-buyer.json \
  -r https://api.devnet.solana.com \
  -o 8q6CrBvbZrV5dfRDpPMuqYJf22r9P8PKdTwTnr13DXn4 \
  --amountToFill 1