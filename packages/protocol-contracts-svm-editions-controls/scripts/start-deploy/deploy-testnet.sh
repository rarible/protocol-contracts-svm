npx ts-node ./src/cli/createDeployment.ts \
  -t 2SyX7yJqoFuj2T3o8vAFHhvUeJ7YDgtsVroHTTUTR51d \
  -k ~/.config/solana/id.json \
  -r https://testnet.dev2.eclipsenetwork.xyz \
  -s STARB \
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
  -d EiMMgT9aaFD4dnoy69AwCTHjyA99aXjr8Hr4EGYfnRSJ \
  -k ~/.config/solana/id.json \
  -r https://testnet.dev2.eclipsenetwork.xyz \
  --maxMintsPerWallet 9998 \
  --maxMintsTotal 0 \
  --priceAmount 650000 \
  -s 1733493600 \
  -e 1734098400

npx ts-node ./src/cli/modifyPhase.ts \
  -d EiMMgT9aaFD4dnoy69AwCTHjyA99aXjr8Hr4EGYfnRSJ \
  -k ~/.config/solana/id.json \
  -r https://testnet.dev2.eclipsenetwork.xyz \
  --maxMintsPerWallet 9998 \
  --maxMintsTotal 0 \
  --priceAmount 650000 \
  -s 1733839200 \
  -e 1734444000 --active true --phaseIndex 0