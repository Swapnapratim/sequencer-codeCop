[Notes]
- healthGroup [uint32] - (productId + 1) / 2 can predetermin a prroductId
- maxHealthGroup [uint32] : last healthGroup
- book [orderbook_contract_address] - an address for an offchain order book contract
- sizeIncrement [int128] : ?
- priceIncrementX18 [int128] : ?
- minSize [int128] : ?
- lpSpreadX18 [int128] : ?
- Config [config] : ?
- riskStore [RiskStore] : ?
- subaccount [address] : ?
- insurance [int128] : ?
- slowModeTimeout [uint64] : ?
- Times [{perpTime,spotTime}] : ????
- subaccountName [bytes12] : used to generate a subaccount
- txType : 
- DumpFees : ?
- closing trades : the spot do not need to settle trades as they are settled immediatly, settlepnl for only perp.
- base/quote : `the base aseets of this protocol all have ddifferent prroductId, but all trade against a single quote produuct with id of 0.`

Contract Flow for better understanding and deploment
[ ] Endpoint contract
- Deploymnmet dependency : params [_sanctions,_sequencer,_clearinghouse,slowModeTimeout,_time,_prices]
- function depositCollateral : params [subaccountName,productId,amount]
- function submitTransaction only sequencer : params [[]transactions]
- function processTransaction : params [[txType]]

[ ] ClearinghouseLiq contract

[ ] FeeCalculator contract

[x] Clearinghouse contract
- Deploymnmet dependency : endpointPoint contract address, quoteToken adress, feeCalcalculator address,
- function addEngine : params [engine_address,type(spot/perp)]
- function registerProductForId : params [book,riskStore,healthGroup] -> productId -> function addProduct
- function depositCollateral only endpoint contract
- function depositInsurance only enpoint contract, only owner address
- function withdrawCollateral only enpoint contract
- function mintLp only enpoint contract
- function claimSequencerFees only enpoint contract

[ ] SpotEngine contract
- function addProduct : params [healthGroup,book,sizeIncrement,priceIncrementX18,minSize,lpSpreadX18,config,riskStore]
- function applyDeltas only book contracts : params [[]deltas]

[ ] PerpEngine contract

[ ] Offchainbook contract



Deployment and testing thoughts for further debugging
- pick a quoteToken adress, for 
- deploy feeCalcalculator address
- ClearingHouse contract is core but the deploment dependency contracts might need to be deployed first that does not require the collateral adddress in them.
- next add new engines spot or perp, to do this this contracts needs to be deployed first use the addEngine function.
- deploy endpointPoint contract.
- for user to start trading add a some product to either engine, grab the productId [test for underflow here]. through the engines with addProduct. add to perp andd spot engines.
- provide liquidity to the products with [mintLp] OPTIONAL
- [multple users] - first actions has to be DepositCollateral, depositCollateral on the endpoint contract and create [subaccounts].
- [multple users] - withdraw this collateral
- [multple users] - redeposit collateral
- make spot tardes using the matching engine, sequencer and settle onchain also
- [multple users] - withdraw this collateral
- [multple users] - redeposit collateral


Deployment flow
- create a erc20 usdt mock token contract.
- deploy and store address for erc20 usdt mock token. (initialize)
- deploy and store address for feeCalcalculator contract.(no initialize yet)
- deploy and store address for ClearingHouse contract. (no initialize yet)
- deploy and store address for ClearingHouseLiq contract. (no initialize yet)
- deploy and store address for Spot engine contract. (no initialize yet)
- deploy and store address for endpointPoint contract. (no initialize yet)


Development
[ ] ClaimSequencerFees 
    - Internal service for claiming sequncer fee 
    - send at regular interval to the sequencer to send with other transactions
    - blockchain function - processTransaction/endpoint contract
    - params : {
        txType : ClaimSequencerFees,
        ClaimSequencerFees : ""
    }

[ ] Deposit 
    - Api service for adding tokens to the smart 
    - class to handle deposit same as withdrwals [Accountsclass]
    - blockchain function - depositCollateral/endpoint contract
    - params : {
        subaccount,
        productId,
        amount
    }

[ ] Withdrawal
    - Api service for adding tokens to the smart 
    - class to handle withdrwals same as deposit [Accountsclass]
    - blockchain function - processTransaction/endpoint contract
    - params : {
         txType : WithdrawCollateral,
         tx : {
            sender,
            productId,
            amount,
            nonce
         }
     }

[ ] ISequencer interface
    - Solidity smart contract interface
    - functions : {
        `submitTransactions` : submit batch transactions to endpoint contract 
        `submitTransactionsChecked` : validate that onchain state matches offchain sequencer state with transaction processed
    }

[ ] Sequencer contract
    - Soloidty smart contract is ISequencer
    - Isequencer implementation code


[ ] MintLp
    - Api service for minting tokens in the liquidity pool
    - Service to handle minting tokens in a products liquidity pool
    - params : {
        txType : MintLp,
            sender,
            productId,
            amountBase,
            quoteAmountLow,
            quoteAmountHigh,
            nonce
    }


[ ] BurnLp
    - Api service for burning tokens in the liquidity pool
    - Service to handle burning tokens in a products liquidity pool
    - params : {
        txType : MintLp,
            sender,
            productId,
            amount,
            nonce
    }

[ ] LinkedSigner

[ ] ExecuteTrade
    - Api service to process the trades comming into the protocol 
    - Service to handle trades added to the matching engine then the sequencer
    - params : ProductId, Order

[ ] QueryTrades
    - Api service to get the trades sitting in the orderbook of the matching engine 
    - Service to get the trades sitting in the orderbook of the matching engine 
    - params : ProductId

