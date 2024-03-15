/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../common";
import type { Sequencer, SequencerInterface } from "../../contracts/Sequencer";

const _abi = [
  {
    anonymous: false,
    inputs: [],
    name: "EIP712DomainChanged",
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
    inputs: [],
    name: "eip712Domain",
    outputs: [
      {
        internalType: "bytes1",
        name: "fields",
        type: "bytes1",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "version",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "chainId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "verifyingContract",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
      {
        internalType: "uint256[]",
        name: "extensions",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
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
  {
    inputs: [
      {
        internalType: "address",
        name: "_endpoint",
        type: "address",
      },
    ],
    name: "initialize",
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
        internalType: "uint64",
        name: "idx",
        type: "uint64",
      },
      {
        internalType: "bytes[]",
        name: "transactions",
        type: "bytes[]",
      },
    ],
    name: "submitTransactions",
    outputs: [],
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
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506108eb806100206000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80638da5cb5b1161005b5780638da5cb5b146100d9578063c4d66de8146100f4578063dbbb415514610107578063f2fde38b1461011a57600080fd5b80630d8e6e2c1461008d578063715018a6146100a15780637ac30572146100ab57806384b0196e146100be575b600080fd5b604051601a81526020015b60405180910390f35b6100a961012d565b005b6100a96100b93660046105bc565b610141565b6100c66101b4565b6040516100989796959493929190610691565b6067546040516001600160a01b039091168152602001610098565b6100a961010236600461072a565b610257565b6100a961011536600461072a565b610372565b6100a961012836600461072a565b61039c565b610135610415565b61013f600061046f565b565b610149610415565b6099546040516309c5785760e21b81526001600160a01b0390911690632715e15c9061017d90869086908690600401610783565b600060405180830381600087803b15801561019757600080fd5b505af11580156101ab573d6000803e3d6000fd5b50505050505050565b6000606080600080600060606001546000801b1480156101d45750600254155b61021d5760405162461bcd60e51b81526020600482015260156024820152741152540dcc4c8e88155b9a5b9a5d1a585b1a5e9959605a1b60448201526064015b60405180910390fd5b6102256104c1565b61022d610553565b60408051600080825260208201909252600f60f81b9b939a50919850469750309650945092509050565b600054610100900460ff16158080156102775750600054600160ff909116105b806102915750303b158015610291575060005460ff166001145b6102f45760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610214565b6000805460ff191660011790558015610317576000805461ff0019166101001790555b61031f610562565b61032882610372565b801561036e576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b5050565b61037a610415565b609980546001600160a01b0319166001600160a01b0392909216919091179055565b6103a4610415565b6001600160a01b0381166104095760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610214565b6104128161046f565b50565b6067546001600160a01b0316331461013f5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610214565b606780546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6060600380546104d090610830565b80601f01602080910402602001604051908101604052809291908181526020018280546104fc90610830565b80156105495780601f1061051e57610100808354040283529160200191610549565b820191906000526020600020905b81548152906001019060200180831161052c57829003601f168201915b5050505050905090565b6060600480546104d090610830565b600054610100900460ff166105895760405162461bcd60e51b81526004016102149061086a565b61013f600054610100900460ff166105b35760405162461bcd60e51b81526004016102149061086a565b61013f3361046f565b6000806000604084860312156105d157600080fd5b833567ffffffffffffffff80821682146105ea57600080fd5b9093506020850135908082111561060057600080fd5b818601915086601f83011261061457600080fd5b81358181111561062357600080fd5b8760208260051b850101111561063857600080fd5b6020830194508093505050509250925092565b6000815180845260005b8181101561067157602081850181015186830182015201610655565b506000602082860101526020601f19601f83011685010191505092915050565b60ff60f81b881681526000602060e060208401526106b260e084018a61064b565b83810360408501526106c4818a61064b565b606085018990526001600160a01b038816608086015260a0850187905284810360c08601528551808252602080880193509091019060005b81811015610718578351835292840192918401916001016106fc565b50909c9b505050505050505050505050565b60006020828403121561073c57600080fd5b81356001600160a01b038116811461075357600080fd5b9392505050565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b60006040820167ffffffffffffffff80871684526020604060208601528286845260608601905060608760051b87010193508760005b8881101561082157878603605f190183528135368b9003601e190181126107df57600080fd5b8a018481019035868111156107f357600080fd5b80360382131561080257600080fd5b61080d88828461075a565b9750505091830191908301906001016107b9565b50939998505050505050505050565b600181811c9082168061084457607f821691505b60208210810361086457634e487b7160e01b600052602260045260246000fd5b50919050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b60608201526080019056fea2646970667358221220fc36a58e5771342925faacdc7836d4d3d38d327afc12fc1e6ced0f593b164bfc64736f6c63430008160033";

type SequencerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SequencerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Sequencer__factory extends ContractFactory {
  constructor(...args: SequencerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      Sequencer & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Sequencer__factory {
    return super.connect(runner) as Sequencer__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SequencerInterface {
    return new Interface(_abi) as SequencerInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Sequencer {
    return new Contract(address, _abi, runner) as unknown as Sequencer;
  }
}