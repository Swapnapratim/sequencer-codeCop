import {
  OrderBookOpts,
  PriceBoundariesX18,
  newProductOpts,
} from "../../../../types";
import LiquidityPools from "../LiquidityPools/LiquidityPools";
import OrderTree from "../OrderTree/OrderTree";
import { ASKS, BIDS } from "../../../../constants";
import Order from "../Order";

export default class BaseMatchEngine {
  books: Map<string, Map<string, OrderTree>>;
  liquidityPools: LiquidityPools;
  defaultlpSlippage: number;

  constructor(orderBookOpts: OrderBookOpts) {
    this.books = new Map<string, Map<string, OrderTree>>();
    this.liquidityPools = new LiquidityPools();
    //i.e 0.01 = 1 percent slippage
    this.defaultlpSlippage = orderBookOpts.defaultlpSlippage;
  }

  newProduct({ productId, lpContract }: newProductOpts) {
    const bookSet = new Map<string, OrderTree>();
    bookSet.set(ASKS, this.newProductTrees(productId).askTree);
    bookSet.set(BIDS, this.newProductTrees(productId).bidTree);
    this.books.set(productId, bookSet);
    this.liquidityPools.addProduct(productId, lpContract);
  }

  newProductTrees(productId: string) {
    return {
      bidTree: new OrderTree(productId),
      askTree: new OrderTree(productId),
    };
  }
  isBestLiquidity(priceX18: number, lowerPrice: number, higherPrice: number) {
    return !higherPrice
      ? true
      : Math.abs(lowerPrice - priceX18!) <= Math.abs(higherPrice - priceX18!);
  }

  isPriceInRange(priceBoundaries: PriceBoundariesX18, priceX18: number) {
    return (
      priceBoundaries.lowerBound < priceX18 &&
      priceX18 < priceBoundaries.higherBound
    );
  }

  shouldFill(
    priceX18: number,
    lowerPrice: any,
    higherPrice: any,
    priceBoundaries: PriceBoundariesX18
  ) {
    return (
      this.isBestLiquidity(priceX18, lowerPrice!, higherPrice!) &&
      this.isPriceInRange(priceBoundaries, lowerPrice)
    );
  }

  addToBook(productId: string, order: Order) {
    const productBook = this.books.get(productId);
    const orderBookSide = productBook?.get(order.amount > 0 ? BIDS : ASKS);
    orderBookSide?.addLimitOrder(order);
  }

  getPriceBoundaries(price: number): PriceBoundariesX18 {
    const diff = this.defaultlpSlippage * price;
    return {
      higherBound: price + diff,
      lowerBound: price - diff,
    };
  }
}
