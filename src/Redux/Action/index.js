import { GetBUSDBalanceHelper } from "../../Helpers/BUSDToken";
import { store } from "../store";

export const ConnectWallet = (address) => {
  store.dispatch({
    type: "CONNECT_WALLET",
    address: address,
  });
  console.log(store.getState());
};

export const UpdateWalletBalance = async () => {
  store.dispatch({
    type: "WALLET_BALANCE",
    busdBalance: await GetBUSDBalanceHelper(
      store.getState().ConnectWallet.address
    ),
    anypadBalance: await GetBUSDBalanceHelper(
      store.getState().ConnectWallet.address
    ),
  });
  console.log(store.getState());
};

export const UpdateAddress = async (address) => {
  store.dispatch({
    type: "UPDATE_ADDRESS",
    address: address,
  });
  console.log(store.getState());
};

export const UpdateConnectModal = (status) => {
  store.dispatch({
    type: "CONNECT_WALLET_MODAL",
    isOpen: status,
  });
};

export const UpdateConnectLoading = (status) => {
  store.dispatch({
    type: "IS_LOADING_ENABLE",
    isLoadingEnable: status,
  });
};

export const WalletDisconnect = () => {
  store.dispatch({
    type: "DISCONNECT_WALLET",
  });
};
