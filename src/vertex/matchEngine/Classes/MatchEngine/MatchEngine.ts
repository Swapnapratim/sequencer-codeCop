import OrderTree from "../OrderTree/OrderTree";
import Order from "../Order/Order";
import {
  newTradeOpts,
  PriceBoundariesX18,
  OrderBookOpts,
  AmmTakersTrade,
  newProductOpts,
  EngineMarkets,
} from "../../../../types/index";

import { ethers } from "hardhat";
import BaseMatchEngine from "./BaseMatchEngine";
import { ASKS, BIDS } from "../../../../constants";

export default class MatchEngine extends BaseMatchEngine {
  constructor(orderBookOpts: OrderBookOpts) {
    super(orderBookOpts);
  }

  async processTrade({ productId, rawOrder }: newTradeOpts) {
    const order = new Order(rawOrder);
    const orderBookSide = this.books
      .get(productId)
      ?.get(order.amount > 0 ? ASKS : BIDS);
    let allMtaches = await this.fill(orderBookSide!, order, productId);
    if (!allMtaches!) return [];
    return allMtaches;
  }

  matchOrderWithLp(
    order: Order,
    lpImpliedPrice: number,
    productId: string,
    slippageBoundary: number
  ): AmmTakersTrade[] {
    return this.liquidityPools.fillOrder(
      productId,
      order.amount,
      order.price!,
      lpImpliedPrice,
      order,
      slippageBoundary
    );
  }

  matchOrderWithBook(order: Order, book: OrderTree) {
    return book.fillOrder(order);
  }

  getBook(productId: string) {
    return this.books.get(productId);
  }

  async fill(book: OrderTree, order: Order, productId: string) {
    if (order.price) {
      // console.log(8);
      let trades = await this.limitFill(book, order, productId);
      return trades;
    } else {
      // console.log(88);
      let trades = await this.marketFill(book, order, productId);
      return trades;
    }
  }

  async limitFill(book: OrderTree, order: Order, productId: string) {
    let allMtaches: any[] = [];
    let addedOrderToBook = false;

    while (
      Math.abs(order.filled) < Math.abs(order.amount) &&
      !addedOrderToBook
    ) {
      const bestBook = book.findPriceOrders(
        book.root!,
        order.price!,
        order.amount
      );
      const bestBookPrice = bestBook?.price;

      let lpImpliedLiquidity = await this.liquidityPools.getImpliedLiquidity(
        productId
      );
      const priceBoundaries = this.getPriceBoundaries(
        lpImpliedLiquidity.impliedPrice
      );

      // console.log("bestBookPrice", bestBookPrice);

      if (
        this.shouldFill(
          order.price!,
          lpImpliedLiquidity.impliedPrice,
          bestBookPrice,
          priceBoundaries
        ) &&
        this.liquidityPools.canFill(
          order.amount,
          order.price!,
          lpImpliedLiquidity?.impliedPrice,
          lpImpliedLiquidity
        )
      ) {
        // console.log(1);
        let trades = this.matchOrderWithLp(
          order,
          lpImpliedLiquidity.impliedPrice,
          productId,
          order.amount > 0
            ? priceBoundaries.higherBound
            : priceBoundaries.lowerBound
        );
        allMtaches = [...allMtaches, ...trades];
      } else if (
        this.shouldFill(
          order.price!,
          bestBookPrice,
          lpImpliedLiquidity.impliedPrice,
          priceBoundaries
        )
      ) {
        // console.log(4);
        let trades = this.matchOrderWithBook(order, book);
        // console.log("order", order);
        allMtaches = [...allMtaches, ...trades];
      } else {
        // console.log(2);
        this.addToBook(productId, order);
        addedOrderToBook = true;
      }
    }

    return allMtaches;
  }

  async marketFill(book: OrderTree, order: Order, productId: string) {
    let allMtaches: any[] = [];
    let addedOrderToBook = false;
    const { sender, expiration, nonce, signature } = { ...order };

    let bestBook = book.findPriceOrders(book.root!, order.price!, order.amount);
    let bestBookPrice = bestBook?.price || null;
    let lpImpliedLiquidity = await this.liquidityPools.getImpliedLiquidity(
      productId
    );

    if (bestBookPrice || lpImpliedLiquidity.impliedPrice) {
      let bestMarket = this.getBestMarket(
        order.amount,
        bestBookPrice!,
        lpImpliedLiquidity.impliedPrice
      );

      let bestMarketPrice = this.getBestMarketPrice(
        order.amount,
        bestBookPrice!,
        lpImpliedLiquidity.impliedPrice
      );

      let slippageBoundary =
        bestMarket === EngineMarkets.MARKET
          ? order.amount > 0
            ? this.getPriceBoundaries(bestBookPrice!).higherBound
            : this.getPriceBoundaries(bestBookPrice!).lowerBound
          : order.amount > 0
          ? this.getPriceBoundaries(lpImpliedLiquidity.impliedPrice!)
              .higherBound
          : this.getPriceBoundaries(lpImpliedLiquidity.impliedPrice!)
              .lowerBound;

      let cnt = 0;
      while (
        cnt < 100 &&
        !addedOrderToBook &&
        Math.abs(order.filled) < Math.abs(order.amount)
      ) {
        cnt++;
        bestBook = book.findPriceOrders(book.root!, order.price!, order.amount);
        bestBookPrice = bestBook?.price || null;

        // console.log("bestBook", bestBookPrice, bestBook)

        lpImpliedLiquidity = await this.liquidityPools.getImpliedLiquidity(
          productId
        );

        bestMarket = this.getBestMarket(
          order.amount,
          bestBookPrice!,
          lpImpliedLiquidity.impliedPrice
        );

        bestMarketPrice = this.getBestMarketPrice(
          order.amount,
          bestBookPrice!,
          lpImpliedLiquidity.impliedPrice
        );

        let amountToFill = this.liquidityPools.amountToFill(
          lpImpliedLiquidity!,
          order.amount,
          bestBook
            ? order.amount > 0
              ? bestBookPrice! < slippageBoundary
                ? bestBookPrice!
                : slippageBoundary
              : bestBookPrice! < slippageBoundary
              ? slippageBoundary
              : bestBookPrice!
            : slippageBoundary
        );

        let multiRoute =
          bestBookPrice && order.amount > 0
            ? bestBookPrice < slippageBoundary
            : bestBookPrice! > slippageBoundary;

        // console.log(
        //   "slippageBoundary",
        //   slippageBoundary,
        //   lpImpliedLiquidity.impliedPrice,
        //   bestMarketPrice,
        //   bestBookPrice,

        //   Number(amountToFill),
        //   lpImpliedLiquidity.base * lpImpliedLiquidity.quote
        // );
        if (
          (bestMarket === EngineMarkets.LP &&
            Number(amountToFill) >
              Number(ethers.utils.parseUnits("1", "ether"))) ||
          Number(amountToFill) < Number(ethers.utils.parseUnits("-1", "ether"))
        ) {
          if (multiRoute) {
            console.log("multi route fill");

            let amountToFill = this.liquidityPools.amountToFill(
              lpImpliedLiquidity!,
              order.amount,
              bestBookPrice!
            );

            lpImpliedLiquidity = await this.liquidityPools.getImpliedLiquidity(
              productId
            );

            let trades = this.matchOrderWithLp(
              new Order({
                sender,
                expiration,
                nonce,
                amount: Number(amountToFill!.toFixed(0)),
                price: bestBookPrice,
                filled: 0,
                signature,
              }),
              lpImpliedLiquidity.impliedPrice!,
              productId,
              bestBookPrice!
            );

            order.fillOrder(amountToFill!);

            lpImpliedLiquidity = await this.liquidityPools.getImpliedLiquidity(
              productId
            );

            allMtaches = [...allMtaches, ...trades];
          } else if (!multiRoute) {
            console.log("single route fill");

            let amountToFill = this.liquidityPools.amountToFill(
              lpImpliedLiquidity!,
              order.amount,
              slippageBoundary 
            );

            let newOrder = new Order({
              sender,
              expiration,
              nonce,
              amount: Number(amountToFill!.toFixed(0)),
              price: lpImpliedLiquidity.impliedPrice!,
              filled: 0,
              signature,
            });

            let trades = this.matchOrderWithLp(
              newOrder,
              lpImpliedLiquidity.impliedPrice!,
              productId,
              slippageBoundary
            );

            order.fillOrder(amountToFill!);
            allMtaches = [...allMtaches, ...trades];
            console.log("end", allMtaches, amountToFill);
          } else {
          }
        } else if (
          bestMarket === EngineMarkets.MARKET ||
          bestMarket === EngineMarkets.LP
        ) {
          console.log("market fill");
          let { isTrue, amount } = bestBook?.amountToFill(
            bestBook.front?.data.amount!,
            bestBook.front?.data.filled!,
            order.amount,
            order.filled
          );

          amount = isTrue ? amount : order.amount - order.filled;

          let trades = this.matchOrderWithBook(
            new Order({
              sender,
              expiration,
              nonce,
              amount: amount / 1e18,
              price: bestBookPrice!,
              filled: 0,
              signature,
            }),
            book
          );

          order.fillOrder(isTrue ? -amount : amount);
          allMtaches = [...allMtaches, ...trades];
        } else {
          console.log("added to order book");
          addedOrderToBook = true;
          const { sender, expiration, nonce, amount, filled } = { ...order };
          this.addToBook(
            productId,
            new Order({
              sender,
              expiration,
              nonce,
              amount: Number(amount.toFixed(0)),
              filled,
              price: bestMarketPrice,
              signature,
            })
          );
          console.log("nothing");
        }
      }
    }
    return allMtaches;
  }

  getBestMarket(
    amount: number,
    bestBookPrice: number,
    lpimpliedPrice: number
  ): EngineMarkets {
    if (!bestBookPrice) {
      return EngineMarkets.LP;
    }
    if (!lpimpliedPrice) {
      return EngineMarkets.MARKET;
    }
    return amount > 0
      ? bestBookPrice! <= lpimpliedPrice
        ? EngineMarkets.MARKET
        : EngineMarkets.LP
      : bestBookPrice! >= lpimpliedPrice
      ? EngineMarkets.MARKET
      : EngineMarkets.LP;
  }

  getBestMarketPrice(
    amount: number,
    bestBookPrice: number,
    lpimpliedPrice: number
  ): EngineMarkets {
    return amount > 0
      ? bestBookPrice! < lpimpliedPrice
        ? lpimpliedPrice
        : bestBookPrice!
      : bestBookPrice! >= lpimpliedPrice
      ? lpimpliedPrice
      : bestBookPrice!;
  }
}
