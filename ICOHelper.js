import { ICO_ABI } from "../Config/ABI/ICO_ABI";
import { BUSDTokenABI } from "../Config/ABI/BUSDTokenABI";
import { BUSDToken } from "../Config/Contract/Contract";
import { store } from "../Redux/store";
import { web3_ } from "../Services";

export const ICOHelperContract = async (address) => {
  return new web3_.eth.Contract(ICO_ABI, address);
};
export const ICOHelperUpdateSocialMedia = async (address, Array) => {
  return new web3_.eth.Contract(ICO_ABI, address).methods
    .updateSocialMedia(Array[0], Array[1], Array[2], Array[3], Array[4])
    .send({ from: store.getState().ConnectWallet.address });
};

export const ICOHelperGetTokenomics = async (address) => {
  return await new web3_.eth.Contract(ICO_ABI, address).methods
    .getTokenomics()
    .call();
};

export const ICOHelperGetBalance = async (address) => {
  console.log(address);
  return await new web3_.eth.Contract(BUSDTokenABI, BUSDToken).methods
    .balanceOf(address)
    .call();
};
