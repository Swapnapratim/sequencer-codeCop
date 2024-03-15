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
import type { UsdtMock, UsdtMockInterface } from "../../contracts/UsdtMock";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
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
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040518060400160405280600781526020016626bcaa37b5b2b760c91b81525060405180604001604052806002815260200161135560f21b81525081600390816200005e91906200022b565b5060046200006d82826200022b565b505050620000af3362000085620000b560201b60201c565b620000959060ff16600a6200040c565b620000a990678ac7230489e8000062000421565b620000ba565b62000451565b601290565b6001600160a01b038216620001155760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640160405180910390fd5b80600260008282546200012991906200043b565b90915550506001600160a01b038216600081815260208181526040808320805486019055518481527fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a35050565b505050565b634e487b7160e01b600052604160045260246000fd5b600181811c90821680620001b057607f821691505b602082108103620001d157634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111562000180576000816000526020600020601f850160051c81016020861015620002025750805b601f850160051c820191505b8181101562000223578281556001016200020e565b505050505050565b81516001600160401b0381111562000247576200024762000185565b6200025f816200025884546200019b565b84620001d7565b602080601f8311600181146200029757600084156200027e5750858301515b600019600386901b1c1916600185901b17855562000223565b600085815260208120601f198616915b82811015620002c857888601518255948401946001909101908401620002a7565b5085821015620002e75787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b634e487b7160e01b600052601160045260246000fd5b600181815b808511156200034e578160001904821115620003325762000332620002f7565b808516156200034057918102915b93841c939080029062000312565b509250929050565b600082620003675750600162000406565b81620003765750600062000406565b81600181146200038f57600281146200039a57620003ba565b600191505062000406565b60ff841115620003ae57620003ae620002f7565b50506001821b62000406565b5060208310610133831016604e8410600b8410161715620003df575081810a62000406565b620003eb83836200030d565b8060001904821115620004025762000402620002f7565b0290505b92915050565b60006200041a838362000356565b9392505050565b8082028115828204841417620004065762000406620002f7565b80820180821115620004065762000406620002f7565b61085380620004616000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c80633950935111610071578063395093511461012357806370a082311461013657806395d89b411461015f578063a457c2d714610167578063a9059cbb1461017a578063dd62ed3e1461018d57600080fd5b806306fdde03146100ae578063095ea7b3146100cc57806318160ddd146100ef57806323b872dd14610101578063313ce56714610114575b600080fd5b6100b66101a0565b6040516100c3919061069c565b60405180910390f35b6100df6100da366004610707565b610232565b60405190151581526020016100c3565b6002545b6040519081526020016100c3565b6100df61010f366004610731565b61024c565b604051601281526020016100c3565b6100df610131366004610707565b610270565b6100f361014436600461076d565b6001600160a01b031660009081526020819052604090205490565b6100b6610292565b6100df610175366004610707565b6102a1565b6100df610188366004610707565b610321565b6100f361019b36600461078f565b61032f565b6060600380546101af906107c2565b80601f01602080910402602001604051908101604052809291908181526020018280546101db906107c2565b80156102285780601f106101fd57610100808354040283529160200191610228565b820191906000526020600020905b81548152906001019060200180831161020b57829003601f168201915b5050505050905090565b60003361024081858561035a565b60019150505b92915050565b60003361025a85828561047e565b6102658585856104f8565b506001949350505050565b600033610240818585610283838361032f565b61028d91906107fc565b61035a565b6060600480546101af906107c2565b600033816102af828661032f565b9050838110156103145760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084015b60405180910390fd5b610265828686840361035a565b6000336102408185856104f8565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6001600160a01b0383166103bc5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b606482015260840161030b565b6001600160a01b03821661041d5760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b606482015260840161030b565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b600061048a848461032f565b905060001981146104f257818110156104e55760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000604482015260640161030b565b6104f2848484840361035a565b50505050565b6001600160a01b03831661055c5760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b606482015260840161030b565b6001600160a01b0382166105be5760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b606482015260840161030b565b6001600160a01b038316600090815260208190526040902054818110156106365760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b606482015260840161030b565b6001600160a01b03848116600081815260208181526040808320878703905593871680835291849020805487019055925185815290927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a36104f2565b60006020808352835180602085015260005b818110156106ca578581018301518582016040015282016106ae565b506000604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b038116811461070257600080fd5b919050565b6000806040838503121561071a57600080fd5b610723836106eb565b946020939093013593505050565b60008060006060848603121561074657600080fd5b61074f846106eb565b925061075d602085016106eb565b9150604084013590509250925092565b60006020828403121561077f57600080fd5b610788826106eb565b9392505050565b600080604083850312156107a257600080fd5b6107ab836106eb565b91506107b9602084016106eb565b90509250929050565b600181811c908216806107d657607f821691505b6020821081036107f657634e487b7160e01b600052602260045260246000fd5b50919050565b8082018082111561024657634e487b7160e01b600052601160045260246000fdfea2646970667358221220b3ff1678416db51bf34894bb66e76b45e3e1afa1e76d2a1d62c350042a2c47ec64736f6c63430008160033";

type UsdtMockConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: UsdtMockConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class UsdtMock__factory extends ContractFactory {
  constructor(...args: UsdtMockConstructorParams) {
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
      UsdtMock & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): UsdtMock__factory {
    return super.connect(runner) as UsdtMock__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): UsdtMockInterface {
    return new Interface(_abi) as UsdtMockInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): UsdtMock {
    return new Contract(address, _abi, runner) as unknown as UsdtMock;
  }
}
