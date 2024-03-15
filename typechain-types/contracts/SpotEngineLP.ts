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

export declare namespace ISpotEngine {
  export type BalanceNormalizedStruct = { amountNormalized: BigNumberish };

  export type BalanceNormalizedStructOutput = [amountNormalized: bigint] & {
    amountNormalized: bigint;
  };

  export type LpBalanceStruct = { amount: BigNumberish };

  export type LpBalanceStructOutput = [amount: bigint] & { amount: bigint };

  export type BalanceStruct = {
    amount: BigNumberish;
    lastCumulativeMultiplierX18: BigNumberish;
  };

  export type BalanceStructOutput = [
    amount: bigint,
    lastCumulativeMultiplierX18: bigint
  ] & { amount: bigint; lastCumulativeMultiplierX18: bigint };

  export type ConfigStruct = {
    token: AddressLike;
    interestInflectionUtilX18: BigNumberish;
    interestFloorX18: BigNumberish;
    interestSmallCapX18: BigNumberish;
    interestLargeCapX18: BigNumberish;
  };

  export type ConfigStructOutput = [
    token: string,
    interestInflectionUtilX18: bigint,
    interestFloorX18: bigint,
    interestSmallCapX18: bigint,
    interestLargeCapX18: bigint
  ] & {
    token: string;
    interestInflectionUtilX18: bigint;
    interestFloorX18: bigint;
    interestSmallCapX18: bigint;
    interestLargeCapX18: bigint;
  };

  export type LpStateStruct = {
    supply: BigNumberish;
    quote: ISpotEngine.BalanceStruct;
    base: ISpotEngine.BalanceStruct;
  };

  export type LpStateStructOutput = [
    supply: bigint,
    quote: ISpotEngine.BalanceStructOutput,
    base: ISpotEngine.BalanceStructOutput
  ] & {
    supply: bigint;
    quote: ISpotEngine.BalanceStructOutput;
    base: ISpotEngine.BalanceStructOutput;
  };

  export type StateStruct = {
    cumulativeDepositsMultiplierX18: BigNumberish;
    cumulativeBorrowsMultiplierX18: BigNumberish;
    totalDepositsNormalized: BigNumberish;
    totalBorrowsNormalized: BigNumberish;
  };

  export type StateStructOutput = [
    cumulativeDepositsMultiplierX18: bigint,
    cumulativeBorrowsMultiplierX18: bigint,
    totalDepositsNormalized: bigint,
    totalBorrowsNormalized: bigint
  ] & {
    cumulativeDepositsMultiplierX18: bigint;
    cumulativeBorrowsMultiplierX18: bigint;
    totalDepositsNormalized: bigint;
    totalBorrowsNormalized: bigint;
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

export interface SpotEngineLPInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "applyDeltas"
      | "assertUtilization"
      | "balances"
      | "burnLp"
      | "decomposeLps"
      | "getBalance"
      | "getBalanceAmount"
      | "getBalances"
      | "getClearinghouse"
      | "getConfig"
      | "getEndpoint"
      | "getEngineType"
      | "getLpState"
      | "getOraclePriceX18"
      | "getOraclePricesX18"
      | "getOrderbook"
      | "getProductIds"
      | "getStateAndBalance"
      | "getStatesAndBalances"
      | "getWithdrawFee"
      | "hasBalance"
      | "initialize"
      | "lpStates"
      | "manualAssert"
      | "markets"
      | "mintLp"
      | "owner"
      | "renounceOwnership"
      | "setEndpoint"
      | "socializeSubaccount"
      | "states"
      | "swapLp(uint32,int128,int128)"
      | "swapLp(uint32,int128,int128,int128,int128)"
      | "transferOwnership"
      | "updateProduct"
      | "updateStates"
      | "withdrawFees"
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
    functionFragment: "assertUtilization",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "balances",
    values: [BigNumberish, BytesLike]
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
    functionFragment: "getBalance",
    values: [BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getBalanceAmount",
    values: [BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getBalances",
    values: [BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getClearinghouse",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getConfig",
    values: [BigNumberish]
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
    functionFragment: "getLpState",
    values: [BigNumberish]
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
    functionFragment: "getStateAndBalance",
    values: [BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getStatesAndBalances",
    values: [BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getWithdrawFee",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "hasBalance",
    values: [BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [AddressLike, AddressLike, AddressLike, AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "lpStates",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "manualAssert",
    values: [BigNumberish[], BigNumberish[]]
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
    functionFragment: "socializeSubaccount",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "states",
    values: [BigNumberish]
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
  encodeFunctionData(
    functionFragment: "updateStates",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawFees",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "applyDeltas",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "assertUtilization",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "balances", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "burnLp", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "decomposeLps",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getBalance", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getBalanceAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getBalances",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getClearinghouse",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getConfig", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getEndpoint",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getEngineType",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getLpState", data: BytesLike): Result;
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
  decodeFunctionResult(
    functionFragment: "getStateAndBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getStatesAndBalances",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getWithdrawFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "hasBalance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "lpStates", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "manualAssert",
    data: BytesLike
  ): Result;
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
    functionFragment: "socializeSubaccount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "states", data: BytesLike): Result;
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
  decodeFunctionResult(
    functionFragment: "updateStates",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawFees",
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

export interface SpotEngineLP extends BaseContract {
  connect(runner?: ContractRunner | null): SpotEngineLP;
  waitForDeployment(): Promise<this>;

  interface: SpotEngineLPInterface;

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

  assertUtilization: TypedContractMethod<
    [productId: BigNumberish],
    [void],
    "view"
  >;

  balances: TypedContractMethod<
    [arg0: BigNumberish, arg1: BytesLike],
    [
      [
        ISpotEngine.BalanceNormalizedStructOutput,
        ISpotEngine.LpBalanceStructOutput
      ] & {
        balance: ISpotEngine.BalanceNormalizedStructOutput;
        lpBalance: ISpotEngine.LpBalanceStructOutput;
      }
    ],
    "view"
  >;

  burnLp: TypedContractMethod<
    [productId: BigNumberish, subaccount: BytesLike, amountLp: BigNumberish],
    [[bigint, bigint] & { amountBase: bigint; amountQuote: bigint }],
    "nonpayable"
  >;

  decomposeLps: TypedContractMethod<
    [liquidatee: BytesLike, liquidator: BytesLike, feeCalculator: AddressLike],
    [bigint],
    "nonpayable"
  >;

  getBalance: TypedContractMethod<
    [productId: BigNumberish, subaccount: BytesLike],
    [ISpotEngine.BalanceStructOutput],
    "view"
  >;

  getBalanceAmount: TypedContractMethod<
    [productId: BigNumberish, subaccount: BytesLike],
    [bigint],
    "view"
  >;

  getBalances: TypedContractMethod<
    [productId: BigNumberish, subaccount: BytesLike],
    [[ISpotEngine.LpBalanceStructOutput, ISpotEngine.BalanceStructOutput]],
    "view"
  >;

  getClearinghouse: TypedContractMethod<[], [string], "view">;

  getConfig: TypedContractMethod<
    [productId: BigNumberish],
    [ISpotEngine.ConfigStructOutput],
    "view"
  >;

  getEndpoint: TypedContractMethod<[], [string], "view">;

  getEngineType: TypedContractMethod<[], [bigint], "view">;

  getLpState: TypedContractMethod<
    [productId: BigNumberish],
    [ISpotEngine.LpStateStructOutput],
    "view"
  >;

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

  getStateAndBalance: TypedContractMethod<
    [productId: BigNumberish, subaccount: BytesLike],
    [[ISpotEngine.StateStructOutput, ISpotEngine.BalanceStructOutput]],
    "view"
  >;

  getStatesAndBalances: TypedContractMethod<
    [productId: BigNumberish, subaccount: BytesLike],
    [
      [
        ISpotEngine.LpStateStructOutput,
        ISpotEngine.LpBalanceStructOutput,
        ISpotEngine.StateStructOutput,
        ISpotEngine.BalanceStructOutput
      ]
    ],
    "view"
  >;

  getWithdrawFee: TypedContractMethod<
    [productId: BigNumberish],
    [bigint],
    "view"
  >;

  hasBalance: TypedContractMethod<
    [productId: BigNumberish, subaccount: BytesLike],
    [boolean],
    "view"
  >;

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

  lpStates: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [
        bigint,
        ISpotEngine.BalanceStructOutput,
        ISpotEngine.BalanceStructOutput
      ] & {
        supply: bigint;
        quote: ISpotEngine.BalanceStructOutput;
        base: ISpotEngine.BalanceStructOutput;
      }
    ],
    "view"
  >;

  manualAssert: TypedContractMethod<
    [totalDeposits: BigNumberish[], totalBorrows: BigNumberish[]],
    [void],
    "view"
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

  socializeSubaccount: TypedContractMethod<
    [subaccount: BytesLike],
    [void],
    "nonpayable"
  >;

  states: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [bigint, bigint, bigint, bigint] & {
        cumulativeDepositsMultiplierX18: bigint;
        cumulativeBorrowsMultiplierX18: bigint;
        totalDepositsNormalized: bigint;
        totalBorrowsNormalized: bigint;
      }
    ],
    "view"
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
    [[bigint, bigint] & { baseSwapped: bigint; quoteSwapped: bigint }],
    "nonpayable"
  >;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  updateProduct: TypedContractMethod<[txn: BytesLike], [void], "nonpayable">;

  updateStates: TypedContractMethod<[dt: BigNumberish], [void], "nonpayable">;

  withdrawFees: TypedContractMethod<[arg0: BigNumberish], [bigint], "view">;

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
    nameOrSignature: "assertUtilization"
  ): TypedContractMethod<[productId: BigNumberish], [void], "view">;
  getFunction(
    nameOrSignature: "balances"
  ): TypedContractMethod<
    [arg0: BigNumberish, arg1: BytesLike],
    [
      [
        ISpotEngine.BalanceNormalizedStructOutput,
        ISpotEngine.LpBalanceStructOutput
      ] & {
        balance: ISpotEngine.BalanceNormalizedStructOutput;
        lpBalance: ISpotEngine.LpBalanceStructOutput;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "burnLp"
  ): TypedContractMethod<
    [productId: BigNumberish, subaccount: BytesLike, amountLp: BigNumberish],
    [[bigint, bigint] & { amountBase: bigint; amountQuote: bigint }],
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
    nameOrSignature: "getBalance"
  ): TypedContractMethod<
    [productId: BigNumberish, subaccount: BytesLike],
    [ISpotEngine.BalanceStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "getBalanceAmount"
  ): TypedContractMethod<
    [productId: BigNumberish, subaccount: BytesLike],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "getBalances"
  ): TypedContractMethod<
    [productId: BigNumberish, subaccount: BytesLike],
    [[ISpotEngine.LpBalanceStructOutput, ISpotEngine.BalanceStructOutput]],
    "view"
  >;
  getFunction(
    nameOrSignature: "getClearinghouse"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "getConfig"
  ): TypedContractMethod<
    [productId: BigNumberish],
    [ISpotEngine.ConfigStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "getEndpoint"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "getEngineType"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getLpState"
  ): TypedContractMethod<
    [productId: BigNumberish],
    [ISpotEngine.LpStateStructOutput],
    "view"
  >;
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
    nameOrSignature: "getStateAndBalance"
  ): TypedContractMethod<
    [productId: BigNumberish, subaccount: BytesLike],
    [[ISpotEngine.StateStructOutput, ISpotEngine.BalanceStructOutput]],
    "view"
  >;
  getFunction(
    nameOrSignature: "getStatesAndBalances"
  ): TypedContractMethod<
    [productId: BigNumberish, subaccount: BytesLike],
    [
      [
        ISpotEngine.LpStateStructOutput,
        ISpotEngine.LpBalanceStructOutput,
        ISpotEngine.StateStructOutput,
        ISpotEngine.BalanceStructOutput
      ]
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "getWithdrawFee"
  ): TypedContractMethod<[productId: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "hasBalance"
  ): TypedContractMethod<
    [productId: BigNumberish, subaccount: BytesLike],
    [boolean],
    "view"
  >;
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
    nameOrSignature: "lpStates"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [
        bigint,
        ISpotEngine.BalanceStructOutput,
        ISpotEngine.BalanceStructOutput
      ] & {
        supply: bigint;
        quote: ISpotEngine.BalanceStructOutput;
        base: ISpotEngine.BalanceStructOutput;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "manualAssert"
  ): TypedContractMethod<
    [totalDeposits: BigNumberish[], totalBorrows: BigNumberish[]],
    [void],
    "view"
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
    nameOrSignature: "socializeSubaccount"
  ): TypedContractMethod<[subaccount: BytesLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "states"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [bigint, bigint, bigint, bigint] & {
        cumulativeDepositsMultiplierX18: bigint;
        cumulativeBorrowsMultiplierX18: bigint;
        totalDepositsNormalized: bigint;
        totalBorrowsNormalized: bigint;
      }
    ],
    "view"
  >;
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
    [[bigint, bigint] & { baseSwapped: bigint; quoteSwapped: bigint }],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "updateProduct"
  ): TypedContractMethod<[txn: BytesLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "updateStates"
  ): TypedContractMethod<[dt: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "withdrawFees"
  ): TypedContractMethod<[arg0: BigNumberish], [bigint], "view">;

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
