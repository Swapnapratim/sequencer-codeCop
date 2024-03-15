import { ethers } from "hardhat";
import {
  AmmTakersTrade,
  ImpliedLiquidity,
  LpDeltas,
  TransactionType,
} from "../../../../types";
import Order from "../Order";

export default class BaseLiquidityPools {
  lpsStates: Map<string, any>;
  lpsStatesChache: Map<string, ImpliedLiquidity>;

  constructor() {
    this.lpsStates = new Map<string, any>();
    this.lpsStatesChache = new Map<string, ImpliedLiquidity>();
  }

  addProduct(productId: string, lpPool: any) {
    this.lpsStates.set(productId, lpPool);
  }

  buildAmmTakersTrade(
    baseDelta: number,
    qouteDelta: number,
    order: Order,
    amountFilled: number,
    productId: string
  ): AmmTakersTrade {
    let priceX18 =
      amountFilled > 0
        ? -(Number(Math.ceil(Number(qouteDelta.toPrecision(7)))) * 1e18) /
          Number(Math.floor(Number(baseDelta.toPrecision(8))))
        : -(Number(Math.floor(Number(qouteDelta.toPrecision(10)))) * 1e18) /
          Number(Math.floor(Number(baseDelta.toPrecision(7))));

    return {
      type: TransactionType.MatchOrderAMM,
      baseDelta: baseDelta.toString(),
      quoteDelta: qouteDelta.toString(),
      taker: {
        order: {
          sender: order.sender,
          priceX18: priceX18.toString(),
          amount: (-baseDelta).toString(),
          expiration: order.expiration,
          nonce: order.nonce,
        },
        signature: order.signature,
      },
      productId: Number(productId),
    };
  }

  getLpDeltas(
    amount: number,
    price: number,
    lpImpliedPrice: number
  ): LpDeltas | null {
    if (amount > 0) {
      if (lpImpliedPrice > price) return null;
      return {
        qouteDelta: amount * lpImpliedPrice,
        baseDelta: -((amount * lpImpliedPrice) / price),
        amountFilled: amount,
      };
    } else if (amount < 0) {
      if (lpImpliedPrice < price) return null;
      return {
        qouteDelta: amount * price,
        baseDelta: -amount,
        amountFilled: amount,
      };
    }
    return null;
  }

  isPricesCross(
    amount: number,
    price: number,
    lpImpliedPrice: number
  ): boolean {
    return amount > 0 ? lpImpliedPrice <= price : lpImpliedPrice >= price;
  }

  isLiquid(amount: number, lmpliedLiquidity: ImpliedLiquidity): boolean {
    return amount > 0
      ? lmpliedLiquidity?.base > 0
      : lmpliedLiquidity?.quote > 0;
  }
}
