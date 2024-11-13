npx ts-node ./src/createDeployment.ts \
  -t CykaFUdgwhWpJZxirvKw8mA6e4SRPkBzftPRzVT6hYKW \
  -k ~/.config/solana/id.json \
  -r https://testnet.dev2.eclipsenetwork.xyz \
  -s AND \
  --maxNumberOfTokens 0 \
  --maxMintsPerWallet 100 \
  -u "https://ipfs.raribleuserdata.com/ipfs/QmQGXvLWPTBVnMd7aEsEXytvhZBVgUTzVe8ec6JvZmDnRZ" \
  -n "Andromeda" \
  --creators CykaFUdgwhWpJZxirvKw8mA6e4SRPkBzftPRzVT6hYKW:100 \
  --royaltyBasisPoints 500 \
  --platformFeeValue 300000 \
  --platformFeeRecipients AsSKqK7CkxFUf3KaoQzzr8ZLPm5fFguUtVE5QwGALQQn:100 \
  --isFeeFlat \
  --itemBaseUri "https://ipfs.raribleuserdata.com/ipfs/QmQGXvLWPTBVnMd7aEsEXytvhZBVgUTzVe8ec6JvZmDnRZ" \
  --itemBaseName "Andromeda"


npx ts-node ./src/addPhase.ts -d GYYKgGzgXnk7icNYdTAqWtBLs1T7ZsAZXYsjNz1SmS6c -k ~/.config/solana/id.json -r https://testnet.dev2.eclipsenetwork.xyz --maxMintsPerWallet 100 --maxMintsTotal 0 --priceAmount 300000 -s 1709564319 -e 1999564319

npx ts-node ./src/mintWithControls.ts -d GYYKgGzgXnk7icNYdTAqWtBLs1T7ZsAZXYsjNz1SmS6c -k ~/.config/solana/id.json -r https://testnet.dev2.eclipsenetwork.xyz -p 0 -n 1
