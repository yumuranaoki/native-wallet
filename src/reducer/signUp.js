const initialState = {
  accountName: '',
  accountId: '',
  password: '',
  passwordConfirmation: '',
  passwordHidden: true,
  isMnemonicWordModalVisible: false,
  isAbleToMoveToSignedInUserScreen: false,
};

const signUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ON_CHANGE_ACCOUNT_NAME_TEXT_IN_SIGN_UP':
      return { ...state, accountName: action.accountName };
    case 'ON_CHANGE_ACCOUNT_ID_TEXT_IN_SIGN_UP':
      return { ...state, accountId: action.accountId };
    case 'ON_CHANGE_PASSWORD_TEXT_IN_SIGN_UP':
      return { ...state, password: action.password };
    case 'ON_CHANGE_PASSWORD_CONFIRMATION_TEXT_IN_SIGN_UP':
      return { ...state, passwordConfirmation: action.passwordConfirmation };
    case 'ON_CHANGE_PASSWORD_HIDDEN_IN_SIGN_UP':
      return { ...state, passwordHidden: !state.passwordHidden };
    case 'ON_MNEMONIC_WORD_MODAL_SWIPE':
      return { ...state, isMnemonicWordModalVisible: !state.isMnemonicWordModalVisible };
    case 'ON_PRESS_CONFIRM_BUTTON':
      return { ...state, isAbleToMoveToSignedInUserScreen: true }
    default:
      return state;
  }
};

export default signUpReducer;
