// const { getChainId } = hre;
// const chainId = await getChainId();

// const data = {
//     types: {
//       EIP712Domain: [
//         { name: "name", type: "string" },
//         { name: "version", type: "string" },
//         { name: "chainId", type: "uint256" },
//         { name: "verifyingContract", type: "address" },
//       ],
//       data: [
//         {
//           name: "sender",
//           type: "bytes32",
//         },
//         {
//           name: "productId",
//           type: "uint32",
//         },
//         { name: "amount", type: "uint128" },
//         { name: "nonce", type: "uint64" },
//       ],
//     },
//     domain: {
//       name: "Vertex",
//       version: "0.0.1",
//       chainId,
//       verifyingContract: endpoint.address,
//     },
//     data: txn,
//   };

  // let signature = await owner.signTypedData(data.domain, data.types, txn);
// console.log(signature, "sig");

    // let bestMarket = this.getBestMarket(
    //   order.amount,
    //   bestBookPrice!,
    //   lpImpliedLiquidity.impliedPrice
    // );

    // let bestMarketPrice = this.getBestMarketPrice(
    //   order.amount,
    //   bestBookPrice!,
    //   lpImpliedLiquidity.impliedPrice
    // );

    // let slippageBoundary =
    //   bestMarket === EngineMarkets.MARKET
    //     ? order.amount > 0
    //       ? this.getPriceBoundaries(bestBookPrice!).higherBound
    //       : this.getPriceBoundaries(bestBookPrice!).lowerBound
    //     : order.amount > 0
    //     ? this.getPriceBoundaries(lpImpliedLiquidity.impliedPrice!).higherBound
    //     : this.getPriceBoundaries(lpImpliedLiquidity.impliedPrice!).lowerBound;

    // let cnt = 0;
  
  // while (
    //   cnt < 2 && order.amount > 0
    //     ? bestMarketPrice < slippageBoundary
    //     : bestMarketPrice > slippageBoundary &&
    //       Math.abs(order.filled) < Math.abs(order.amount)
    // ) {
    //   bestBook = book.findPriceOrders(book.root!, order.price!);
    //   bestBookPrice = bestBook!.price;

    //   lpImpliedLiquidity = await this.liquidityPools.getImpliedLiquidity(
    //     productId
    //   );

    //   bestMarket = this.getBestMarket(
    //     order.amount,
    //     bestBookPrice!,
    //     lpImpliedLiquidity.impliedPrice
    //   );

    //   bestMarketPrice = this.getBestMarketPrice(
    //     order.amount,
    //     bestBookPrice!,
    //     lpImpliedLiquidity.impliedPrice
    //   );

    //   cnt++;
    //   if (bestMarket === EngineMarkets.MARKET) {
    //     let { isTrue, amount: amountToFill } = bestBook?.amountToFill(
    //       bestBook.front?.data.amount!,
    //       bestBook.front?.data.filled!,
    //       order.amount,
    //       order.filled
    //     );

    //     let newOrder = new Order({
    //       sender,
    //       expiration,
    //       nonce,
    //       amount: amountToFill,
    //       price: bestBookPrice!,
    //       filled: 0,
    //     });

    //     let trades = this.matchOrderWithBook(newOrder, book);

    //     order.fillOrder(isTrue ? -amountToFill : amountToFill);

    //     allMtaches = [...allMtaches, ...trades];
    //   } else {
    //     let multiRoute =
    //       bestBookPrice && order.amount > 0
    //         ? bestBookPrice < slippageBoundary
    //         : bestBookPrice! > slippageBoundary;

    //     if (multiRoute) {
    //       let amountToFill = this.liquidityPools.amountToFill(
    //         lpImpliedLiquidity!,
    //         order.amount,
    //         bestBookPrice!
    //       );

    //       let newOrder = new Order({
    //         sender,
    //         expiration,
    //         nonce,
    //         amount: amountToFill,
    //         price: lpImpliedLiquidity.impliedPrice!,
    //         filled: 0,
    //       });

    //       console.log(1, amountToFill, newOrder, bestBookPrice!);

    //       let trades = this.matchOrderWithLp(
    //         newOrder,
    //         lpImpliedLiquidity.impliedPrice!,
    //         productId,
    //         bestBookPrice!
    //       );

    //       order.fillOrder(amountToFill);

    //       lpImpliedLiquidity = await this.liquidityPools.getImpliedLiquidity(
    //         productId
    //       );

    //       console.log(9, lpImpliedLiquidity);
    //       allMtaches = [...allMtaches, ...trades];
    //     } else if (!multiRoute) {
    //       let amountToFill = this.liquidityPools.amountToFill(
    //         lpImpliedLiquidity!,
    //         order.amount,
    //         slippageBoundary
    //       );

    //       let newOrder = new Order({
    //         sender,
    //         expiration,
    //         nonce,
    //         amount: amountToFill,
    //         price: lpImpliedLiquidity.impliedPrice!,
    //         filled: 0,
    //       });

    //       let trades = this.matchOrderWithLp(
    //         newOrder,
    //         lpImpliedLiquidity.impliedPrice!,
    //         productId,
    //         slippageBoundary
    //       );

    //       order.fillOrder(amountToFill);
    //       allMtaches = [...allMtaches, ...trades];
    //     }
    //   }
    // }