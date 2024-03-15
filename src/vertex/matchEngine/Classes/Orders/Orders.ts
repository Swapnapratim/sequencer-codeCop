import Order from "../Order/Order";
import { OrderOpts } from "../../../../types/index";
import BaseOrders from "./BaseOrders";
import { OrdersNode } from "./OrdersNode";

export default class Orders extends BaseOrders {
  constructor(price: number, amount: number, data: Order) {
    super(price, amount, data);
  }

  enOrderQueue(data: Order): void {
    const newNode = new OrdersNode(data);
    if (!this.front) {
      this.front = newNode;
      this.rear = newNode;
    } else {
      if (this.rear) {
        this.rear.next = newNode;
        this.rear = newNode;
      } else {
        this.front.next = newNode;
        this.rear = newNode;
      }
    }
    this.increaseVolume(data.amount);
    this.size++;
  }

  deOrderQueue() {
    if (!this.front) {
      return undefined;
    }
    const removedData = this.front.data;
    this.front = this.front.next!;
    if (!this.front) {
      this.rear = null;
    }
    this.decreaseVolume(removedData.amount);
    this.size--;
    return removedData;
  }

  removeAtIndex(index: number) {
    if (index < 0 || index >= this.size) {
      return undefined;
    }
    let current = this.front;
    let previous = null;
    let currentIndex = 0;
    while (current && currentIndex < index) {
      previous = current;
      current = current.next!;
      currentIndex++;
    }
    const removedData = current?.data;
    if (previous === null) {
      this.front = current ? current.next! : null;
    } else {
      previous.next = current ? current.next : null;
      if (previous.next === null) {
        this.rear = previous;
      }
    }
    if (removedData) {
      this.decreaseVolume(removedData.amount);
    }

    this.size--;
    return current ? current.data : undefined;
  }

  matchOrder(order: Order): any {
    let { amount, isTrue } = this.amountToFill(
      this.front?.data.amount!,
      this.front?.data.filled!,
      order.amount,
      order.filled
    );
    if (isTrue) {
      order.fillOrder(-amount!);
      this.front?.data.fillOrder(amount);
      const makerOrder = this.deOrderQueue();
      return { maker: makerOrder, amountFilled: -amount };
    } else {
      this.front!.data.fillOrder(-amount);
      order.fillOrder(amount);
      this.decreaseVolume(amount);
      const makerOrder = this.front?.data;
      return { maker: makerOrder, amountFilled: amount };
    }
  }

  amountToFill(
    makerAmount: number,
    makerFilled: number,
    takerAmount: number,
    takerFilled: number
  ): any {
    if (
      Math.abs(makerAmount - makerFilled) <= Math.abs(takerAmount - takerFilled)
    ) {
      return {
        isTrue: true,
        amount: makerAmount - makerFilled,
      };
    } else {
      return {
        isTrue: false,
        amount: takerAmount - takerFilled,
      };
    }
  }
}
