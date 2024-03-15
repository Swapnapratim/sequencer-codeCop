import Orders from "../Orders";
import OrderTreeNode from "./OrderTreeNode";

export default class BaseOrderTree {
  root: OrderTreeNode | null;
  productId: string;

  constructor(productId: string) {
    this.root = null;
    this.productId = productId;
  }

  insert(data: Orders): void {
    const newNode = new OrderTreeNode(data);
    if (!this.root) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node: OrderTreeNode, newNode: OrderTreeNode): void {
    if (Number(newNode.data?.price) < Number(node.data?.price)) {
      if (!node.left) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (!node.right) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  deleteRecursive(root: OrderTreeNode, price: number) {
    if (root == null) return root;
    if (price < root.data?.price!)
      root.left = this.deleteRecursive(root.left!, price);
    else if (price > root.data?.price!)
      root.right = this.deleteRecursive(root.right!, price);
    else {
      if (root.left == null) return root.right;
      else if (root.right == null) return root.left;

      root.data = this.minimumValue(root.right);
      root.right = this.deleteRecursive(root.right, root.data?.price!);
    }

    return root;
  }

  minimumValue(root: OrderTreeNode) {
    let minValue = root.data;
    while (root.left != null) {
      minValue = root.left.data;
      root = root.left;
    }
    return minValue;
  }
}
