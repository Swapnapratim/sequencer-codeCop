import Order from "../Order/Order";
import {
  LpDeltas,
  ImpliedLiquidity,
  AmmTakersTrade,
} from "../../../../types/index";
import { ethers } from "hardhat";
import BaseLiquidityPools from "./BaseLiquidityPools";

export default class LiquidityPools extends BaseLiquidityPools {
  constructor() {
    super();
  }
  async getImpliedLiquidity(productId: string) {
    const lpState = this.lpsStatesChache.get(productId);
    if (!lpState) {
      let lpState = await this._getImpliedLiquidity(productId);
      return lpState;
    }
    return lpState;
  }

  async _getImpliedLiquidity(productId: string) {
    let lpState = await this.lpsStates.get(productId).getLpState(productId);

    lpState = {
      base: Number(lpState.base.amount),
      quote: Number(lpState.quote.amount),
      impliedPriceX18:
        (Number(lpState.quote.amount) / Number(lpState.base.amount)) *
        Number(ethers.utils.parseUnits("1", "ether")),
      impliedPrice: Number(lpState.quote.amount) / Number(lpState.base.amount),
    };

    this.lpsStatesChache.set(productId, lpState);
    return lpState;
  }

  fillOrder(
    productId: string,
    amount: number,
    priceX18: number,
    lpImpliedPrice: number,
    order: Order,
    slippageBoundary: number
  ): AmmTakersTrade[] {
    const tradeDeltas = this._fillOrder(
      productId,
      amount,
      priceX18,
      lpImpliedPrice,
      order,
      slippageBoundary
    );
    if (!tradeDeltas) return [];
    return [
      this.buildAmmTakersTrade(
        tradeDeltas.baseDelta,
        tradeDeltas.qouteDelta,
        order,
        tradeDeltas.amountFilled,
        productId
      ),
    ];
  }

  _fillOrder(
    productId: string,
    amount: number,
    priceX18: number,
    lpImpliedPrice: number,
    order: Order,
    slippageBoundary: number
  ): LpDeltas | null {
    const lpState = this.lpsStatesChache.get(productId);
    const amountToFill = this.amountToFill(lpState!, amount, slippageBoundary);
    order.fillOrder(amountToFill);
    // console.log("amountToFill", amountToFill, priceX18, lpImpliedPrice);
    const trade = this.getLpDeltas(amountToFill, priceX18, lpImpliedPrice);
    if (!trade) return null;
    // console.log("trade", trade);
    this.updateLpDeltas(productId, trade!.baseDelta, trade!.qouteDelta);
    return trade;
  }

  updateLpDeltas(productId: string, baseDelta: number, qouteDelta: number) {
    const lpState = this.lpsStatesChache.get(productId);
    lpState!.base += baseDelta;
    lpState!.quote += qouteDelta;
    lpState!.impliedPrice = lpState!.quote / lpState!.base;
    lpState!.impliedPriceX18 =
      lpState!.impliedPrice * Number(ethers.utils.parseUnits("1", "ether"));
  }

  amountToFill(
    ImpliedLiquidity: ImpliedLiquidity,
    amount: number,
    slippageBoundary: number
  ) {
    let baseAmount;
    if (!ImpliedLiquidity || !amount || !slippageBoundary) return 0;

    baseAmount =
      (slippageBoundary * ImpliedLiquidity.base - ImpliedLiquidity.quote) /
      (ImpliedLiquidity.impliedPrice + slippageBoundary);

    if (amount > 0) baseAmount = baseAmount > amount ? amount : baseAmount;
    if (amount < 0) baseAmount = baseAmount < amount ? amount : baseAmount;
    baseAmount = Number(baseAmount.toFixed(0)) === 0 ? 0 : baseAmount;

    return Number(baseAmount!.toFixed(5));
  }

  canFill(
    amount: number,
    price: number,
    lpImpliedPrice: number,
    lmpliedLiquidity: ImpliedLiquidity
  ): boolean {
    return (
      this.isPricesCross(amount, price, lpImpliedPrice) &&
      this.isLiquid(amount, lmpliedLiquidity)
    );
  }

}
