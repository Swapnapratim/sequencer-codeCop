import Orders from "../Orders/Orders";
export default class OrderTreeNode {
  data: Orders | null;
  left: OrderTreeNode | null;
  right: OrderTreeNode | null;

  constructor(data: Orders) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
