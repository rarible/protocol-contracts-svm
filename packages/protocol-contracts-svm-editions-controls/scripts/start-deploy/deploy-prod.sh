npx ts-node packages/protocol-contracts-svm-editions-controls/src/cli/createDeployment.ts \
  -t 2SyX7yJqoFuj2T3o8vAFHhvUeJ7YDgtsVroHTTUTR51d \
  -k ~/.config/solana/prod-keypair.json \
  -r https://mainnetbeta-rpc.eclipse.xyz \
  -s STAR \
  --maxNumberOfTokens 0 \
  --maxMintsPerWallet 9999 \
  -u "https://ipfs.raribleuserdata.com/ipfs/QmcnTtUT6pHd6dZ5ebeagzMJ3z13ReZoAg8k8sp4bRiFFD" \
  -n "Starborn" \
  --creators 2SyX7yJqoFuj2T3o8vAFHhvUeJ7YDgtsVroHTTUTR51d:100 \
  --royaltyBasisPoints 500 \
  --platformFeeValue 650000 \
  --platformFeeRecipients AsSKqK7CkxFUf3KaoQzzr8ZLPm5fFguUtVE5QwGALQQn:100 \
  --isFeeFlat \
  --itemBaseUri "https://ipfs.raribleuserdata.com/ipfs/Qmeub6LskbDau8UyxbMWbhTiQdd4NnS4UL1Re6em89ELAT" \
  --itemBaseName "Starborn"

npx ts-node ./src/cli/addPhase.ts \
  -d 8gtjn4LumJ3Yo9tCbL7GdR8mexvmFuGfTLzi1S4EZqSe \
  -k ~/.config/solana/prod-keypair.json \
  -r https://mainnetbeta-rpc.eclipse.xyz \
  --maxMintsPerWallet 9998 \
  --maxMintsTotal 0 \
  --priceAmount 650000 \
  -s 1733493600 \
  -e 1734098400