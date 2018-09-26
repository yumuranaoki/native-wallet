const initialState = {
  accountName: '',
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER_ACCOUNT_INFORMATION':
      return { ...state, accountName: action.accountName };
    default:
      return state;
  }
};

export default accountReducer;

