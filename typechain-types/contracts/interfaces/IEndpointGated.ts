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
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
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

export interface IEndpointGatedInterface extends Interface {
  getFunction(
    nameOrSignature: "getEndpoint" | "getOraclePriceX18" | "getOraclePricesX18"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getEndpoint",
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

  decodeFunctionResult(
    functionFragment: "getEndpoint",
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
}

export interface IEndpointGated extends BaseContract {
  connect(runner?: ContractRunner | null): IEndpointGated;
  waitForDeployment(): Promise<this>;

  interface: IEndpointGatedInterface;

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

  getEndpoint: TypedContractMethod<[], [string], "view">;

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

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "getEndpoint"
  ): TypedContractMethod<[], [string], "view">;
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

  filters: {};
}
