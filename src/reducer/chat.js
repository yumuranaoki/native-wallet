const initialState = {
  contents: null
};

const chatDrawer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CONTENTS':
      return { ...state, contents: action.contents };
    default:
      return state;
  }
};

export default chatDrawer;
