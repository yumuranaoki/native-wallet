import { combineReducers } from 'redux';
import walletProfileReducer from './walletProfile';
import friendDrawerReducer from './friendDrawer';
import recentChatReducer from './recentChat';
import chatReducer from './chat';
import enterPasswordReducer from './enterPassword';
import signUpReducer from './signUp';
import signInReducer from './signIn';
import walletReducer from './wallet';
import networkReducer from './network';

const reducer = combineReducers({
  walletProfileReducer,
  friendDrawerReducer,
  recentChatReducer,
  chatReducer,
  enterPasswordReducer,
  signUpReducer,
  signInReducer,
  networkReducer,
  walletReducer,
});

export default reducer;
