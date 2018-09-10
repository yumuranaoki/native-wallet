const initialState = {
  searchedUser: null,
  following: false,
  modalVisible: false,
};

const recentChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_MODAL_STATE':
      return { ...state, modalVisible: !state.modalVisible };
    case 'FINISHED_SUBMIT_ACCOUNT_ID':
      console.log(action.result);
      return { ...state, searchedUser: action.result, modalVisible: true };
    case 'CHANGE_RELATION':
      return { ...state, following: !state.following };
    default:
      return state;
  }
};

export default recentChatReducer;

