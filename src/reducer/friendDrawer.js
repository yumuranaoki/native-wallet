const initialState = {
  accountId: '',
  searchedUser: null,
  followeds: null,
};

const friendDrawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ON_CHANGE_ACCOUNT_ID_TEXT':
      return { ...state, accountId: action.accountId };
    case 'FINISHED_SUBMIT_ACCOUNT_ID':
      return { ...state, searchedUser: action.result };
    case 'FINISHED_GET_FOLLOWEDS':
      console.log(action.followeds);
      return { ...state, followeds: action.followeds };
    default:
      return state;
  }
};

export default friendDrawerReducer;
