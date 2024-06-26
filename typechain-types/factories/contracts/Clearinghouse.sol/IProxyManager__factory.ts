/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IProxyManager,
  IProxyManagerInterface,
} from "../../../contracts/Clearinghouse.sol/IProxyManager";

const _abi = [
  {
    inputs: [],
    name: "getProxyManagerHelper",
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
] as const;

export class IProxyManager__factory {
  static readonly abi = _abi;
  static createInterface(): IProxyManagerInterface {
    return new Interface(_abi) as IProxyManagerInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): IProxyManager {
    return new Contract(address, _abi, runner) as unknown as IProxyManager;
  }
}
