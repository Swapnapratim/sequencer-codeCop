import { newProductOpts, newTradeOpts, TransactionType } from "../types";
import MatchEngine from "./matchEngine/Classes/MatchEngine/MatchEngine";
import Sequencer from "./Sequencer";

export default class Vertex {
  matchEngine: MatchEngine;
  sequencer: Sequencer;
  constructor() {
    this.matchEngine = new MatchEngine({ defaultlpSlippage: 0.005 });
    this.sequencer = new Sequencer(""); // TODO : replace with privatekey
  }

  // need to use forr sending tx
  depositCollateral(
    subaccountName: string,
    productId: string,
    amount: number
  ) {}

  depositCollateralWithReferral(
    subaccountName: string,
    productId: string,
    amount: number,
    referralCode: string
  ) {}

  // api equivalent
  // expect the signature and nonce from ui
  Withdrawal(
    sender: string,
    productId: string,
    amount: number,
    nonce: any,
    signature: any
  ) {
    this.sequencer.addTransaction([
      TransactionType.WithdrawCollateral,
      sender,
      productId,
      amount,
      nonce,
      signature,
    ]);
  }

  MintLp() {}

  BurnLp() {}

  async ExecuteTrade(newTradeOpts: newTradeOpts) {
    let allMatches = await this.matchEngine.processTrade(newTradeOpts);
   
    allMatches = this.sequencer.addTransactions(allMatches);
    
    return allMatches;
  }

  QueryProduct(productId: string) {
    return this.matchEngine.getBook(productId);
  }

  NewMatchEngineProduct(newProductOpts: newProductOpts) {
    this.matchEngine.newProduct(newProductOpts);
  }

  updatePrice(productId: number, priceX18: number) {
    this.sequencer.addTransaction([
      TransactionType.UpdatePrice,
      productId,
      priceX18,
    ]);
  }
}
