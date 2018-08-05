const initialState = {
  wallet: null,
  balance: '...',
  toAddress: '',
};

const walletProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ON_CHANGE_TO_ADDRESS':
      console.log(action.toAddress);
      return { ...state, toAddress: action.toAddress };
    case 'SET_WALLET':
      return { ...state, wallet: action.wallet };
    case 'FINISHED_GET_BALANCE':
      return { ...state, balance: action.balance };
    case 'SEND_ETHER':
      return state;
    default:
      return state;
  }
};

export default walletProfileReducer;
