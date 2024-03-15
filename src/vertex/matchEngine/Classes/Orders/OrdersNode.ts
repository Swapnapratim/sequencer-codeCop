import Order from "../Order/Order";

export class OrdersNode {
  data: Order;
  next: OrdersNode | null;

  constructor(data: Order) {
    this.data = data;
    this.next = null;
  }
}
