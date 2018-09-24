const initialState = {
  wallet: null
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AFTER_FINISHED_SET_UP_ACCOUNT':
      return { ...state, wallet: action.wallet };
    case 'CHANGE_WALLET':
      return { ...state, wallet: action.newWallet };
    default:
      return state;
  }
};

export default walletReducer;
