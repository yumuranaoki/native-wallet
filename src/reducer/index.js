import { combineReducers } from 'redux';
import walletProfileReducer from './walletProfile';
import friendDrawerReducer from './friendDrawer';
import recentChatReducer from './recentChat';
import chatReducer from './chat';
import enterPasswordReducer from './enterPassword';
import signUpReducer from './signUp';

const reducer = combineReducers({
  walletProfileReducer,
  friendDrawerReducer,
  recentChatReducer,
  chatReducer,
  enterPasswordReducer,
  signUpReducer,
});

export default reducer;
