import WalletConnectProvider from "@walletconnect/web3-provider";
//  Create WalletConnect Provider
export const provider = new WalletConnectProvider({
  infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
  rpc: {
    97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  },
  qrcode: true,
  qrcodeModalOptions: {
    mobileLinks: ["metamask"],
  },
  desktopLinks: ["encrypted ink"],
});
