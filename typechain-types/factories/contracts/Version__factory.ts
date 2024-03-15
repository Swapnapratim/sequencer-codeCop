/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type { Version, VersionInterface } from "../../contracts/Version";

const _abi = [
  {
    inputs: [],
    name: "getVersion",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
] as const;

export class Version__factory {
  static readonly abi = _abi;
  static createInterface(): VersionInterface {
    return new Interface(_abi) as VersionInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Version {
    return new Contract(address, _abi, runner) as unknown as Version;
  }
}