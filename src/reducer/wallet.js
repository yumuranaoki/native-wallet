const initialState = {
  wallet: null
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AFTER_FINISHED_SET_UP_ACCOUNT':
      return { ...state, wallet: action.wallet };
    default:
      return state;
  }
};

export default walletReducer;
