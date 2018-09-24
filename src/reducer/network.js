const initialState = {
  network: 'kovan',
};

const networkReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_NETWORK':
     return { ...state, network: action.network };
    default:
      return state;
  }
};

export default networkReducer;
