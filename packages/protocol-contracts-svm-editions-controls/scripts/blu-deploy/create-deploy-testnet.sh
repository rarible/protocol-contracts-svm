npx ts-node ./src/cli/createDeployment.ts \
  -t 5GX68vDNX99NVjTDCf7wuUWQoDw2qvxNruU8TdfJKZjz \
  -k ~/.config/solana/id.json \
  -r https://testnet.dev2.eclipsenetwork.xyz \
  -s BLUT \
  --maxNumberOfTokens 0 \
  --maxMintsPerWallet 10000 \
  -u "https://ipfs.raribleuserdata.com/ipfs/QmZgbRFoL3k73N13m4fASTBPVRLjThnbGasTzgVsqHVyAg" \
  -n "Blue" \
  --creators 5GX68vDNX99NVjTDCf7wuUWQoDw2qvxNruU8TdfJKZjz:100 \
  --royaltyBasisPoints 500 \
  --platformFeeValue 650000 \
  --platformFeeRecipients AsSKqK7CkxFUf3KaoQzzr8ZLPm5fFguUtVE5QwGALQQn:100 \
  --isFeeFlat \
  --itemBaseUri "https://ipfs.raribleuserdata.com/ipfs/Qmc5wNJjEc2LU5dCtDGMH416Nu9Dp3f62T8Viuyr5qV5xQ" \
  --itemBaseName "Blue"

npx ts-node ./src/cli/addPhase.ts \
  -d AYf2PEURux888zwsy3Dh98zxYQeHAfacg7xWR4J68UTR \
  -k ~/.config/solana/id.json \
  -r https://testnet.dev2.eclipsenetwork.xyz \
  --maxMintsPerWallet 10000 \
  --maxMintsTotal 0 \
  --priceAmount 580000 \
  -s 1733148000 \
  -e 1733752800

npx ts-node ./src/cli/modifyPhase.ts \
  -d AYf2PEURux888zwsy3Dh98zxYQeHAfacg7xWR4J68UTR \
  -k ~/.config/solana/id.json \
  -r https://testnet.dev2.eclipsenetwork.xyz \
  --maxMintsPerWallet 10000 \
  --maxMintsTotal 0 \
  --priceAmount 580000 \
  -s 1733839200 \
  -e 1734444000 --active true --phaseIndex 0