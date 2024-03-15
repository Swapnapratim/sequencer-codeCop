import Order from "../Order/Order";
import Orders from "../Orders/Orders";
import OrderTreeNode from "./OrderTreeNode";
import {
  TransactionType,
  mathchTakersMakersTrade,
} from "../../../../types/index";
import BaseOrderTree from "./BaseOrderTree";

export default class OrderTree extends BaseOrderTree {
  constructor(productId: string) {
    super(productId);
  }

  addLimitOrder(order: Order) {
    const bestPrice = this.findPriceOrders(
      this.root!,
      order.price!,
      order.amount
    );
    if (bestPrice) {
      bestPrice.enOrderQueue(order);
    } else {
      this.newLimitOrder(order);
    }
  }

  newLimitOrder(order: Order) {
    const newOrderQueue = new Orders(order.price!, order.amount, order);
    this.insert(newOrderQueue);
  }

  fillOrder(order: Order): mathchTakersMakersTrade[] {
    const orders = this.findPriceOrders(
      this.root!,
      order.price!,
      order.amount
    )!;
    let trades: mathchTakersMakersTrade[] = [];

    while (Math.abs(order.filled) < Math.abs(order.amount) && orders.front) {
      const { maker, amountFilled } = orders.matchOrder(order);
      trades.push({
        type: TransactionType.MatchOrders,
        matchOrders: {
          taker: {
            order: {
              sender: order.sender,
              priceX18: order.priceX18!.toString(),
              amount: Math.floor(amountFilled).toString(),
              expiration: order.expiration,
              nonce: order.nonce,
            },
            signature: order.signature,
          },
          maker: {
            order: {
              sender: maker.sender,
              priceX18: maker.priceX18.toString(),
              amount: Math.floor(-amountFilled).toString(),
              expiration: maker.expiration,
              nonce: maker.nonce,
            },
            signature: maker.signature,
          },
        },
        productId: Number(this.productId),
      });
    }
    if (!orders.front) {
      this.deletePrriceX18(orders.price!);
    }
    return trades.length === 0 ? [] : trades;
  }

  findPriceOrders(
    node: OrderTreeNode,
    price: number | null,
    amount: number
  ): Orders | null {
    if (!node) return null;
    if (!node.data) return null;

    if (node.data?.price! == price) {
      return node.data!;
    } else if (!price) {
      if (amount > 0) {
        if (!node.left) return node.data;
      } else {
        if (!node.right) return node.data;
      }
    }

    const leftOrders = this.findPriceOrders(node.left!, price, amount);
    const rightOrders = this.findPriceOrders(node.right!, price, amount);

    return amount > 0 ? leftOrders || rightOrders : rightOrders || leftOrders;
  }

  deletePrriceX18(priceX18: number) {
    this.root = this.deleteRecursive(this.root!, priceX18);
  }
}
