import React from "react";
import { shallowEqual } from "react-redux";

import Web3 from "web3";
import {
  UpdateAddress,
  UpdateConnectLoading,
  UpdateWalletBalance,
} from "../Redux/Action";
import { ConnectWallet, WalletDisconnect } from "../Redux/Action/index";
import { store } from "../Redux/store";
import Swal from "sweetalert2";
import { provider } from "./WalletConnect";
export var web3_ = new Web3("https://bsc-dataseed.binance.org/");
// export var web3_ = new Web3();
// Metamask fucnitonltiy

export const ConnectMetamask = async () => {
  if (window.ethereum) {
    web3_ = new Web3(window.ethereum);

    if ((await web3_.eth.getChainId()) === 3) {
      await window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => {
          store.getState().ConnectWallet.address = res[0];
          store.getState().ConnectWallet.isConnect = false;
          ConnectWallet(res[0]);
        });
      return true;
      console.log(store.getState().ConnectWallet.isConnect);
      UpdateConnectLoading(false);
    } else {
      UpdateConnectLoading(false);
      Swal.fire("Please connect to BNB Mainnet").then((result) => {
        return false;
      });
    }
  } else {
    alert("Please connect via Wallet Connect");
  }

  if (window.ethereum) {
    window.ethereum.on("connect", (connect) => {
      console.log(connect);
    });

    window.ethereum.on("accountsChanged", (accounts) => {
      console.log(accounts[0]);
      UpdateAddress(accounts[0]);
      UpdateWalletBalance(accounts[0]);
      store.getState().ConnectWallet.isConnect = false;
    });

    // Subscribe to chainId change
    window.ethereum.on("chainChanged", (chainId) => {
      console.log(chainId);
    });

    // Subscribe to session disconnection
    window.ethereum.on("disconnect", (code, reason) => {
      console.log(code, reason);
    });
  }
};

// Wallect Connnect Funcitonltiy
export const ConnectWeb3Wallet = async () => {
  await provider.enable();
  web3_ = new Web3(provider);
  let address = await web3_.eth.getAccounts();
  store.getState().ConnectWallet.address = address[0];
  store.getState().ConnectWallet.isConnect = true;
  provider.on("accountsChanged", async (accounts) => {
    console.log(accounts);
    UpdateAddress(accounts[0]);
    UpdateWalletBalance(accounts[0]);
  });

  // Subscribe to chainId change
  provider.on("chainChanged", (chainId) => {
    console.log(chainId);
  });

  // Subscribe to session disconnection
  provider.on("disconnect", (code, reason) => {
    console.log(code, reason);
  });
};

export const DisconnectWallet = () => {
  if (!window.ethereum) {
    web3_.currentProvider.disconnect();
  } else {
    if (window.ethereum) {
      WalletDisconnect();
    } else {
      provider.disconnect();
    }
  }
};
