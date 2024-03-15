import { MatchOrderAMM, MatchOrders } from "../constants";

// LiquidityPool
export interface Lpstate {
  base: number;
  quote: number;
}

export interface LpDeltas {
  qouteDelta: number;
  baseDelta: number;
  amountFilled: number;
}

export interface ImpliedLiquidity {
  base: number;
  quote: number;
  impliedPriceX18: number;
  impliedPrice: number;
}

export interface AmmTakersTrade {
  type: TransactionType.MatchOrderAMM;
  baseDelta: number | string;
  quoteDelta: number | string;
  taker: {
    order: OnChainOrder;
    signature: any;
  };
  productId: number;
}

export interface OnChainOrder {
  sender: string;
  priceX18: number | string;
  amount: number | string;
  expiration: number | string;
  nonce: any;
}

// Order
export interface OrderOpts {
  price?: number | null;
  sender: string;
  priceX18?: number;
  amount: number;
  expiration: string;
  nonce?: string | bigint;
  filled: number;
  type?: OrderType;
  signature?: any;
}

// OrderBook
export interface newTradeOpts {
  productId: string;
  rawOrder: OrderOpts;
}

export interface PriceBoundariesX18 {
  higherBound: number;
  lowerBound: number;
}

export interface OrderBookOpts {
  defaultlpSlippage: number;
}

//OrderTree
export interface mathchTakersMakersTrade {
  type: TransactionType.MatchOrders;
  matchOrders: {
    taker: { order: OnChainOrder; signature: any };
    maker: { order: OnChainOrder; signature: any };
  };
  productId: number;
}

export enum TransactionType {
  LiquidateSubaccount,
  DepositCollateral,
  WithdrawCollateral,
  SpotTick,
  UpdatePrice,
  SettlePnl,
  MatchOrders,
  DepositInsurance,
  ExecuteSlowMode,
  MintLp,
  BurnLp,
  SwapAMM,
  MatchOrderAMM,
  DumpFees,
  ClaimSequencerFees,
  PerpTick,
  ManualAssert,
  Rebate,
  UpdateProduct,
  LinkSigner,
  UpdateFeeRates,
  BurnLpAndTransfer,
}

export enum EngineType {
  SPOT,
  PERP,
}

export interface newProductOpts {
  productId: string;
  lpContract: any;
}

export enum OrderType {
  LIMIT,
  MARKET,
}

export enum EngineMarkets {
  LP,
  MARKET,
}
