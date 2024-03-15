import { ethers } from "hardhat";
import { OrderOpts } from "../../../../types/index";

export interface MutateOrderOpts {
  priceX18: number | null;
  amount: number | null;
  expiration: string | null;
}

export default class Order {
  sender: string;
  priceX18: number | null | undefined;
  amount: number;
  expiration: string;
  nonce: any;
  filled: number;
  price: number | null | undefined;
  signature : any

  constructor(orderOpts: OrderOpts) {
    this.price = orderOpts.price
      ? this.parseOrderrBookPrice(orderOpts.price!)
      : orderOpts.price;
    this.sender = orderOpts.sender;
    this.priceX18 = orderOpts.price
      ? this.parseOrderrBookPrice(orderOpts.price!) *
        Number(ethers.utils.parseUnits("1", "ether"))
      : orderOpts.price;
    this.amount = Number(
      ethers.utils.parseUnits(orderOpts.amount.toString(), "ether")
    );
    this.expiration = orderOpts.expiration;
    this.nonce = orderOpts.nonce;
    this.filled = orderOpts.filled || 0;
    this.signature = orderOpts.signature
  }

  mutateOrder(mutateOrderOpts: MutateOrderOpts) {
    if (mutateOrderOpts.amount) {
      this.updateOrderAmount(mutateOrderOpts.amount);
    } else if (mutateOrderOpts.expiration) {
      this.updateOrderExpiration(mutateOrderOpts.expiration);
    }
  }

  updateOrderAmount(amount: number) {
    if (this.amount < 0 && amount < 0) {
      this.amount = amount;
    } else if (this.amount > 0 && amount > 0) {
      this.amount = amount;
    } else {
      return;
    }
  }

  updateOrderExpiration(expiration: string) {
    this.expiration = expiration;
  }

  fillOrder(amount: number) {
    this.filled += amount;
    return this.filled;
  }

  parseOrderrBookPrice(price: number) {
    if (Math.floor(price).toString().length < 4) {
      return Number(price.toPrecision(5));
    } else {
      return Number(price.toPrecision(Math.floor(price).toString().length + 2));
    }
  }
}
