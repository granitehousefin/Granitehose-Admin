import { BUSDTokenABI } from "../Config/ABI/BUSDTokenABI";
import { BUSDToken } from "../Config/Contract/Contract";
import { store } from "../Redux/store";
import { web3_ } from "../Services";

//Get Contract
export const BUSDHelperContract = () => {
  return new web3_.eth.Contract(BUSDTokenABI, BUSDToken);
};

// Get Balance of user
export const GetBUSDBalanceHelper = async (address) => {
  console.log(address);
  let balance = await new web3_.eth.Contract(BUSDTokenABI, BUSDToken).methods
    .balanceOf(address)
    .call();
  console.log(balance);
  return balance;
};
