const initialState = {
  accountId: '',
  followeds: null,
};

const friendDrawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ON_CHANGE_ACCOUNT_ID_TEXT':
      return { ...state, accountId: action.accountId };
    case 'FINISHED_GET_FOLLOWEDS':
      return { ...state, followeds: action.followeds };
    default:
      return state;
  }
};

export default friendDrawerReducer;
