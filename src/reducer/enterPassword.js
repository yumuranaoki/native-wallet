const initialState = {
  password: '',
  security: true,
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
      return { ...state, navigationAbility: true };
    default:
      return state;
  }
};

export default enterPasswordReducer;
