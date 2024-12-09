#!/bin/bash

# Example shell script to list an NFT on the Rarible Marketplace

npx ts-node ./src/cli/listNft.ts \
  -k ~/.config/solana/id.json \
  -r https://testnet.dev2.eclipsenetwork.xyz \
  -m Rarim7DMoD45z1o25QWPsWvTdFSSEdxaxriwWZLLTic \
  --nftMint GfA7jdYQG39tnRasUrMBq5GCkFv5n1aMco3giAs43ULy \
  --paymentMint So11111111111111111111111111111111111111112 \
  --size 1 \
  --price 650000

  # Order Account: F3GQTWUBM11RFb4HbDhtt21b8xHGqRc5UzqufRk8rRyY
  # order 2: EZz8BGwsN1j4FP172R5sprpXui3AQkeDtX4DoCeG5Ccb
  
# sol dev net

#   vfadeev@Vadims-MBP protocol-contracts-svm-editions-controls % npx ts-node ./src/cli/mintWithControls.ts -d 5rPxHARWC3XVjXfFueVzUibCNKUw22hkhdjmj5BqBxEg -k ~/.config/solana/id.json -r https://api.devnet.solana.com -p 0 -n 1
# Raw transaction start:  undefined
# Raw transaction length: 881
# Transaction ID: 552up6XhsvPEJTZUkjJUUVRJZn71bPhGjgcJeM9fbQ9VUVPnwqHkd6M6NBA2wfX9xvJMhETx4aKHv6QyzSr9LPYJ
# REST confirmation for 552up6XhsvPEJTZUkjJUUVRJZn71bPhGjgcJeM9fbQ9VUVPnwqHkd6M6NBA2wfX9xvJMhETx4aKHv6QyzSr9LPYJ {
#   confirmationStatus: 'confirmed',
#   confirmations: 0,
#   err: null,
#   slot: 343975777,
#   status: { Ok: null }
# }
# Returning status {
#   confirmationStatus: 'confirmed',
#   confirmations: 0,
#   err: null,
#   slot: 343975777,
#   status: { Ok: null }
# }
# Minting successful.
# Finished minting
# Resolved via websocket { err: null }
# vfadeev@Vadims-MBP protocol-contracts-svm-editions-controls % npx ts-node ./src/cli/mintWithControls.ts -d 5rPxHARWC3XVjXfFueVzUibCNKUw22hkhdjmj5BqBxEg -k ~/.config/solana/id.json -r https://api.devnet.solana.com -p 0 -n 1
# Raw transaction start:  undefined
# Raw transaction length: 881
# Transaction ID: 2WHC9GkgbDJsBj7oYTLExM55i5yVaiWAi6aoVn2bKgNxMyEaCxPncspuY2VbSoe13SiCWbEcqcoM4SkQZst2avTM
# REST null result for 2WHC9GkgbDJsBj7oYTLExM55i5yVaiWAi6aoVn2bKgNxMyEaCxPncspuY2VbSoe13SiCWbEcqcoM4SkQZst2avTM null
# Resolved via websocket { err: null }
# Returning status { err: null, slot: 343975792, confirmations: 0 }
# Minting successful.
# Finished minting
# vfadeev@Vadims-MBP protocol-contracts-svm-editions-controls % npx ts-node ./src/cli/mintWithControls.ts -d 5rPxHARWC3XVjXfFueVzUibCNKUw22hkhdjmj5BqBxEg -k ~/.config/solana/id.json -r https://api.devnet.solana.com -p 0 -n 1
# Raw transaction start:  undefined
# Raw transaction length: 881
# Transaction ID: 2kjdUGA7KqfWHadHVyZUrGmNd7eLdAaxttW3vdrZuiWH841FjJGmqTJV7nWmsYfDXwWUZYxSjjScNKm84E6bQoNp
# REST null result for 2kjdUGA7KqfWHadHVyZUrGmNd7eLdAaxttW3vdrZuiWH841FjJGmqTJV7nWmsYfDXwWUZYxSjjScNKm84E6bQoNp null
# Resolved via websocket { err: null }
# Returning status { err: null, slot: 343975808, confirmations: 0 }
# Minting successful.
# Finished minting

npx ts-node ./src/cli/listNft.ts \
  -k ~/.config/solana/id.json \
  -r https://api.devnet.solana.com \
  -m Rarim7DMoD45z1o25QWPsWvTdFSSEdxaxriwWZLLTic \
  --nftMint 2cPf2dL8ckHfHJ123YHzUFvgkHk6wjQnPXkoLGLBYntC \
  --paymentMint So11111111111111111111111111111111111111112 \
  --size 1 \
  --price 650000

npx ts-node ./src/cli/listNft.ts \
  -k ~/.config/solana/id.json \
  -r https://api.devnet.solana.com \
  -m Rarim7DMoD45z1o25QWPsWvTdFSSEdxaxriwWZLLTic \
  --nftMint JTRgY2JXDa1JRqnTWRxyzRpwLTeJfUvP8brVaWmZG7i \
  --paymentMint So11111111111111111111111111111111111111112 \
  --size 1 \
  --price 1000000000

  6GQA9MbSCFmyUu1SVTzzNJxPkBPQXugJWU3ci7ghJnFL

npx ts-node ./src/cli/listNft.ts \
  -k ~/.config/solana/prod-keypair.json \
  -r https://mainnetbeta-rpc.eclipse.xyz \
  -m Rari4ReeeT8bhbsRGP5J8RBhTFXTAP7iMm7VHuNQTs5 \
  --nftMint CYh9fw33qfcCkd7tZwkHZ8i2CgkWKZD4XL2ahFCmH9ia \
  --paymentMint So11111111111111111111111111111111111111112 \
  --size 1 \
  --price 650000