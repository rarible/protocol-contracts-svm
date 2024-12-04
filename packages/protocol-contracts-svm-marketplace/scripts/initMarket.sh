#!/bin/bash

# Example shell script to initialize a Rarible Marketplace

npx ts-node ./src/cli/initMarket.ts \
  -k ~/.config/solana/id.json \
  -r https://testnet.dev2.eclipsenetwork.xyz \
  -m Rari4ReeeT8bhbsRGP5J8RBhTFXTAP7iMm7VHuNQTs5 \
  --feeBps 500 \
  --feeRecipient AsSKqK7CkxFUf3KaoQzzr8ZLPm5fFguUtVE5QwGALQQn

npx ts-node ./src/cli/initMarket.ts \
  -k ~/.config/solana/id.json \
  -r https://api.devnet.solana.com \
  -m Rari4ReeeT8bhbsRGP5J8RBhTFXTAP7iMm7VHuNQTs5 \
  --feeBps 500 \
  --feeRecipient AsSKqK7CkxFUf3KaoQzzr8ZLPm5fFguUtVE5QwGALQQn

npx ts-node ./src/cli/initMarket.ts \
  -k ~/.config/solana/id.json \
  -r https://mainnetbeta-rpc.eclipse.xyz \
  -m Rari4ReeeT8bhbsRGP5J8RBhTFXTAP7iMm7VHuNQTs5 \
  --feeBps 500 \
  --feeRecipient AsSKqK7CkxFUf3KaoQzzr8ZLPm5fFguUtVE5QwGALQQn \
  --ledger true