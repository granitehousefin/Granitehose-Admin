const initialState = {
  isLoadingEnable: false,
};
export const UtilsReducers = (state = initialState, action) => {
  switch (action.type) {
    case "IS_LOADING_ENABLE":
      return { ...state, isLoadingEnable: action.isLoadingEnable };

    default:
      return state;
  }
};

export default UtilsReducers;
