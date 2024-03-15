import Order from "../Order/Order";
import { OrdersNode } from "./OrdersNode";

export default class BaseOrders {
  front: OrdersNode | null;
  rear: OrdersNode | null;
  size: number;
  volume: number;
  price: number | null;
  constructor(price: number, amount: number, data: Order) {
    this.front = new OrdersNode(data);
    this.rear = null;
    this.size = 1;
    this.volume = amount;
    this.price = price;
  }

  increaseVolume(amount: number) {
    this.volume = this.volume + amount;
  }

  decreaseVolume(amount: number) {
    this.volume = this.volume - amount;
  }
}
