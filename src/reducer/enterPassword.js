const initialState = {
  password: '',
  security: true,
  wallet: null,
  navigationAbility: false,
};

const enterPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ON_CHANGE_PASSWORD_TEXT':
      return { ...state, password: action.text };
    case 'CHANGE_SECURITY':
      console.log('this is called');
      return { ...state, security: !state.security };
    case 'AFTER_FINISHED_ENTER_PASSWORD':
      console.log(action.wallet);
      return { ...state, wallet: action.wallet, navigationAbility: true };
    default:
      return state;
  }
};

export default enterPasswordReducer;
