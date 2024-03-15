/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../../common";

export declare namespace IEndpoint {
  export type PricesStruct = {
    spotPriceX18: BigNumberish;
    perpPriceX18: BigNumberish;
  };

  export type PricesStructOutput = [
    spotPriceX18: bigint,
    perpPriceX18: bigint
  ] & { spotPriceX18: bigint; perpPriceX18: bigint };
}

export interface IEndpointInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "depositCollateral"
      | "depositCollateralWithReferral(bytes32,uint32,uint128,string)"
      | "depositCollateralWithReferral(bytes12,uint32,uint128,string)"
      | "getBook"
      | "getNonce"
      | "getPriceX18"
      | "getPricesX18"
      | "getTime"
      | "getVersion"
      | "setBook"
      | "submitSlowModeTransaction"
      | "submitTransactionsChecked"
  ): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: "SubmitTransactions"): EventFragment;

  encodeFunctionData(
    functionFragment: "depositCollateral",
    values: [BytesLike, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "depositCollateralWithReferral(bytes32,uint32,uint128,string)",
    values: [BytesLike, BigNumberish, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "depositCollateralWithReferral(bytes12,uint32,uint128,string)",
    values: [BytesLike, BigNumberish, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getBook",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getNonce",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getPriceX18",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getPricesX18",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "getTime", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getVersion",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setBook",
    values: [BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "submitSlowModeTransaction",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "submitTransactionsChecked",
    values: [BigNumberish, BytesLike[]]
  ): string;

  decodeFunctionResult(
    functionFragment: "depositCollateral",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "depositCollateralWithReferral(bytes32,uint32,uint128,string)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "depositCollateralWithReferral(bytes12,uint32,uint128,string)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getBook", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getNonce", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getPriceX18",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPricesX18",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getTime", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getVersion", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setBook", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "submitSlowModeTransaction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "submitTransactionsChecked",
    data: BytesLike
  ): Result;
}

export namespace SubmitTransactionsEvent {
  export type InputTuple = [];
  export type OutputTuple = [];
  export interface OutputObject {}
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface IEndpoint extends BaseContract {
  connect(runner?: ContractRunner | null): IEndpoint;
  waitForDeployment(): Promise<this>;

  interface: IEndpointInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  depositCollateral: TypedContractMethod<
    [subaccountName: BytesLike, productId: BigNumberish, amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  "depositCollateralWithReferral(bytes32,uint32,uint128,string)": TypedContractMethod<
    [
      subaccount: BytesLike,
      productId: BigNumberish,
      amount: BigNumberish,
      referralCode: string
    ],
    [void],
    "nonpayable"
  >;

  "depositCollateralWithReferral(bytes12,uint32,uint128,string)": TypedContractMethod<
    [
      subaccountName: BytesLike,
      productId: BigNumberish,
      amount: BigNumberish,
      referralCode: string
    ],
    [void],
    "nonpayable"
  >;

  getBook: TypedContractMethod<[productId: BigNumberish], [string], "view">;

  getNonce: TypedContractMethod<[sender: AddressLike], [bigint], "view">;

  getPriceX18: TypedContractMethod<[productId: BigNumberish], [bigint], "view">;

  getPricesX18: TypedContractMethod<
    [healthGroup: BigNumberish],
    [IEndpoint.PricesStructOutput],
    "view"
  >;

  getTime: TypedContractMethod<[], [bigint], "view">;

  getVersion: TypedContractMethod<[], [bigint], "view">;

  setBook: TypedContractMethod<
    [productId: BigNumberish, book: AddressLike],
    [void],
    "nonpayable"
  >;

  submitSlowModeTransaction: TypedContractMethod<
    [transaction: BytesLike],
    [void],
    "nonpayable"
  >;

  submitTransactionsChecked: TypedContractMethod<
    [idx: BigNumberish, transactions: BytesLike[]],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "depositCollateral"
  ): TypedContractMethod<
    [subaccountName: BytesLike, productId: BigNumberish, amount: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "depositCollateralWithReferral(bytes32,uint32,uint128,string)"
  ): TypedContractMethod<
    [
      subaccount: BytesLike,
      productId: BigNumberish,
      amount: BigNumberish,
      referralCode: string
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "depositCollateralWithReferral(bytes12,uint32,uint128,string)"
  ): TypedContractMethod<
    [
      subaccountName: BytesLike,
      productId: BigNumberish,
      amount: BigNumberish,
      referralCode: string
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getBook"
  ): TypedContractMethod<[productId: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "getNonce"
  ): TypedContractMethod<[sender: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "getPriceX18"
  ): TypedContractMethod<[productId: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "getPricesX18"
  ): TypedContractMethod<
    [healthGroup: BigNumberish],
    [IEndpoint.PricesStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "getTime"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getVersion"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "setBook"
  ): TypedContractMethod<
    [productId: BigNumberish, book: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "submitSlowModeTransaction"
  ): TypedContractMethod<[transaction: BytesLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "submitTransactionsChecked"
  ): TypedContractMethod<
    [idx: BigNumberish, transactions: BytesLike[]],
    [void],
    "nonpayable"
  >;

  getEvent(
    key: "SubmitTransactions"
  ): TypedContractEvent<
    SubmitTransactionsEvent.InputTuple,
    SubmitTransactionsEvent.OutputTuple,
    SubmitTransactionsEvent.OutputObject
  >;

  filters: {
    "SubmitTransactions()": TypedContractEvent<
      SubmitTransactionsEvent.InputTuple,
      SubmitTransactionsEvent.OutputTuple,
      SubmitTransactionsEvent.OutputObject
    >;
    SubmitTransactions: TypedContractEvent<
      SubmitTransactionsEvent.InputTuple,
      SubmitTransactionsEvent.OutputTuple,
      SubmitTransactionsEvent.OutputObject
    >;
  };
}