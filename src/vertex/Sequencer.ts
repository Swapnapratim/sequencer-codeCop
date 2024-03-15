import { ethers } from "hardhat";
import { contractAbi, contractAddress } from "../../constants";
import { TransactionType } from "../types";
import { craeteContract, craeteContractWithSigner } from "./utils";

export default class Sequencer {
  transactions: any[];
  sequencerKey: string;

  constructor(sequencerKey: string) {
    this.transactions = [];
    this.sequencerKey = sequencerKey;
  }

  //add submission logic

  addTransactions(transactions: any) {
    let allMatches = [];

    for (let i = 0; i < transactions.length; i++) {
      this.transactions.push(transactions[i]);
      let tx = this.bundleTransaction(transactions[i]);
      if (tx) allMatches.push(tx);
    }
    return allMatches;
  }

  addTransaction(transaction: any) {
    this.transactions.push(transaction);
  }

  async submitTransactions() {
    const { contract } = craeteContractWithSigner(
      contractAbi.sequencerAbi,
      contractAddress.sequencerMain,
      this.sequencerKey
    );
    const tx = await contract.functions.submitTransactions(this.transactions);
  }

  claimSequencerFees(subaccount: string) {
    this.transactions.push([TransactionType.ClaimSequencerFees, subaccount]);
  }

  bundleTransaction(transaction: any) {
    let type = transaction.type;
    let tx = null;
    if (type === TransactionType.MatchOrderAMM) {
      tx = ethers.utils.concat([
        ethers.utils.arrayify(TransactionType.MatchOrderAMM),
        ethers.utils.defaultAbiCoder.encode(
          [
            {
              type: "tuple",
              name: "MatchOrderAMM",
              components: [
                {
                  name: "productId",
                  type: "uint32",
                },
                {
                  name: "baseDelta",
                  type: "int128",
                },
                {
                  name: "quoteDelta",
                  type: "int128",
                },
                {
                  type: "tuple",
                  name: "taker",
                  components: [
                    {
                      type: "tuple",
                      name: "order",
                      components: [
                        {
                          name: "sender",
                          type: "bytes32",
                        },
                        {
                          name: "priceX18",
                          type: "int128",
                        },
                        {
                          name: "amount",
                          type: "int128",
                        },
                        {
                          name: "expiration",
                          type: "uint64",
                        },
                        {
                          name: "nonce",
                          type: "uint64",
                        },
                      ],
                    },
                    {
                      name: "signature",
                      type: "bytes",
                    },
                  ],
                },
              ],
            } as any,
          ],
          [
            {
              taker: transaction.taker,
              productId: "1",
              baseDelta: transaction.baseDelta,
              quoteDelta: transaction.quoteDelta,
            },
          ]
        ),
      ]);
    } else if (type === TransactionType.MatchOrders) {
      tx = ethers.utils.concat([
        ethers.utils.arrayify(TransactionType.MatchOrders),
        ethers.utils.defaultAbiCoder.encode(
          [
            {
              type: "tuple",
              name: "MatchOrders",
              components: [
                {
                  name: "productId",
                  type: "uint32",
                },
                {
                  name: "amm",
                  type: "bool",
                },
                {
                  type: "tuple",
                  name: "taker",
                  components: [
                    {
                      type: "tuple",
                      name: "order",
                      components: [
                        {
                          name: "sender",
                          type: "bytes32",
                        },
                        {
                          name: "priceX18",
                          type: "int128",
                        },
                        {
                          name: "amount",
                          type: "int128",
                        },

                        {
                          name: "expiration",
                          type: "uint64",
                        },
                        {
                          name: "nonce",
                          type: "uint64",
                        },
                      ],
                    },
                    {
                      name: "signature",
                      type: "bytes",
                    },
                  ],
                },
                {
                  type: "tuple",
                  name: "maker",
                  components: [
                    {
                      type: "tuple",
                      name: "order",
                      components: [
                        {
                          name: "sender",
                          type: "bytes32",
                        },
                        {
                          name: "priceX18",
                          type: "int128",
                        },
                        {
                          name: "amount",
                          type: "int128",
                        },

                        {
                          name: "expiration",
                          type: "uint64",
                        },
                        {
                          name: "nonce",
                          type: "uint64",
                        },
                      ],
                    },
                    {
                      name: "signature",
                      type: "bytes",
                    },
                  ],
                },
              ],
            } as any,
          ],
          [
            {
              productId: transaction.productId,
              amm: true,
              taker: transaction.matchOrders.taker,
              maker: transaction.matchOrders.maker,
            },
          ]
        ),
      ]);
    } else {
    }

    return tx;
  }
}
