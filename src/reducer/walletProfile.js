const initialState = {
  wallet: null,
  balance: '...',
  toAddress: '',
  value: '0',
  isModalVisible: false,
};

const walletProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ON_CHANGE_TO_ADDRESS':
      return { ...state, toAddress: action.toAddress };
    case 'ON_CHANGE_VALUE':
      return { ...state, value: action.value };
    case 'SET_WALLET':
      return { ...state, wallet: action.wallet };
    case 'FINISHED_GET_BALANCE':
      return { ...state, balance: action.balance };
    case 'FINISHED_SEND_ETHER':
      console.log(action.result);
      return state;
    case 'OPEN_MODAL':
      return { ...state, isModalVisible: true };
    case 'ON_SWIPE':
      return { ...state, isModalVisible: false };
    default:
      return state;
  }
};

export default walletProfileReducer;
