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
} from "../common";

export declare namespace IProductEngine {
  export type ProductDeltaStruct = {
    productId: BigNumberish;
    subaccount: BytesLike;
    amountDelta: BigNumberish;
    vQuoteDelta: BigNumberish;
  };

  export type ProductDeltaStructOutput = [
    productId: bigint,
    subaccount: string,
    amountDelta: bigint,
    vQuoteDelta: bigint
  ] & {
    productId: bigint;
    subaccount: string;
    amountDelta: bigint;
    vQuoteDelta: bigint;
  };
}

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

export interface BaseEngineInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "applyDeltas"
      | "burnLp"
      | "decomposeLps"
      | "getBalanceAmount"
      | "getClearinghouse"
      | "getEndpoint"
      | "getEngineType"
      | "getOraclePriceX18"
      | "getOraclePricesX18"
      | "getOrderbook"
      | "getProductIds"
      | "initialize"
      | "markets"
      | "mintLp"
      | "owner"
      | "renounceOwnership"
      | "setEndpoint"
      | "swapLp(uint32,int128,int128)"
      | "swapLp(uint32,int128,int128,int128,int128)"
      | "transferOwnership"
      | "updateProduct"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "AddProduct"
      | "BalanceUpdate"
      | "Initialized"
      | "OwnershipTransferred"
      | "ProductUpdate"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "applyDeltas",
    values: [IProductEngine.ProductDeltaStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "burnLp",
    values: [BigNumberish, BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "decomposeLps",
    values: [BytesLike, BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getBalanceAmount",
    values: [BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getClearinghouse",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getEndpoint",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getEngineType",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getOraclePriceX18",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getOraclePricesX18",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getOrderbook",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getProductIds",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [AddressLike, AddressLike, AddressLike, AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "markets",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "mintLp",
    values: [BigNumberish, BytesLike, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setEndpoint",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "swapLp(uint32,int128,int128)",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "swapLp(uint32,int128,int128,int128,int128)",
    values: [
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "updateProduct",
    values: [BytesLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "applyDeltas",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "burnLp", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "decomposeLps",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getBalanceAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getClearinghouse",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getEndpoint",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getEngineType",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getOraclePriceX18",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getOraclePricesX18",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getOrderbook",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getProductIds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "markets", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "mintLp", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setEndpoint",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "swapLp(uint32,int128,int128)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "swapLp(uint32,int128,int128,int128,int128)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateProduct",
    data: BytesLike
  ): Result;
}

export namespace AddProductEvent {
  export type InputTuple = [productId: BigNumberish];
  export type OutputTuple = [productId: bigint];
  export interface OutputObject {
    productId: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace BalanceUpdateEvent {
  export type InputTuple = [productId: BigNumberish, subaccount: BytesLike];
  export type OutputTuple = [productId: bigint, subaccount: string];
  export interface OutputObject {
    productId: bigint;
    subaccount: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace InitializedEvent {
  export type InputTuple = [version: BigNumberish];
  export type OutputTuple = [version: bigint];
  export interface OutputObject {
    version: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ProductUpdateEvent {
  export type InputTuple = [productId: BigNumberish];
  export type OutputTuple = [productId: bigint];
  export interface OutputObject {
    productId: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface BaseEngine extends BaseContract {
  connect(runner?: ContractRunner | null): BaseEngine;
  waitForDeployment(): Promise<this>;

  interface: BaseEngineInterface;

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

  applyDeltas: TypedContractMethod<
    [deltas: IProductEngine.ProductDeltaStruct[]],
    [void],
    "nonpayable"
  >;

  burnLp: TypedContractMethod<
    [productId: BigNumberish, subaccount: BytesLike, amountLp: BigNumberish],
    [[bigint, bigint]],
    "nonpayable"
  >;

  decomposeLps: TypedContractMethod<
    [liquidatee: BytesLike, liquidator: BytesLike, feeCalculator: AddressLike],
    [bigint],
    "nonpayable"
  >;

  getBalanceAmount: TypedContractMethod<
    [productId: BigNumberish, subaccount: BytesLike],
    [bigint],
    "view"
  >;

  getClearinghouse: TypedContractMethod<[], [string], "view">;

  getEndpoint: TypedContractMethod<[], [string], "view">;

  getEngineType: TypedContractMethod<[], [bigint], "view">;

  getOraclePriceX18: TypedContractMethod<
    [productId: BigNumberish],
    [bigint],
    "view"
  >;

  getOraclePricesX18: TypedContractMethod<
    [healthGroup: BigNumberish],
    [IEndpoint.PricesStructOutput],
    "view"
  >;

  getOrderbook: TypedContractMethod<
    [productId: BigNumberish],
    [string],
    "view"
  >;

  getProductIds: TypedContractMethod<[], [bigint[]], "view">;

  initialize: TypedContractMethod<
    [
      _clearinghouse: AddressLike,
      _quote: AddressLike,
      _endpoint: AddressLike,
      _admin: AddressLike,
      _fees: AddressLike
    ],
    [void],
    "nonpayable"
  >;

  markets: TypedContractMethod<[arg0: BigNumberish], [string], "view">;

  mintLp: TypedContractMethod<
    [
      productId: BigNumberish,
      subaccount: BytesLike,
      amountBase: BigNumberish,
      quoteAmountLow: BigNumberish,
      quoteAmountHigh: BigNumberish
    ],
    [void],
    "nonpayable"
  >;

  owner: TypedContractMethod<[], [string], "view">;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  setEndpoint: TypedContractMethod<
    [_endpoint: AddressLike],
    [void],
    "nonpayable"
  >;

  "swapLp(uint32,int128,int128)": TypedContractMethod<
    [
      productId: BigNumberish,
      baseDelta: BigNumberish,
      quoteDelta: BigNumberish
    ],
    [[bigint, bigint]],
    "nonpayable"
  >;

  "swapLp(uint32,int128,int128,int128,int128)": TypedContractMethod<
    [
      productId: BigNumberish,
      amount: BigNumberish,
      priceX18: BigNumberish,
      sizeIncrement: BigNumberish,
      lpSpreadX18: BigNumberish
    ],
    [[bigint, bigint]],
    "nonpayable"
  >;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  updateProduct: TypedContractMethod<[txn: BytesLike], [void], "nonpayable">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "applyDeltas"
  ): TypedContractMethod<
    [deltas: IProductEngine.ProductDeltaStruct[]],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "burnLp"
  ): TypedContractMethod<
    [productId: BigNumberish, subaccount: BytesLike, amountLp: BigNumberish],
    [[bigint, bigint]],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "decomposeLps"
  ): TypedContractMethod<
    [liquidatee: BytesLike, liquidator: BytesLike, feeCalculator: AddressLike],
    [bigint],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getBalanceAmount"
  ): TypedContractMethod<
    [productId: BigNumberish, subaccount: BytesLike],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "getClearinghouse"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "getEndpoint"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "getEngineType"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getOraclePriceX18"
  ): TypedContractMethod<[productId: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "getOraclePricesX18"
  ): TypedContractMethod<
    [healthGroup: BigNumberish],
    [IEndpoint.PricesStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "getOrderbook"
  ): TypedContractMethod<[productId: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "getProductIds"
  ): TypedContractMethod<[], [bigint[]], "view">;
  getFunction(
    nameOrSignature: "initialize"
  ): TypedContractMethod<
    [
      _clearinghouse: AddressLike,
      _quote: AddressLike,
      _endpoint: AddressLike,
      _admin: AddressLike,
      _fees: AddressLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "markets"
  ): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "mintLp"
  ): TypedContractMethod<
    [
      productId: BigNumberish,
      subaccount: BytesLike,
      amountBase: BigNumberish,
      quoteAmountLow: BigNumberish,
      quoteAmountHigh: BigNumberish
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setEndpoint"
  ): TypedContractMethod<[_endpoint: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "swapLp(uint32,int128,int128)"
  ): TypedContractMethod<
    [
      productId: BigNumberish,
      baseDelta: BigNumberish,
      quoteDelta: BigNumberish
    ],
    [[bigint, bigint]],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "swapLp(uint32,int128,int128,int128,int128)"
  ): TypedContractMethod<
    [
      productId: BigNumberish,
      amount: BigNumberish,
      priceX18: BigNumberish,
      sizeIncrement: BigNumberish,
      lpSpreadX18: BigNumberish
    ],
    [[bigint, bigint]],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "updateProduct"
  ): TypedContractMethod<[txn: BytesLike], [void], "nonpayable">;

  getEvent(
    key: "AddProduct"
  ): TypedContractEvent<
    AddProductEvent.InputTuple,
    AddProductEvent.OutputTuple,
    AddProductEvent.OutputObject
  >;
  getEvent(
    key: "BalanceUpdate"
  ): TypedContractEvent<
    BalanceUpdateEvent.InputTuple,
    BalanceUpdateEvent.OutputTuple,
    BalanceUpdateEvent.OutputObject
  >;
  getEvent(
    key: "Initialized"
  ): TypedContractEvent<
    InitializedEvent.InputTuple,
    InitializedEvent.OutputTuple,
    InitializedEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;
  getEvent(
    key: "ProductUpdate"
  ): TypedContractEvent<
    ProductUpdateEvent.InputTuple,
    ProductUpdateEvent.OutputTuple,
    ProductUpdateEvent.OutputObject
  >;

  filters: {
    "AddProduct(uint32)": TypedContractEvent<
      AddProductEvent.InputTuple,
      AddProductEvent.OutputTuple,
      AddProductEvent.OutputObject
    >;
    AddProduct: TypedContractEvent<
      AddProductEvent.InputTuple,
      AddProductEvent.OutputTuple,
      AddProductEvent.OutputObject
    >;

    "BalanceUpdate(uint32,bytes32)": TypedContractEvent<
      BalanceUpdateEvent.InputTuple,
      BalanceUpdateEvent.OutputTuple,
      BalanceUpdateEvent.OutputObject
    >;
    BalanceUpdate: TypedContractEvent<
      BalanceUpdateEvent.InputTuple,
      BalanceUpdateEvent.OutputTuple,
      BalanceUpdateEvent.OutputObject
    >;

    "Initialized(uint8)": TypedContractEvent<
      InitializedEvent.InputTuple,
      InitializedEvent.OutputTuple,
      InitializedEvent.OutputObject
    >;
    Initialized: TypedContractEvent<
      InitializedEvent.InputTuple,
      InitializedEvent.OutputTuple,
      InitializedEvent.OutputObject
    >;

    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;

    "ProductUpdate(uint32)": TypedContractEvent<
      ProductUpdateEvent.InputTuple,
      ProductUpdateEvent.OutputTuple,
      ProductUpdateEvent.OutputObject
    >;
    ProductUpdate: TypedContractEvent<
      ProductUpdateEvent.InputTuple,
      ProductUpdateEvent.OutputTuple,
      ProductUpdateEvent.OutputObject
    >;
  };
}
