/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IArbAirdrop,
  IArbAirdropInterface,
} from "../../../contracts/interfaces/IArbAirdrop";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "week",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "ClaimArb",
    type: "event",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint32",
            name: "week",
            type: "uint32",
          },
          {
            internalType: "uint256",
            name: "totalAmount",
            type: "uint256",
          },
          {
            internalType: "bytes32[]",
            name: "proof",
            type: "bytes32[]",
          },
        ],
        internalType: "struct IArbAirdrop.ClaimProof[]",
        name: "claimProofs",
        type: "tuple[]",
      },
    ],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "getClaimed",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class IArbAirdrop__factory {
  static readonly abi = _abi;
  static createInterface(): IArbAirdropInterface {
    return new Interface(_abi) as IArbAirdropInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): IArbAirdrop {
    return new Contract(address, _abi, runner) as unknown as IArbAirdrop;
  }
}