const initialState = {
  wallet: null,
  balance: '...',
  toAddress: '',
  value: '0',
  isSendModalVisible: false,
  isGetModalVisible: false,
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
    case 'OPEN_SEND_MODAL':
      return { ...state, isSendModalVisible: true };
    case 'OPEN_GET_MODAL':
      return { ...state, isGetModalVisible: true };
    case 'ON_SEND_MODAL_SWIPE':
      return { ...state, isSendModalVisible: false };
    case 'ON_GET_MODAL_SWIPE':
      return { ...state, isGetModalVisible: false };
    default:
      return state;
  }
};

export default walletProfileReducer;
