const initialState = {
  searchedUser: null,
  following: false,
  modalVisible: false,
  followButtonDisabled: true,
  recentChatData: [],
};

const recentChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_MODAL_STATE':
      return { ...state, modalVisible: !state.modalVisible };
    case 'FINISHED_SUBMIT_ACCOUNT_ID':
      return { ...state, searchedUser: action.result, modalVisible: true };
    case 'CHANGE_RELATION':
      return { ...state, following: !state.following };
    case 'CHANGE_FOLLOW_BUTTON_ABILITY':
      return { ...state, followButtonDisabled: !state.followButtonDisabled };
    case 'FINISHED_GET_USERS':
      return { ...state, recentChatData: action.recentChatData };
    default:
      return state;
  }
};

export default recentChatReducer;

