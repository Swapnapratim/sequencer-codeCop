import { ethers } from "hardhat";
import { nodesUrl } from "../../constants";

export const craeteContract = (abi: any, addrress: string) => {
  const provider = new ethers.providers.WebSocketProvider(nodesUrl.mainNet);
  const contractInterface = new ethers.utils.Interface(abi);
  const contract = new ethers.Contract(addrress, abi, provider);
  return {
    provider,
    contractInterface,
    contract,
  };
};

export const craeteContractWithSigner = (
  abi: any,
  addrress: string,
  privateKey: string
) => {
  const provider = new ethers.providers.WebSocketProvider(nodesUrl.mainNet);
  const contractInterface = new ethers.utils.Interface(abi);
  let signer = new ethers.Wallet(privateKey, provider);
  const contract = new ethers.Contract(addrress, abi, signer);
  return {
    provider,
    contractInterface,
    contract,
  };
};
