import { ethers } from "hardhat";

export const getSpotProductId = (healthGroup: number) => {
  return healthGroup * 2 + 1;
};

export const getPerpProductId = (healthGroup: number) => {
  return healthGroup * 2 + 2;
};

export const getSubAccountName = (address: string) => {
  return ethers.utils.hexZeroPad(address.slice(0, 12), 12);
};

export const getWithdrawalDigest = ({
  sender,
  productId,
  amount,
  nonce,
}: any) => {
  const WITHDRAW_COLLATERAL_SIGNATURE =
    "WithdrawCollateral(bytes32 sender,uint32 productId,uint128 amount,uint64 nonce)";
  return ethers.utils.solidityKeccak256(
    ["bytes32"],
    [
      ethers.utils.solidityKeccak256(
        ["bytes32", "bytes32", "uint32", "uint128", "uint64"],
        [
          ethers.utils.keccak256(
            ethers.utils.toUtf8Bytes(WITHDRAW_COLLATERAL_SIGNATURE)
          ),
          sender,
          productId,
          amount,
          nonce,
        ]
      ),
    ]
  );
};

export const getSubAccount = (address: string, subAccountName: string) => {
  return address.slice(0, 42) + subAccountName.slice(2, subAccountName.length);
};