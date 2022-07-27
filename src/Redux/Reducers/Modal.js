const initialState = {
  isConnectModalOpen: false,
};
export const Modal = (state = initialState, action) => {
  switch (action.type) {
    case "CONNECT_WALLET_MODAL":
      return { ...state, isConnectModalOpen: action.isOpen };

    default:
      return state;
  }
};

export default Modal;
