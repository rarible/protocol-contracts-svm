npx ts-node ./src/createDeployment.ts \
  -t BTicWgGhoTsBANuirXS7UCeF6bxfvTnCaxM5HQRRfGZS \
  -k ~/.config/solana/id.json \
  -r https://api.devnet.solana.com \
  -s CAT02 \
  --maxNumberOfTokens 1000 \
  --maxMintsPerWallet 100 \
  -u "ipfs://QmfJh4B8KySR1KHaXRNWkcDBn67ZuJkzAyaVCWAS8Kcezc/0" \
  -n "Collection of Cats" \
  --creators J5xffSinbAQw65TsphSZ8gfaNGAPEfNWL9wwzGNdm3PR:100 \
  --royaltyBasisPoints 1000 \
  --platformFeeValue 500000 \
  --platformFeeRecipients 4yyE2cWHJTU5cu8pem2ApVnHRDGHYvsPvsFCM2WeCPG2:100 \
  --isFeeFlat \
  --extraMeta "type:handmade" "author:Vadim" "value:important" \
  --itemBaseUri "ipfs://QmdHaufjUDJgbZzZ4eFCjtJQyeQpuNwoEvqLm5rq159vC8/{}" \
  --itemBaseName "Cat #{}" 


npx ts-node ./src/addPhase.ts -d 6B9VTRqqqcN22fUNcUVLsN1nswNW3LGxr8MUTXKsdBcu -k ~/.config/solana/id.json -r https://api.devnet.solana.com --maxMintsPerWallet 100 --maxMintsTotal 1000 --priceAmount 500 -s 1709564319 -e 1959564319

npx ts-node ./src/mintWithControls.ts -d 6B9VTRqqqcN22fUNcUVLsN1nswNW3LGxr8MUTXKsdBcu -k ~/.config/solana/id.json -r https://api.devnet.solana.com -p 0 -n 1


npx ts-node ./src/createDeployment.ts \
  -t BTicWgGhoTsBANuirXS7UCeF6bxfvTnCaxM5HQRRfGZS \
  -k ~/.config/solana/id.json \
  -r https://testnet.dev2.eclipsenetwork.xyz \
  -s CAT02 \
  --maxNumberOfTokens 1000 \
  --maxMintsPerWallet 100 \
  -u "ipfs://QmfJh4B8KySR1KHaXRNWkcDBn67ZuJkzAyaVCWAS8Kcezc/0" \
  -n "Collection of Cats" \
  --creators J5xffSinbAQw65TsphSZ8gfaNGAPEfNWL9wwzGNdm3PR:100 \
  --royaltyBasisPoints 1000 \
  --platformFeeValue 500000 \
  --platformFeeRecipients 4yyE2cWHJTU5cu8pem2ApVnHRDGHYvsPvsFCM2WeCPG2:100 \
  --isFeeFlat \
  --extraMeta "type:handmade" "author:Vadim" "value:important" \
  --itemBaseUri "ipfs://QmdHaufjUDJgbZzZ4eFCjtJQyeQpuNwoEvqLm5rq159vC8/{}" \
  --itemBaseName "Cat #{}" 

npx ts-node ./src/addPhase.ts -d 7RRV2F8dXqG1qbkhADfqJVvRrpAYwq27BsTS5KCRgL1u -k ~/.config/solana/id.json -r https://testnet.dev2.eclipsenetwork.xyz --maxMintsPerWallet 100 --maxMintsTotal 1000 --priceAmount 500 -s 1709564319 -e 1959564319

npx ts-node ./src/mintWithControls.ts -d 7RRV2F8dXqG1qbkhADfqJVvRrpAYwq27BsTS5KCRgL1u -k ~/.config/solana/id.json -r https://testnet.dev2.eclipsenetwork.xyz -p 0 -n 1
