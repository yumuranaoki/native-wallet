const initialState = {
  accountId: '',
  password: '',
  mnemonicWord: '',
  isAbleToMoveToSignedInUser: false,
};

const signInReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ON_CHANGE_ACCOUNT_ID_TEXT_IN_SIGN_IN':
      return { ...state, accountId: action.accountId };
    case 'ON_CHANGE_PASSWORD_TEXT_IN_SIGN_IN':
      return { ...state, password: action.password };
    case 'ON_CHANGE_MNEMONIC_WORD_TEXT_IN_SIGN_IN':
      return { ...state, mnemonicWord: action.mnemonicWord };
    case 'MOVE_TO_SIGNED_IN_USER':
      return { ...state, isAbleToMoveToSignedInUser: true };
    case 'RESET_STATE_IN_SIGN_IN':
     return {
       ...state,
       accountId: '',
      password: '',
      mnemonicWord: '',
      isAbleToMoveToSignedInUser: false,
     };
    default:
      return state;
  }
};

export default signInReducer;

