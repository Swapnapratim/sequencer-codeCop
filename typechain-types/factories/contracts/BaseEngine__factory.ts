/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  BaseEngine,
  BaseEngineInterface,
} from "../../contracts/BaseEngine";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint32",
        name: "productId",
        type: "uint32",
      },
    ],
    name: "AddProduct",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint32",
        name: "productId",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "subaccount",
        type: "bytes32",
      },
    ],
    name: "BalanceUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint32",
        name: "productId",
        type: "uint32",
      },
    ],
    name: "ProductUpdate",
    type: "event",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint32",
            name: "productId",
            type: "uint32",
          },
          {
            internalType: "bytes32",
            name: "subaccount",
            type: "bytes32",
          },
          {
            internalType: "int128",
            name: "amountDelta",
            type: "int128",
          },
          {
            internalType: "int128",
            name: "vQuoteDelta",
            type: "int128",
          },
        ],
        internalType: "struct IProductEngine.ProductDelta[]",
        name: "deltas",
        type: "tuple[]",
      },
    ],
    name: "applyDeltas",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "productId",
        type: "uint32",
      },
      {
        internalType: "bytes32",
        name: "subaccount",
        type: "bytes32",
      },
      {
        internalType: "int128",
        name: "amountLp",
        type: "int128",
      },
    ],
    name: "burnLp",
    outputs: [
      {
        internalType: "int128",
        name: "",
        type: "int128",
      },
      {
        internalType: "int128",
        name: "",
        type: "int128",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "liquidatee",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "liquidator",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "feeCalculator",
        type: "address",
      },
    ],
    name: "decomposeLps",
    outputs: [
      {
        internalType: "int128",
        name: "",
        type: "int128",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "productId",
        type: "uint32",
      },
      {
        internalType: "bytes32",
        name: "subaccount",
        type: "bytes32",
      },
    ],
    name: "getBalanceAmount",
    outputs: [
      {
        internalType: "int128",
        name: "",
        type: "int128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getClearinghouse",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getEndpoint",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getEngineType",
    outputs: [
      {
        internalType: "enum IProductEngine.EngineType",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "productId",
        type: "uint32",
      },
    ],
    name: "getOraclePriceX18",
    outputs: [
      {
        internalType: "int128",
        name: "",
        type: "int128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "healthGroup",
        type: "uint32",
      },
    ],
    name: "getOraclePricesX18",
    outputs: [
      {
        components: [
          {
            internalType: "int128",
            name: "spotPriceX18",
            type: "int128",
          },
          {
            internalType: "int128",
            name: "perpPriceX18",
            type: "int128",
          },
        ],
        internalType: "struct IEndpoint.Prices",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "productId",
        type: "uint32",
      },
    ],
    name: "getOrderbook",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getProductIds",
    outputs: [
      {
        internalType: "uint32[]",
        name: "",
        type: "uint32[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_clearinghouse",
        type: "address",
      },
      {
        internalType: "address",
        name: "_quote",
        type: "address",
      },
      {
        internalType: "address",
        name: "_endpoint",
        type: "address",
      },
      {
        internalType: "address",
        name: "_admin",
        type: "address",
      },
      {
        internalType: "address",
        name: "_fees",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    name: "markets",
    outputs: [
      {
        internalType: "contract IOffchainBook",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "productId",
        type: "uint32",
      },
      {
        internalType: "bytes32",
        name: "subaccount",
        type: "bytes32",
      },
      {
        internalType: "int128",
        name: "amountBase",
        type: "int128",
      },
      {
        internalType: "int128",
        name: "quoteAmountLow",
        type: "int128",
      },
      {
        internalType: "int128",
        name: "quoteAmountHigh",
        type: "int128",
      },
    ],
    name: "mintLp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_endpoint",
        type: "address",
      },
    ],
    name: "setEndpoint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "productId",
        type: "uint32",
      },
      {
        internalType: "int128",
        name: "baseDelta",
        type: "int128",
      },
      {
        internalType: "int128",
        name: "quoteDelta",
        type: "int128",
      },
    ],
    name: "swapLp",
    outputs: [
      {
        internalType: "int128",
        name: "",
        type: "int128",
      },
      {
        internalType: "int128",
        name: "",
        type: "int128",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "productId",
        type: "uint32",
      },
      {
        internalType: "int128",
        name: "amount",
        type: "int128",
      },
      {
        internalType: "int128",
        name: "priceX18",
        type: "int128",
      },
      {
        internalType: "int128",
        name: "sizeIncrement",
        type: "int128",
      },
      {
        internalType: "int128",
        name: "lpSpreadX18",
        type: "int128",
      },
    ],
    name: "swapLp",
    outputs: [
      {
        internalType: "int128",
        name: "",
        type: "int128",
      },
      {
        internalType: "int128",
        name: "",
        type: "int128",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "txn",
        type: "bytes",
      },
    ],
    name: "updateProduct",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class BaseEngine__factory {
  static readonly abi = _abi;
  static createInterface(): BaseEngineInterface {
    return new Interface(_abi) as BaseEngineInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): BaseEngine {
    return new Contract(address, _abi, runner) as unknown as BaseEngine;
  }
}
