/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/rarible_editions.json`.
 */
export type RaribleEditions = {
  "address": "Rari9ftBd6vFdtpn8TDLwN2ze24KKkM5MLEETNiBMNn",
  "metadata": {
    "name": "raribleEditions",
    "version": "0.2.1",
    "spec": "0.1.0",
    "description": "Created with Anchor",
    "repository": "https://github.com/rarible/eclipse-program-library"
  },
  "instructions": [
    {
      "name": "addMetadata",
      "docs": [
        "add additional metadata to mint"
      ],
      "discriminator": [
        231,
        195,
        40,
        240,
        67,
        231,
        53,
        136
      ],
      "accounts": [
        {
          "name": "editionsDeployment",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  100,
                  105,
                  116,
                  105,
                  111,
                  110,
                  115,
                  95,
                  100,
                  101,
                  112,
                  108,
                  111,
                  121,
                  109,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "editions_deployment.symbol",
                "account": "editionsDeployment"
              }
            ]
          }
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "mint",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "vec": {
              "defined": {
                "name": "addMetadataArgs"
              }
            }
          }
        }
      ]
    },
    {
      "name": "addRoyalties",
      "docs": [
        "add royalties to mint"
      ],
      "discriminator": [
        195,
        251,
        126,
        230,
        187,
        134,
        168,
        210
      ],
      "accounts": [
        {
          "name": "editionsDeployment",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  100,
                  105,
                  116,
                  105,
                  111,
                  110,
                  115,
                  95,
                  100,
                  101,
                  112,
                  108,
                  111,
                  121,
                  109,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "editions_deployment.symbol",
                "account": "editionsDeployment"
              }
            ]
          }
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "mint",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": {
              "name": "updateRoyaltiesArgs"
            }
          }
        }
      ]
    },
    {
      "name": "initialise",
      "discriminator": [
        162,
        198,
        118,
        235,
        215,
        247,
        25,
        118
      ],
      "accounts": [
        {
          "name": "editionsDeployment",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  100,
                  105,
                  116,
                  105,
                  111,
                  110,
                  115,
                  95,
                  100,
                  101,
                  112,
                  108,
                  111,
                  121,
                  109,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "arg",
                "path": "input.symbol"
              }
            ]
          }
        },
        {
          "name": "hashlist",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  104,
                  97,
                  115,
                  104,
                  108,
                  105,
                  115,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "editionsDeployment"
              }
            ]
          }
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "creator",
          "writable": true
        },
        {
          "name": "groupMint",
          "writable": true,
          "signer": true
        },
        {
          "name": "group",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          "name": "groupExtensionProgram",
          "address": "RariGDYwEF1jQA4kisHxBxiv1TDuBPVHNNoXFNYriFb"
        }
      ],
      "args": [
        {
          "name": "input",
          "type": {
            "defined": {
              "name": "initialiseInput"
            }
          }
        }
      ]
    },
    {
      "name": "mint",
      "discriminator": [
        51,
        57,
        225,
        47,
        182,
        146,
        137,
        166
      ],
      "accounts": [
        {
          "name": "editionsDeployment",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  100,
                  105,
                  116,
                  105,
                  111,
                  110,
                  115,
                  95,
                  100,
                  101,
                  112,
                  108,
                  111,
                  121,
                  109,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "editions_deployment.symbol",
                "account": "editionsDeployment"
              }
            ]
          }
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "minter",
          "writable": true
        },
        {
          "name": "mint",
          "writable": true,
          "signer": true
        },
        {
          "name": "member",
          "writable": true,
          "signer": true
        },
        {
          "name": "group",
          "writable": true
        },
        {
          "name": "groupMint",
          "writable": true
        },
        {
          "name": "tokenAccount",
          "writable": true
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "groupExtensionProgram",
          "address": "RariGDYwEF1jQA4kisHxBxiv1TDuBPVHNNoXFNYriFb"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "modifyRoyalties",
      "docs": [
        "modify royalties of mint"
      ],
      "discriminator": [
        199,
        95,
        20,
        107,
        136,
        161,
        93,
        137
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "editionsDeployment",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  100,
                  105,
                  116,
                  105,
                  111,
                  110,
                  115,
                  95,
                  100,
                  101,
                  112,
                  108,
                  111,
                  121,
                  109,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "editions_deployment.symbol",
                "account": "editionsDeployment"
              }
            ]
          }
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "mint",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": {
              "name": "updateRoyaltiesArgs"
            }
          }
        }
      ]
    },
    {
      "name": "removeMetadata",
      "docs": [
        "remove additional metadata to mint"
      ],
      "discriminator": [
        81,
        68,
        231,
        49,
        91,
        8,
        111,
        160
      ],
      "accounts": [
        {
          "name": "editionsDeployment",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  100,
                  105,
                  116,
                  105,
                  111,
                  110,
                  115,
                  95,
                  100,
                  101,
                  112,
                  108,
                  111,
                  121,
                  109,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "editions_deployment.symbol",
                "account": "editionsDeployment"
              }
            ]
          }
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "mint"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "vec": {
              "defined": {
                "name": "removeMetadataArgs"
              }
            }
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "editionsDeployment",
      "discriminator": [
        101,
        54,
        68,
        216,
        168,
        131,
        242,
        157
      ]
    },
    {
      "name": "hashlist",
      "discriminator": [
        187,
        203,
        134,
        6,
        43,
        198,
        120,
        186
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "numericalOverflow",
      "msg": "Numeric overflow"
    },
    {
      "code": 6001,
      "name": "derivedKeyInvalid",
      "msg": "Derived key invalid"
    },
    {
      "code": 6002,
      "name": "missingBump",
      "msg": "Missing bump"
    },
    {
      "code": 6003,
      "name": "invalidBump",
      "msg": "Invalid bump"
    },
    {
      "code": 6004,
      "name": "missingMasterEditionForNft",
      "msg": "Missing master edition for NFT"
    },
    {
      "code": 6005,
      "name": "tokenAccountNotEmpty",
      "msg": "Token account not empty"
    },
    {
      "code": 6006,
      "name": "missingTokenAccount",
      "msg": "Missing token account"
    },
    {
      "code": 6007,
      "name": "missingDestinationAccount",
      "msg": "Missing destination account"
    },
    {
      "code": 6008,
      "name": "badTreasury",
      "msg": "Bad treasury"
    },
    {
      "code": 6009,
      "name": "badOwner",
      "msg": "Bad owner"
    },
    {
      "code": 6010,
      "name": "badMint",
      "msg": "Bad mint"
    },
    {
      "code": 6011,
      "name": "badTokenAccountMint",
      "msg": "Bad mint on token account"
    },
    {
      "code": 6012,
      "name": "badTokenAccountOwner",
      "msg": "Bad owner of token account"
    },
    {
      "code": 6013,
      "name": "badTokenAccount",
      "msg": "Bad token account"
    },
    {
      "code": 6014,
      "name": "insufficientFunds",
      "msg": "Insufficient funds"
    },
    {
      "code": 6015,
      "name": "invalidTokenAccount",
      "msg": "Invalid token account"
    },
    {
      "code": 6016,
      "name": "instructionBuildError",
      "msg": "Instruction build error"
    },
    {
      "code": 6017,
      "name": "unexpectedTokenType",
      "msg": "Unexpected token type"
    },
    {
      "code": 6018,
      "name": "cannotTransferMultiplePnfts",
      "msg": "When transferring a pNFT, the amount must be 1"
    },
    {
      "code": 6019,
      "name": "nativeSolAuthSeedsNotSpecified",
      "msg": "Must transfer auth seeds for native sol"
    },
    {
      "code": 6020,
      "name": "missingTokenRecord",
      "msg": "Missing token record"
    },
    {
      "code": 6021,
      "name": "instructionBuilderFailed",
      "msg": "Instruction builder failed"
    },
    {
      "code": 6022,
      "name": "splConversionNotAllowed",
      "msg": "Spl conversion not allowed"
    },
    {
      "code": 6023,
      "name": "invalidCreatorCosigner",
      "msg": "This deployment requires the creator to co-sign"
    }
  ],
  "types": [
    {
      "name": "addMetadataArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "field",
            "type": "string"
          },
          {
            "name": "value",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "creatorWithShare",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "address",
            "type": "pubkey"
          },
          {
            "name": "share",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "editionsDeployment",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "maxNumberOfTokens",
            "type": "u64"
          },
          {
            "name": "numberOfTokensIssued",
            "type": "u64"
          },
          {
            "name": "cosignerProgramId",
            "type": "pubkey"
          },
          {
            "name": "groupMint",
            "type": "pubkey"
          },
          {
            "name": "group",
            "type": "pubkey"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "itemBaseName",
            "type": "string"
          },
          {
            "name": "itemBaseUri",
            "type": "string"
          },
          {
            "name": "itemNameIsTemplate",
            "type": "bool"
          },
          {
            "name": "itemUriIsTemplate",
            "type": "bool"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                98
              ]
            }
          }
        ]
      }
    },
    {
      "name": "hashlist",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "deployment",
            "type": "pubkey"
          },
          {
            "name": "issues",
            "type": {
              "vec": {
                "defined": {
                  "name": "mintAndOrder"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "initialiseInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "collectionName",
            "type": "string"
          },
          {
            "name": "collectionUri",
            "type": "string"
          },
          {
            "name": "maxNumberOfTokens",
            "type": "u64"
          },
          {
            "name": "creatorCosignProgramId",
            "type": {
              "option": "pubkey"
            }
          },
          {
            "name": "itemBaseUri",
            "type": "string"
          },
          {
            "name": "itemBaseName",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "mintAndOrder",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "type": "pubkey"
          },
          {
            "name": "order",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "removeMetadataArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "field",
            "type": "string"
          },
          {
            "name": "value",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "updateRoyaltiesArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "royaltyBasisPoints",
            "type": "u16"
          },
          {
            "name": "creators",
            "type": {
              "vec": {
                "defined": {
                  "name": "creatorWithShare"
                }
              }
            }
          }
        ]
      }
    }
  ]
};
