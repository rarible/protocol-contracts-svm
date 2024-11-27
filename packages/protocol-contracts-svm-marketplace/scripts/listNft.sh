#!/bin/bash

# Example shell script to list an NFT on the Rarible Marketplace

npx ts-node ./src/cli/listNft.ts \
  -k ~/.config/solana/id.json \
  -r https://testnet.dev2.eclipsenetwork.xyz \
  -m Rarim7DMoD45z1o25QWPsWvTdFSSEdxaxriwWZLLTic \
  --nftMint 24HYiX6NPmjsKoz91UmDaB2ND3UBTSC1fKmAc7hMMQRF \
  --paymentMint So11111111111111111111111111111111111111112 \
  --size 1 \
  --price 650000

  # Order Account: F3GQTWUBM11RFb4HbDhtt21b8xHGqRc5UzqufRk8rRyY
  # order 2: EZz8BGwsN1j4FP172R5sprpXui3AQkeDtX4DoCeG5Ccb