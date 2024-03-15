import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre, { ethers } from "hardhat";
import { EngineType, OrderType, TransactionType } from "../src/types";
import { TestConstants } from "../constants";
import {
  getSpotProductId,
  getSubAccount,
  getSubAccountName,
  getWithdrawalDigest,
} from "../helper";
import { initial } from "lodash";
import Vertex from "../src/vertex/Vertex";

describe("Vertex", function () {
  async function deploy() {
    const [
      owner,
      traderOne,
      traderTwo,
      traderThree,
      traderFour,
      traderFive,
      traderSix,
      traderSeven,
      traderEight,
      traderNine,
      traderTen,
    ] = await ethers.getSigners();

    const QouteToken = await ethers.getContractFactory("UsdtMock");
    const qouteToken = await QouteToken.deploy();
    await qouteToken.deployed();

    const BaseToken = await ethers.getContractFactory("UsdtMock");
    const baseToken = await BaseToken.deploy();
    await baseToken.deployed();

    const FeeCalculator = await ethers.getContractFactory("FeeCalculator");
    const feeCalculator = await FeeCalculator.deploy();
    await feeCalculator.deployed();

    const Clearinghouse = await ethers.getContractFactory("Clearinghouse");
    const clearinghouse = await Clearinghouse.deploy();
    await clearinghouse.deployed();

    const ClearinghouseLiq = await ethers.getContractFactory(
      "ClearinghouseLiq"
    );
    const clearinghouseLiq = await ClearinghouseLiq.deploy();
    await clearinghouseLiq.deployed();

    const SanctionedList = await ethers.getContractFactory("SanctionedList");
    const sanctionedList = await SanctionedList.deploy();
    await sanctionedList.deployed();

    const Endpoint = await ethers.getContractFactory("Endpoint");
    const endpoint = await Endpoint.deploy();
    await endpoint.deployed();

    const SpotEngine = await ethers.getContractFactory("SpotEngine");
    const spotEngine = await SpotEngine.deploy();
    await spotEngine.deployed();

    const PerpEngine = await ethers.getContractFactory("PerpEngine");
    const perpEngine = await PerpEngine.deploy();
    await perpEngine.deployed();

    const Sequencer = await ethers.getContractFactory("Sequencer");
    const sequencer = await Sequencer.deploy();
    await sequencer.deployed();

    const SpotBookProductZero = await ethers.getContractFactory("OffchainBook");
    const spotBookProductZero = await SpotBookProductZero.deploy();
    await spotBookProductZero.deployed();
    // await spotBookProductZero.initialize(
    //   clearinghouse.address,
    //   spotEngine.address,
    //   endpoint.address,
    //   owner.address,
    //   feeCalculator.address,
    //   getSpotProductId(TestConstants.healthGroupZero),
    //   TestConstants.spotBookProductZeroSizeIncrement, // might need to look further for performance
    //   TestConstants.spotBookProductZeroPriceIncrementX18, // might need to look further for PERP
    //   TestConstants.spotBookProductZeroMinSize,
    //   TestConstants.spotBookProductZeroLpSpreadX18
    // );

    await feeCalculator.initialize();

    await clearinghouse.initialize(
      endpoint.address,
      qouteToken.address,
      feeCalculator.address,
      clearinghouseLiq.address
    );

    await sequencer.initialize(endpoint.address);

    await clearinghouse.addEngine(spotEngine.address, EngineType.SPOT);
    await clearinghouse.addEngine(perpEngine.address, EngineType.PERP);

    await endpoint.initialize(
      sanctionedList.address,
      sequencer.address,
      clearinghouse.address,
      0, // needs adjustment
      0, // needs adjustment
      [] // priceSpot , pricePerp leave empty service in squencer for this
    );

    await spotEngine.addProduct(
      TestConstants.healthGroupZero,
      spotBookProductZero.address,
      TestConstants.spotBookProductZeroSizeIncrement,
      TestConstants.spotBookProductZeroPriceIncrementX18,
      TestConstants.spotBookProductZeroMinSize,
      TestConstants.spotBookProductZeroLpSpreadX18, // might need to look further for performance
      {
        token: baseToken.address,
        interestInflectionUtilX18: ethers.utils.parseUnits("1", "ether"),
        interestFloorX18: ethers.utils.parseUnits("1", "ether"),
        interestSmallCapX18: ethers.utils.parseUnits("1", "ether"),
        interestLargeCapX18: ethers.utils.parseUnits("1", "ether"),
      }, // senstive should be reviewed by finance expert deals with platform intrest
      {
        longWeightInitial: 1e9,
        shortWeightInitial: 1e9,
        longWeightMaintenance: 1e9,
        shortWeightMaintenance: 1e9,
        largePositionPenalty: 0,
      } // senstive should be reviewed by finance expert deals with platform intrest
    );

    await baseToken.increaseAllowance(
      endpoint.address,
      ethers.utils.parseUnits("40", "ether")
    );

    const tradingApp = new Vertex();

    return {
      owner,
      qouteToken,
      baseToken,
      feeCalculator,
      clearinghouse,
      clearinghouseLiq,
      sanctionedList,
      spotBookProductZero,
      endpoint,
      spotEngine,
      perpEngine,
      sequencer,
      tradingApp,
      traderOne,
      traderTwo,
      traderThree,
      traderFour,
      traderFive,
      traderSix,
      traderSeven,
      traderEight,
      traderNine,
      traderTen,
    };
  }

  describe("Protocol", function () {
    it("Spot trading", async function () {
      const {
        owner,
        baseToken,
        qouteToken,
        endpoint,
        sequencer,
        spotEngine,
        clearinghouse,
        tradingApp,
        traderOne,
        traderTwo,
        traderThree,
        traderFour,
        traderFive,
        traderSix,
        traderSeven,
        traderEight,
        traderNine,
        traderTen,
      } = await loadFixture(deploy);
      try {
        // UPDATE PRICE
        let nSubmissions = await endpoint.nSubmissions();
        let nonce = await endpoint.getNonce(owner.address);
        const updatePriceData = ethers.utils.defaultAbiCoder.encode(
          [
            {
              type: "tuple",
              name: "UpdatePrice",
              components: [
                {
                  name: "productId",
                  type: "uint32",
                },
                {
                  name: "priceX18",
                  type: "int128",
                },
              ],
            } as any,
          ],
          [{ productId: 1, priceX18: ethers.utils.parseUnits("3", "ether") }]
        );

        let tx = ethers.utils.concat([
          ethers.utils.arrayify(TransactionType.UpdatePrice),
          updatePriceData,
        ]);

        await sequencer.submitTransactions(nSubmissions, [tx]);

        let tempProductX18 = await endpoint.getPriceX18(1);

        expect(ethers.utils.parseUnits("3", "ether")).to.equal(tempProductX18);

        // TRANSFERS
        await baseToken.transfer(
          traderOne.address,
          ethers.utils.parseUnits("100000", "ether")
        );
        await qouteToken.transfer(
          traderOne.address,
          ethers.utils.parseUnits("100000", "ether")
        );

        await baseToken.transfer(
          traderTwo.address,
          ethers.utils.parseUnits("100000", "ether")
        );
        await qouteToken.transfer(
          traderTwo.address,
          ethers.utils.parseUnits("100000", "ether")
        );

        await baseToken.transfer(
          traderThree.address,
          ethers.utils.parseUnits("100000", "ether")
        );
        await qouteToken.transfer(
          traderThree.address,
          ethers.utils.parseUnits("100000", "ether")
        );

        await baseToken.transfer(
          traderFour.address,
          ethers.utils.parseUnits("100000", "ether")
        );
        await qouteToken.transfer(
          traderFour.address,
          ethers.utils.parseUnits("100000", "ether")
        );

        await baseToken.transfer(
          traderFive.address,
          ethers.utils.parseUnits("100000", "ether")
        );
        await qouteToken.transfer(
          traderFive.address,
          ethers.utils.parseUnits("100000", "ether")
        );

        await baseToken.transfer(
          traderSix.address,
          ethers.utils.parseUnits("100000", "ether")
        );
        await qouteToken.transfer(
          traderSix.address,
          ethers.utils.parseUnits("100000", "ether")
        );
        await baseToken.transfer(
          traderSeven.address,
          ethers.utils.parseUnits("100000", "ether")
        );
        await qouteToken.transfer(
          traderSeven.address,
          ethers.utils.parseUnits("100000", "ether")
        );

        await baseToken.transfer(
          traderEight.address,
          ethers.utils.parseUnits("100000", "ether")
        );
        await qouteToken.transfer(
          traderEight.address,
          ethers.utils.parseUnits("100000", "ether")
        );

        await baseToken.transfer(
          traderNine.address,
          ethers.utils.parseUnits("100000", "ether")
        );
        await qouteToken.transfer(
          traderNine.address,
          ethers.utils.parseUnits("100000", "ether")
        );

        await baseToken.transfer(
          traderTen.address,
          ethers.utils.parseUnits("100000", "ether")
        );
        await qouteToken.transfer(
          traderTen.address,
          ethers.utils.parseUnits("100000", "ether")
        );

        //DEPOSIT

        const subAccountName = getSubAccountName(owner.address);
        const subAccountNameOne = getSubAccountName(traderOne.address);
        const subAccountNameTwo = getSubAccountName(traderTwo.address);
        const subAccountNameThree = getSubAccountName(traderThree.address);
        const subAccountNameFour = getSubAccountName(traderFour.address);
        const subAccountNameFive = getSubAccountName(traderFive.address);
        const subAccountNameSix = getSubAccountName(traderSix.address);
        const subAccountNameSeven = getSubAccountName(traderSeven.address);
        const subAccountNameEight = getSubAccountName(traderEight.address);
        const subAccountNameNine = getSubAccountName(traderNine.address);
        const subAccountNameTen = getSubAccountName(traderTen.address);

        await baseToken.increaseAllowance(
          endpoint.address,
          ethers.utils.parseUnits("1000000000", "ether")
        );

        await endpoint.depositCollateral(
          subAccountName,
          1,
          ethers.utils.parseUnits("1000000000", "ether")
        );

        await qouteToken.increaseAllowance(
          endpoint.address,
          ethers.utils.parseUnits("4000000000", "ether")
        );

        await endpoint.depositCollateral(
          subAccountName,
          0,
          ethers.utils.parseUnits("4000000000", "ether")
        );

        let endpointBalance = await baseToken.balanceOf(endpoint.address);

        await endpoint.executeSlowModeTransactions(2);

        let clearinghouseBalance = await baseToken.balanceOf(
          clearinghouse.address
        );

        await baseToken
          .connect(traderOne)
          .increaseAllowance(
            endpoint.address,
            ethers.utils.parseUnits("99999", "ether")
          );

        await endpoint
          .connect(traderOne)
          .depositCollateral(
            subAccountNameOne,
            1,
            ethers.utils.parseUnits("99999", "ether")
          );

        await qouteToken
          .connect(traderOne)
          .increaseAllowance(
            endpoint.address,
            ethers.utils.parseUnits("99999", "ether")
          );

        await endpoint
          .connect(traderOne)
          .depositCollateral(
            subAccountNameOne,
            0,
            ethers.utils.parseUnits("99999", "ether")
          );

        await endpoint.executeSlowModeTransactions(2);

        await baseToken
          .connect(traderTwo)
          .increaseAllowance(
            endpoint.address,
            ethers.utils.parseUnits("99999", "ether")
          );

        await endpoint
          .connect(traderTwo)
          .depositCollateral(
            subAccountNameTwo,
            1,
            ethers.utils.parseUnits("99999", "ether")
          );

        await qouteToken
          .connect(traderTwo)
          .increaseAllowance(
            endpoint.address,
            ethers.utils.parseUnits("99999", "ether")
          );

        await endpoint
          .connect(traderTwo)
          .depositCollateral(
            subAccountNameTwo,
            0,
            ethers.utils.parseUnits("99999", "ether")
          );

        await endpoint.executeSlowModeTransactions(2);

        await baseToken
          .connect(traderThree)
          .increaseAllowance(
            endpoint.address,
            ethers.utils.parseUnits("99999", "ether")
          );

        await endpoint
          .connect(traderThree)
          .depositCollateral(
            subAccountNameThree,
            1,
            ethers.utils.parseUnits("99999", "ether")
          );

        await qouteToken
          .connect(traderThree)
          .increaseAllowance(
            endpoint.address,
            ethers.utils.parseUnits("99999", "ether")
          );

        await endpoint
          .connect(traderThree)
          .depositCollateral(
            subAccountNameThree,
            0,
            ethers.utils.parseUnits("99999", "ether")
          );

        await endpoint.executeSlowModeTransactions(2);

        await baseToken
          .connect(traderFour)
          .increaseAllowance(
            endpoint.address,
            ethers.utils.parseUnits("99999", "ether")
          );

        await endpoint
          .connect(traderFour)
          .depositCollateral(
            subAccountNameFour,
            1,
            ethers.utils.parseUnits("99999", "ether")
          );

        await qouteToken
          .connect(traderFour)
          .increaseAllowance(
            endpoint.address,
            ethers.utils.parseUnits("99999", "ether")
          );

        await endpoint
          .connect(traderFour)
          .depositCollateral(
            subAccountNameFour,
            0,
            ethers.utils.parseUnits("99999", "ether")
          );

        await endpoint.executeSlowModeTransactions(2);

        await baseToken
          .connect(traderFive)
          .increaseAllowance(
            endpoint.address,
            ethers.utils.parseUnits("99999", "ether")
          );

        await endpoint
          .connect(traderFive)
          .depositCollateral(
            subAccountNameFive,
            1,
            ethers.utils.parseUnits("99999", "ether")
          );

        await qouteToken
          .connect(traderFive)
          .increaseAllowance(
            endpoint.address,
            ethers.utils.parseUnits("99999", "ether")
          );

        await endpoint
          .connect(traderFive)
          .depositCollateral(
            subAccountNameFive,
            0,
            ethers.utils.parseUnits("99999", "ether")
          );

        await endpoint.executeSlowModeTransactions(2);
        await baseToken
          .connect(traderSix)
          .increaseAllowance(
            endpoint.address,
            ethers.utils.parseUnits("99999", "ether")
          );

        await endpoint
          .connect(traderSix)
          .depositCollateral(
            subAccountNameSix,
            1,
            ethers.utils.parseUnits("99999", "ether")
          );

        await qouteToken
          .connect(traderSix)
          .increaseAllowance(
            endpoint.address,
            ethers.utils.parseUnits("99999", "ether")
          );

        await endpoint
          .connect(traderSix)
          .depositCollateral(
            subAccountNameSix,
            0,
            ethers.utils.parseUnits("99999", "ether")
          );

        await endpoint.executeSlowModeTransactions(2);

        await baseToken
          .connect(traderSeven)
          .increaseAllowance(
            endpoint.address,
            ethers.utils.parseUnits("99999", "ether")
          );

        await endpoint
          .connect(traderSeven)
          .depositCollateral(
            subAccountNameSeven,
            1,
            ethers.utils.parseUnits("99999", "ether")
          );

        await qouteToken
          .connect(traderSeven)
          .increaseAllowance(
            endpoint.address,
            ethers.utils.parseUnits("99999", "ether")
          );

        await endpoint
          .connect(traderSeven)
          .depositCollateral(
            subAccountNameSeven,
            0,
            ethers.utils.parseUnits("99999", "ether")
          );

        await endpoint.executeSlowModeTransactions(2);

        await baseToken
          .connect(traderEight)
          .increaseAllowance(
            endpoint.address,
            ethers.utils.parseUnits("99999", "ether")
          );

        await endpoint
          .connect(traderEight)
          .depositCollateral(
            subAccountNameSeven,
            1,
            ethers.utils.parseUnits("99999", "ether")
          );

        await qouteToken
          .connect(traderEight)
          .increaseAllowance(
            endpoint.address,
            ethers.utils.parseUnits("99999", "ether")
          );

        await endpoint
          .connect(traderEight)
          .depositCollateral(
            subAccountNameEight,
            0,
            ethers.utils.parseUnits("99999", "ether")
          );

        await endpoint.executeSlowModeTransactions(2);

        await baseToken
          .connect(traderNine)
          .increaseAllowance(
            endpoint.address,
            ethers.utils.parseUnits("99999", "ether")
          );

        await endpoint
          .connect(traderNine)
          .depositCollateral(
            subAccountNameSeven,
            1,
            ethers.utils.parseUnits("99999", "ether")
          );

        await qouteToken
          .connect(traderNine)
          .increaseAllowance(
            endpoint.address,
            ethers.utils.parseUnits("99999", "ether")
          );

        await endpoint
          .connect(traderNine)
          .depositCollateral(
            subAccountNameNine,
            0,
            ethers.utils.parseUnits("99999", "ether")
          );

        await endpoint.executeSlowModeTransactions(2);

        await baseToken
          .connect(traderTen)
          .increaseAllowance(
            endpoint.address,
            ethers.utils.parseUnits("99999", "ether")
          );

        await endpoint
          .connect(traderTen)
          .depositCollateral(
            subAccountNameTen,
            1,
            ethers.utils.parseUnits("99999", "ether")
          );

        await qouteToken
          .connect(traderTen)
          .increaseAllowance(
            endpoint.address,
            ethers.utils.parseUnits("99999", "ether")
          );

        await endpoint
          .connect(traderTen)
          .depositCollateral(
            subAccountNameTen,
            0,
            ethers.utils.parseUnits("99999", "ether")
          );

        await endpoint.executeSlowModeTransactions(2);

        clearinghouseBalance = await baseToken.balanceOf(clearinghouse.address);

        console.log(clearinghouseBalance, "clearinghouseBalance");

        //WITHDRAW
        let sender = getSubAccount(owner.address, subAccountName);
        let senderOne = getSubAccount(traderOne.address, subAccountNameOne);
        let senderTwo = getSubAccount(traderTwo.address, subAccountNameTwo);
        let senderThree = getSubAccount(
          traderThree.address,
          subAccountNameThree
        );
        let senderFour = getSubAccount(traderFour.address, subAccountNameFour);
        let senderFive = getSubAccount(traderFive.address, subAccountNameFive);
        let senderSix = getSubAccount(traderSix.address, subAccountNameSix);
        let senderSeven = getSubAccount(
          traderSeven.address,
          subAccountNameSeven
        );
        let senderEight = getSubAccount(
          traderEight.address,
          subAccountNameEight
        );
        let senderNine = getSubAccount(traderNine.address, subAccountNameNine);
        let senderTen = getSubAccount(traderTen.address, subAccountNameTen);

        nonce = await endpoint.getNonce(owner.address);
        let nonceOne = await endpoint.getNonce(traderOne.address);
        let nonceTwo = await endpoint.getNonce(traderTwo.address);
        let nonceThree = await endpoint.getNonce(traderThree.address);
        let nonceFour = await endpoint.getNonce(traderFour.address);
        let nonceFive = await endpoint.getNonce(traderFive.address);
        let nonceSix = await endpoint.getNonce(traderSix.address);
        let nonceSeven = await endpoint.getNonce(traderSeven.address);
        let nonceEight = await endpoint.getNonce(traderEight.address);
        let nonceNine = await endpoint.getNonce(traderNine.address);
        let nonceTen = await endpoint.getNonce(traderTen.address);

        nSubmissions = await endpoint.nSubmissions();

        let txn = {
          sender,
          productId: 1,
          amount: ethers.utils.parseUnits("1", "ether"),
          nonce,
        };

        let txnOne = {
          sender: senderOne,
          productId: 1,
          amount: ethers.utils.parseUnits("1", "ether"),
          nonce: nonceOne,
        };

        let txnTwo = {
          sender: senderTwo,
          productId: 1,
          amount: ethers.utils.parseUnits("1", "ether"),
          nonce: nonceTwo,
        };

        let txnThree = {
          sender: senderThree,
          productId: 1,
          amount: ethers.utils.parseUnits("1", "ether"),
          nonce: nonceThree,
        };

        let txnFour = {
          sender: senderFour,
          productId: 1,
          amount: ethers.utils.parseUnits("1", "ether"),
          nonce: nonceFour,
        };

        let txnFive = {
          sender: senderFive,
          productId: 1,
          amount: ethers.utils.parseUnits("1", "ether"),
          nonce: nonceFive,
        };

        let txnSix = {
          sender: senderSix,
          productId: 1,
          amount: ethers.utils.parseUnits("1", "ether"),
          nonce: nonceSix,
        };

        let txnSeven = {
          sender: senderSeven,
          productId: 1,
          amount: ethers.utils.parseUnits("1", "ether"),
          nonce: nonceSeven,
        };

        let txnEight = {
          sender: senderEight,
          productId: 1,
          amount: ethers.utils.parseUnits("1", "ether"),
          nonce: nonceEight,
        };

        let txnNine = {
          sender: senderNine,
          productId: 1,
          amount: ethers.utils.parseUnits("1", "ether"),
          nonce: nonceNine,
        };

        let txnTen = {
          sender: senderTen,
          productId: 1,
          amount: ethers.utils.parseUnits("1", "ether"),
          nonce: nonceTen,
        };

        let signature = await owner.signMessage(owner.address);

        tx = ethers.utils.concat([
          ethers.utils.arrayify(TransactionType.WithdrawCollateral),
          ethers.utils.defaultAbiCoder.encode(
            [
              {
                type: "tuple",
                name: "SignedWithdrawCollateral",
                components: [
                  {
                    type: "tuple",
                    name: "tx",
                    components: [
                      {
                        name: "sender",
                        type: "bytes32",
                      },
                      {
                        name: "productId",
                        type: "uint32",
                      },
                      { name: "amount", type: "uint128" },
                      { name: "nonce", type: "uint64" },
                    ],
                  },
                  {
                    name: "signature",
                    type: "bytes",
                  },
                ],
              } as any,
            ],
            [
              {
                signature,
                tx: txn,
              },
            ]
          ),
        ]);

        let txOne = ethers.utils.concat([
          ethers.utils.arrayify(TransactionType.WithdrawCollateral),
          ethers.utils.defaultAbiCoder.encode(
            [
              {
                type: "tuple",
                name: "SignedWithdrawCollateral",
                components: [
                  {
                    type: "tuple",
                    name: "tx",
                    components: [
                      {
                        name: "sender",
                        type: "bytes32",
                      },
                      {
                        name: "productId",
                        type: "uint32",
                      },
                      { name: "amount", type: "uint128" },
                      { name: "nonce", type: "uint64" },
                    ],
                  },
                  {
                    name: "signature",
                    type: "bytes",
                  },
                ],
              } as any,
            ],
            [
              {
                signature,
                tx: txnOne,
              },
            ]
          ),
        ]);

        let txTwo = ethers.utils.concat([
          ethers.utils.arrayify(TransactionType.WithdrawCollateral),
          ethers.utils.defaultAbiCoder.encode(
            [
              {
                type: "tuple",
                name: "SignedWithdrawCollateral",
                components: [
                  {
                    type: "tuple",
                    name: "tx",
                    components: [
                      {
                        name: "sender",
                        type: "bytes32",
                      },
                      {
                        name: "productId",
                        type: "uint32",
                      },
                      { name: "amount", type: "uint128" },
                      { name: "nonce", type: "uint64" },
                    ],
                  },
                  {
                    name: "signature",
                    type: "bytes",
                  },
                ],
              } as any,
            ],
            [
              {
                signature,
                tx: txnTwo,
              },
            ]
          ),
        ]);

        let txThree = ethers.utils.concat([
          ethers.utils.arrayify(TransactionType.WithdrawCollateral),
          ethers.utils.defaultAbiCoder.encode(
            [
              {
                type: "tuple",
                name: "SignedWithdrawCollateral",
                components: [
                  {
                    type: "tuple",
                    name: "tx",
                    components: [
                      {
                        name: "sender",
                        type: "bytes32",
                      },
                      {
                        name: "productId",
                        type: "uint32",
                      },
                      { name: "amount", type: "uint128" },
                      { name: "nonce", type: "uint64" },
                    ],
                  },
                  {
                    name: "signature",
                    type: "bytes",
                  },
                ],
              } as any,
            ],
            [
              {
                signature,
                tx: txnThree,
              },
            ]
          ),
        ]);

        let txFour = ethers.utils.concat([
          ethers.utils.arrayify(TransactionType.WithdrawCollateral),
          ethers.utils.defaultAbiCoder.encode(
            [
              {
                type: "tuple",
                name: "SignedWithdrawCollateral",
                components: [
                  {
                    type: "tuple",
                    name: "tx",
                    components: [
                      {
                        name: "sender",
                        type: "bytes32",
                      },
                      {
                        name: "productId",
                        type: "uint32",
                      },
                      { name: "amount", type: "uint128" },
                      { name: "nonce", type: "uint64" },
                    ],
                  },
                  {
                    name: "signature",
                    type: "bytes",
                  },
                ],
              } as any,
            ],
            [
              {
                signature,
                tx: txnFour,
              },
            ]
          ),
        ]);

        let txFive = ethers.utils.concat([
          ethers.utils.arrayify(TransactionType.WithdrawCollateral),
          ethers.utils.defaultAbiCoder.encode(
            [
              {
                type: "tuple",
                name: "SignedWithdrawCollateral",
                components: [
                  {
                    type: "tuple",
                    name: "tx",
                    components: [
                      {
                        name: "sender",
                        type: "bytes32",
                      },
                      {
                        name: "productId",
                        type: "uint32",
                      },
                      { name: "amount", type: "uint128" },
                      { name: "nonce", type: "uint64" },
                    ],
                  },
                  {
                    name: "signature",
                    type: "bytes",
                  },
                ],
              } as any,
            ],
            [
              {
                signature,
                tx: txnFive,
              },
            ]
          ),
        ]);

        let txSix = ethers.utils.concat([
          ethers.utils.arrayify(TransactionType.WithdrawCollateral),
          ethers.utils.defaultAbiCoder.encode(
            [
              {
                type: "tuple",
                name: "SignedWithdrawCollateral",
                components: [
                  {
                    type: "tuple",
                    name: "tx",
                    components: [
                      {
                        name: "sender",
                        type: "bytes32",
                      },
                      {
                        name: "productId",
                        type: "uint32",
                      },
                      { name: "amount", type: "uint128" },
                      { name: "nonce", type: "uint64" },
                    ],
                  },
                  {
                    name: "signature",
                    type: "bytes",
                  },
                ],
              } as any,
            ],
            [
              {
                signature,
                tx: txnSix,
              },
            ]
          ),
        ]);

        let txSeven = ethers.utils.concat([
          ethers.utils.arrayify(TransactionType.WithdrawCollateral),
          ethers.utils.defaultAbiCoder.encode(
            [
              {
                type: "tuple",
                name: "SignedWithdrawCollateral",
                components: [
                  {
                    type: "tuple",
                    name: "tx",
                    components: [
                      {
                        name: "sender",
                        type: "bytes32",
                      },
                      {
                        name: "productId",
                        type: "uint32",
                      },
                      { name: "amount", type: "uint128" },
                      { name: "nonce", type: "uint64" },
                    ],
                  },
                  {
                    name: "signature",
                    type: "bytes",
                  },
                ],
              } as any,
            ],
            [
              {
                signature,
                tx: txnSeven,
              },
            ]
          ),
        ]);

        let txEight = ethers.utils.concat([
          ethers.utils.arrayify(TransactionType.WithdrawCollateral),
          ethers.utils.defaultAbiCoder.encode(
            [
              {
                type: "tuple",
                name: "SignedWithdrawCollateral",
                components: [
                  {
                    type: "tuple",
                    name: "tx",
                    components: [
                      {
                        name: "sender",
                        type: "bytes32",
                      },
                      {
                        name: "productId",
                        type: "uint32",
                      },
                      { name: "amount", type: "uint128" },
                      { name: "nonce", type: "uint64" },
                    ],
                  },
                  {
                    name: "signature",
                    type: "bytes",
                  },
                ],
              } as any,
            ],
            [
              {
                signature,
                tx: txnEight,
              },
            ]
          ),
        ]);

        let txNine = ethers.utils.concat([
          ethers.utils.arrayify(TransactionType.WithdrawCollateral),
          ethers.utils.defaultAbiCoder.encode(
            [
              {
                type: "tuple",
                name: "SignedWithdrawCollateral",
                components: [
                  {
                    type: "tuple",
                    name: "tx",
                    components: [
                      {
                        name: "sender",
                        type: "bytes32",
                      },
                      {
                        name: "productId",
                        type: "uint32",
                      },
                      { name: "amount", type: "uint128" },
                      { name: "nonce", type: "uint64" },
                    ],
                  },
                  {
                    name: "signature",
                    type: "bytes",
                  },
                ],
              } as any,
            ],
            [
              {
                signature,
                tx: txnNine,
              },
            ]
          ),
        ]);

        let txTen = ethers.utils.concat([
          ethers.utils.arrayify(TransactionType.WithdrawCollateral),
          ethers.utils.defaultAbiCoder.encode(
            [
              {
                type: "tuple",
                name: "SignedWithdrawCollateral",
                components: [
                  {
                    type: "tuple",
                    name: "tx",
                    components: [
                      {
                        name: "sender",
                        type: "bytes32",
                      },
                      {
                        name: "productId",
                        type: "uint32",
                      },
                      { name: "amount", type: "uint128" },
                      { name: "nonce", type: "uint64" },
                    ],
                  },
                  {
                    name: "signature",
                    type: "bytes",
                  },
                ],
              } as any,
            ],
            [
              {
                signature,
                tx: txnTen,
              },
            ]
          ),
        ]);

        let senderBalanceP1 = await spotEngine.getBalance(1, sender);

        let senderBalanceQ = await spotEngine.getBalance(0, sender);

        let senderOneBalanceP1 = await spotEngine.getBalance(1, senderOne);

        let senderOneBalanceQ = await spotEngine.getBalance(0, senderOne);

        let senderThreeBalanceP1 = await spotEngine.getBalance(1, senderThree);

        let senderThreeBalanceQ = await spotEngine.getBalance(0, senderThree);

        let senderFiveBalanceP1 = await spotEngine.getBalance(1, senderFive);

        let senderFiveBalanceQ = await spotEngine.getBalance(0, senderFive);

        let senderSixBalanceP1 = await spotEngine.getBalance(1, senderSix);

        let senderSixBalanceQ = await spotEngine.getBalance(0, senderSix);

        let senderTenBalanceP1 = await spotEngine.getBalance(1, senderTen);

        let senderTenBalanceQ = await spotEngine.getBalance(0, senderTen);

        console.log("\n\n\n\nDepositing tokens to vertex\n\n\n\n");

        console.log(
          "Sender balance after deposit on quote token",
          Number(senderBalanceQ.amount) / 1e18
        );
        console.log(
          "Sender balance after deposit on base token\n",
          Number(senderBalanceP1.amount) / 1e18
        );

        console.log(
          "Sender One balance after deposit on quote token",
          Number(senderOneBalanceQ.amount) / 1e18
        );
        console.log(
          "Sender One balance after deposit on base token\n",
          Number(senderOneBalanceP1.amount) / 1e18
        );

        console.log(
          "Sender Three balance after deposit on quote token",
          Number(senderThreeBalanceQ.amount) / 1e18
        );
        console.log(
          "Sender Three balance after deposit on base token\n",
          Number(senderThreeBalanceP1.amount) / 1e18
        );

        console.log(
          "Sender Five balance after deposit on quote token",
          Number(senderFiveBalanceQ.amount) / 1e18
        );
        console.log(
          "Sender Five balance after deposit on base token\n",
          Number(senderFiveBalanceP1.amount) / 1e18
        );

        console.log(
          "Sender Six balance after deposit on quote token",
          Number(senderSixBalanceQ.amount) / 1e18
        );
        console.log(
          "Sender Five balance after deposit on base token\n",
          Number(senderSixBalanceP1.amount) / 1e18
        );

        console.log(
          "Sender Ten balance after deposit on quote token",
          Number(senderTenBalanceQ.amount) / 1e18
        );

        console.log(
          "Sender Ten balance after deposit on base token\n",
          Number(senderTenBalanceP1.amount) / 1e18
        );

        await sequencer.submitTransactions(nSubmissions, [
          tx,
          txTwo,
          txOne,
          txThree,
          txFour,
          txFive,
          txSix,
          txSeven,
          txEight,
          txNine,
          txTen,
        ]);

        senderBalanceP1 = await spotEngine.getBalance(1, sender);

        senderBalanceQ = await spotEngine.getBalance(0, sender);

        senderOneBalanceP1 = await spotEngine.getBalance(1, senderOne);

        senderOneBalanceQ = await spotEngine.getBalance(0, senderOne);

        senderThreeBalanceP1 = await spotEngine.getBalance(1, senderThree);

        senderThreeBalanceQ = await spotEngine.getBalance(0, senderThree);

        senderFiveBalanceP1 = await spotEngine.getBalance(1, senderFive);

        senderFiveBalanceQ = await spotEngine.getBalance(0, senderFive);

        senderSixBalanceP1 = await spotEngine.getBalance(1, senderSix);

        senderSixBalanceQ = await spotEngine.getBalance(0, senderSix);

        senderTenBalanceP1 = await spotEngine.getBalance(1, senderTen);

        senderTenBalanceQ = await spotEngine.getBalance(0, senderTen);

        console.log("\n\n\n\nWithdrawaing tokens to vertex\n\n\n\n");

        console.log(
          "Sender balance after withddral of 1 token\n",
          Number(senderBalanceP1.amount) / 1e18
        );

        console.log(
          "Sender One balance after withddral of 1 token\n",
          Number(senderOneBalanceP1.amount) / 1e18
        );

        console.log(
          "Sender Three balance after withddral of 1 token\n",
          Number(senderThreeBalanceP1.amount) / 1e18
        );

        console.log(
          "Sender Five balance after withddral of 1 token\n",
          Number(senderFiveBalanceP1.amount) / 1e18
        );

        console.log(
          "Sender Six balance after withddral of 1 token\n",
          Number(senderSixBalanceP1.amount) / 1e18
        );

        console.log(
          "Sender Ten balance after withddral of 1 token\n",
          Number(senderTenBalanceP1.amount) / 1e18
        );

        // REDEPOSIT

        await baseToken.increaseAllowance(
          endpoint.address,
          ethers.utils.parseUnits("5000", "ether")
        );

        await endpoint.depositCollateral(
          subAccountName,
          1,
          ethers.utils.parseUnits("5000", "ether")
        );

        await endpoint.executeSlowModeTransactions(1);

        clearinghouseBalance = await baseToken.balanceOf(clearinghouse.address);

        // MINTING LP FLOW

        nonce = await endpoint.getNonce(owner.address);

        let minTtxn = {
          sender,
          productId: 1,
          nonce,
          amountBase: ethers.utils.parseUnits("100000", "ether"),
          quoteAmountLow: ethers.utils.parseUnits("270000", "ether"),
          quoteAmountHigh: ethers.utils.parseUnits("310000", "ether"),
        };

        nSubmissions = await endpoint.nSubmissions();

        let mintLpData = ethers.utils.defaultAbiCoder.encode(
          [
            {
              type: "tuple",
              name: "SignedMintLp",
              components: [
                {
                  type: "tuple",
                  name: "tx",
                  components: [
                    {
                      name: "sender",
                      type: "bytes32",
                    },
                    {
                      name: "productId",
                      type: "uint32",
                    },
                    {
                      name: "amountBase",
                      type: "uint128",
                    },
                    {
                      name: "quoteAmountLow",
                      type: "uint128",
                    },
                    {
                      name: "quoteAmountHigh",
                      type: "uint128",
                    },
                    {
                      name: "nonce",
                      type: "uint64",
                    },
                  ],
                },
                {
                  name: "signature",
                  type: "bytes",
                },
              ],
            } as any,
          ],
          [
            {
              signature,
              tx: minTtxn,
            },
          ]
        );

        tx = ethers.utils.concat([
          ethers.utils.arrayify(TransactionType.MintLp),
          mintLpData,
        ]);

        console.log(
          "\n\n\n\nminting LP tokens to provide liquidity to pool\n\n\n\n"
        );

        let senderLpBalanceP1 = await spotEngine.getBalances(1, sender);

        console.log(
          "Balance of lp tokens before minting LP tokens",
          Number(senderLpBalanceP1[0][0]) / 1e18
        );

        // console.log(
        //   "Sender balance after deposit on quote token",
        //   Number(senderBalanceQ.amount) / 1e18
        // );
        // console.log(
        //   "Sender balance after deposit on base token\n",
        //   Number(senderBalanceP1.amount) / 1e18
        // );

        await sequencer.submitTransactions(nSubmissions, [tx]);

        // expect(200).to.equal(userLpBalanceBase[0][0]);

        nonce = await endpoint.getNonce(owner.address);

        minTtxn = {
          sender,
          productId: 1,
          nonce,
          amountBase: ethers.utils.parseUnits("100000", "ether"),
          quoteAmountLow: ethers.utils.parseUnits("270000", "ether"),
          quoteAmountHigh: ethers.utils.parseUnits("310000", "ether"),
        };

        nSubmissions = await endpoint.nSubmissions();

        mintLpData = ethers.utils.defaultAbiCoder.encode(
          [
            {
              type: "tuple",
              name: "SignedMintLp",
              components: [
                {
                  type: "tuple",
                  name: "tx",
                  components: [
                    {
                      name: "sender",
                      type: "bytes32",
                    },
                    {
                      name: "productId",
                      type: "uint32",
                    },
                    {
                      name: "amountBase",
                      type: "uint128",
                    },
                    {
                      name: "quoteAmountLow",
                      type: "uint128",
                    },
                    {
                      name: "quoteAmountHigh",
                      type: "uint128",
                    },
                    {
                      name: "nonce",
                      type: "uint64",
                    },
                  ],
                },
                {
                  name: "signature",
                  type: "bytes",
                },
              ],
            } as any,
          ],
          [
            {
              signature,
              tx: minTtxn,
            },
          ]
        );

        tx = ethers.utils.concat([
          ethers.utils.arrayify(TransactionType.MintLp),
          mintLpData,
        ]);

        await sequencer.submitTransactions(nSubmissions, [tx]);

        senderLpBalanceP1 = await spotEngine.getBalances(1, sender);

        console.log(
          "Balance of lp tokens after  minting Lp tokens",
          Number(senderLpBalanceP1[0][0]) / 1e18
        );

        // // expect(500).to.equal(userLpBalanceBase[0][0]);

        // // BURNING LP FLOW
        nonce = await endpoint.getNonce(owner.address);

        let burnLptxn = {
          sender,
          productId: 1,
          nonce,
          amount: ethers.utils.parseUnits("100", "ether"), // quote token
        };

        nSubmissions = await endpoint.nSubmissions();

        const burnLpData = ethers.utils.defaultAbiCoder.encode(
          [
            {
              type: "tuple",
              name: "SignedBurnLp",
              components: [
                {
                  type: "tuple",
                  name: "tx",
                  components: [
                    {
                      name: "sender",
                      type: "bytes32",
                    },
                    {
                      name: "productId",
                      type: "uint32",
                    },
                    {
                      name: "amount",
                      type: "uint128",
                    },
                    {
                      name: "nonce",
                      type: "uint64",
                    },
                  ],
                },
                {
                  name: "signature",
                  type: "bytes",
                },
              ],
            } as any,
          ],
          [
            {
              signature,
              tx: burnLptxn,
            },
          ]
        );

        tx = ethers.utils.concat([
          ethers.utils.arrayify(TransactionType.BurnLp),
          burnLpData,
        ]);

        console.log(
          "\n\n\n\nBurning LP tokens to remove liquidity from pool\n\n\n\n"
        );

        senderLpBalanceP1 = await spotEngine.getBalances(1, sender);

        console.log(
          "Balance of lp tokens before burning LP tokens",
          Number(senderLpBalanceP1[0][0]) / 1e18
        );

        await sequencer.submitTransactions(nSubmissions, [tx]);

        senderLpBalanceP1 = await spotEngine.getBalances(1, sender);

        console.log(
          "Balance of lp tokens afetr burning LP tokens",
          Number(senderLpBalanceP1[0][0]) / 1e18
        );

        // TRADES WITH MATCH ENGINE

        console.log(
          "\n\n\n\nMatching orders offchain with orderbook and lp\n\n\n\n"
        );
        nonce = await endpoint.getNonce(owner.address);

        tradingApp.NewMatchEngineProduct({
          productId: "1",
          lpContract: spotEngine,
        });

        // LIMITS
        let allTradesTx: any[] = [];

        let allMtaches: any[] = await tradingApp.ExecuteTrade({
          productId: "1",
          rawOrder: {
            price: 3.001,
            sender: senderOne,
            amount: -50,
            expiration: "100000000000",
            nonce: nonce,
            filled: 0,
            signature,
            type: OrderType.LIMIT,
          },
        });
        allTradesTx = [...allTradesTx, ...allMtaches];

        allMtaches = await tradingApp.ExecuteTrade({
          productId: "1",
          rawOrder: {
            price: 3.001,
            sender: senderFive,
            amount: -50,
            expiration: "100000000000",
            nonce: nonce,
            filled: 0,
            signature,
            type: OrderType.LIMIT,
          },
        });
        allTradesTx = [...allTradesTx, ...allMtaches];

        allMtaches = await tradingApp.ExecuteTrade({
          productId: "1",
          rawOrder: {
            price: 3.001,
            sender: senderSix,
            amount: -50,
            expiration: "100000000000",
            nonce: nonce,
            filled: 0,
            signature,
            type: OrderType.LIMIT,
          },
        });
        allTradesTx = [...allTradesTx, ...allMtaches];

        allMtaches = await tradingApp.ExecuteTrade({
          productId: "1",
          rawOrder: {
            price: 3.0015,
            sender: senderTwo,
            amount: -105,
            expiration: "100000000000",
            nonce: nonce,
            filled: 0,
            signature,
            type: OrderType.LIMIT,
          },
        });
        allTradesTx = [...allTradesTx, ...allMtaches];

        // allMtaches = await tradingApp.ExecuteTrade({
        //   productId: "1",
        //   rawOrder: {
        //     price: 3.002,
        //     sender: senderThree,
        //     amount: -66,
        //     expiration: "100000000000",
        //     nonce: nonce,
        //     filled: 0,
        //     signature,
        //     type: OrderType.LIMIT,
        //   },
        // });
        // allTradesTx = [...allTradesTx, ...allMtaches];

        allMtaches = await tradingApp.ExecuteTrade({
          productId: "1",
          rawOrder: {
            price: 3.0025,
            sender: senderFour,
            amount: -97,
            expiration: "100000000000",
            nonce: nonce,
            filled: 0,
            signature,
            type: OrderType.LIMIT,
          },
        });
        allTradesTx = [...allTradesTx, ...allMtaches];

        allMtaches = await tradingApp.ExecuteTrade({
          productId: "1",
          rawOrder: {
            price: 3.0033,
            sender: senderFive,
            amount: -55,
            expiration: "100000000000",
            nonce: nonce,
            filled: 0,
            signature,
            type: OrderType.LIMIT,
          },
        });
        allTradesTx = [...allTradesTx, ...allMtaches];

        allMtaches = await tradingApp.ExecuteTrade({
          productId: "1",
          rawOrder: {
            price: 2.999,
            sender: senderNine,
            amount: 70,
            expiration: "100000000000",
            nonce: nonce,
            filled: 0,
            signature,
            type: OrderType.LIMIT,
          },
        });
        allTradesTx = [...allTradesTx, ...allMtaches];

        allMtaches = await tradingApp.ExecuteTrade({
          productId: "1",
          rawOrder: {
            price: 2.998,
            sender: senderSeven,
            amount: 45,
            expiration: "100000000000",
            nonce: nonce,
            filled: 0,
            signature,
            type: OrderType.LIMIT,
          },
        });
        allTradesTx = [...allTradesTx, ...allMtaches];

        allMtaches = await tradingApp.ExecuteTrade({
          productId: "1",
          rawOrder: {
            price: 2.997,
            sender: senderEight,
            amount: 50,
            expiration: "100000000000",
            nonce: nonce,
            filled: 0,
            signature,
            type: OrderType.LIMIT,
          },
        });
        allTradesTx = [...allTradesTx, ...allMtaches];

        allMtaches = await tradingApp.ExecuteTrade({
          productId: "1",
          rawOrder: {
            price: 2.996,
            sender: senderSix,
            amount: 50,
            expiration: "100000000000",
            nonce: nonce,
            filled: 0,
            signature,
            type: OrderType.LIMIT,
          },
        });
        allTradesTx = [...allTradesTx, ...allMtaches];

        let productBook = tradingApp.QueryProduct("1");

        allMtaches = await tradingApp.ExecuteTrade({
          productId: "1",
          rawOrder: {
            price: null,
            sender: senderThree,
            amount: 200,
            expiration: "100000000000",
            nonce: nonce,
            filled: 0,
            signature,
            type: OrderType.MARKET,
          },
        });
        senderBalanceP1 = await spotEngine.getBalance(1, sender);

        senderBalanceQ = await spotEngine.getBalance(0, sender);

        senderOneBalanceP1 = await spotEngine.getBalance(1, senderOne);

        senderOneBalanceQ = await spotEngine.getBalance(0, senderOne);

        senderThreeBalanceP1 = await spotEngine.getBalance(1, senderThree);

        senderThreeBalanceQ = await spotEngine.getBalance(0, senderThree);

        senderFiveBalanceP1 = await spotEngine.getBalance(1, senderFive);

        senderFiveBalanceQ = await spotEngine.getBalance(0, senderFive);

        senderSixBalanceP1 = await spotEngine.getBalance(1, senderSix);

        senderSixBalanceQ = await spotEngine.getBalance(0, senderSix);

        senderTenBalanceP1 = await spotEngine.getBalance(1, senderTen);

        senderTenBalanceQ = await spotEngine.getBalance(0, senderTen);

        console.log(
          "\n\n\n\nBalances before first market order using orderbook and lp\n\n\n\n"
        );

        console.log("\n\n MAKERS \n\n");

        console.log(
          "Sender One quote token after first market order",
          Number(senderOneBalanceQ.amount) / 1e18
        );
        console.log(
          "Sender One base token after first market order\n",
          Number(senderOneBalanceP1.amount) / 1e18
        );

        console.log(
          "Sender One quote token after first market order",
          Number(senderFiveBalanceQ.amount) / 1e18
        );
        console.log(
          "Sender One base token after first market order\n",
          Number(senderFiveBalanceP1.amount) / 1e18
        );

        console.log(
          "Sender One quote token after first market order",
          Number(senderSixBalanceQ.amount) / 1e18
        );
        console.log(
          "Sender One base token after first market order\n",
          Number(senderSixBalanceP1.amount) / 1e18
        );



        console.log("\n\n TAKER \n\n");

        console.log(
          "Sender Three quote token after first market order",
          Number(senderThreeBalanceQ.amount) / 1e18
        );
        console.log(
          "Sender Three base token after first market order\n",
          Number(senderThreeBalanceP1.amount) / 1e18
        );

        allTradesTx = [...allTradesTx, ...allMtaches];
        nSubmissions = await endpoint.nSubmissions();
        await sequencer.submitTransactions(nSubmissions, [...allTradesTx]);
        senderBalanceP1 = await spotEngine.getBalance(1, sender);

        senderBalanceQ = await spotEngine.getBalance(0, sender);

        senderOneBalanceP1 = await spotEngine.getBalance(1, senderOne);

        senderOneBalanceQ = await spotEngine.getBalance(0, senderOne);

        senderThreeBalanceP1 = await spotEngine.getBalance(1, senderThree);

        senderThreeBalanceQ = await spotEngine.getBalance(0, senderThree);

        senderFiveBalanceP1 = await spotEngine.getBalance(1, senderFive);

        senderFiveBalanceQ = await spotEngine.getBalance(0, senderFive);

        senderSixBalanceP1 = await spotEngine.getBalance(1, senderSix);

        senderSixBalanceQ = await spotEngine.getBalance(0, senderSix);

        senderTenBalanceP1 = await spotEngine.getBalance(1, senderTen);

        senderTenBalanceQ = await spotEngine.getBalance(0, senderTen);

        console.log(
          "\n\n\n\nBalances after first market order using orderbook and lp\n\n\n\n"
        );

        console.log("\n\n MAKERS \n\n");

        console.log(
          "Sender One quote token after first market order",
          Number(senderOneBalanceQ.amount) / 1e18
        );
        console.log(
          "Sender One base token after first market order\n",
          Number(senderOneBalanceP1.amount) / 1e18
        );

        console.log(
          "Sender One quote token after first market order",
          Number(senderFiveBalanceQ.amount) / 1e18
        );
        console.log(
          "Sender One base token after first market order\n",
          Number(senderFiveBalanceP1.amount) / 1e18
        );

        console.log(
          "Sender One quote token after first market order",
          Number(senderSixBalanceQ.amount) / 1e18
        );
        console.log(
          "Sender One base token after first market order\n",
          Number(senderSixBalanceP1.amount) / 1e18
        );


        console.log("\n\n TAKER \n\n");

        console.log(
          "Sender Three quote token after first market order",
          Number(senderThreeBalanceQ.amount) / 1e18
        );
        console.log(
          "Sender Three base token after first market order\n",
          Number(senderThreeBalanceP1.amount) / 1e18
        );
        allTradesTx = [];
        // MARKET
        // allMtaches = await tradingApp.ExecuteTrade({
        //   productId: "1",
        //   rawOrder: {
        //     price: null,
        //     sender: senderTen,
        //     amount: -200,
        //     expiration: "100000000000",
        //     nonce: nonce,
        //     filled: 0,
        //     signature,
        //     type: OrderType.MARKET,
        //   },
        // });
      } catch (error) {
        console.log("err", error);
      }
    });
  });
});
