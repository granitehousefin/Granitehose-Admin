const initialState = {
  address: "",
  isConnect: false,
  walletBalance: {
    busdBalance: "0",
    anypadBalance: "0",
  },
};
export const ConnectWallet = (state = initialState, action) => {
  switch (action.type) {
    case "CONNECT_WALLET":
      return { ...state, address: action.address, isConnect: true };
    case "WALLET_BALANCE":
      return {
        ...state,
        walletBalance: {
          busdBalance: action.busdBalance,
          anypadBalance: action.anypadBalance,
        },
      };
    case "UPDATE_ADDRESS":
      return { ...state, address: action.address };
    case "DISCONNECT_WALLET":
      return {};
    default:
      return state;
  }
};

export default ConnectWallet;
