import { combineReducers } from 'redux';
import walletProfileReducer from './walletProfile';
import friendDrawerReducer from './friendDrawer';
import recentChatReducer from './recentChat';
import chatReducer from './chat';
import enterPasswordReducer from './enterPassword';
import signUpReducer from './signUp';
import signInReducer from './signIn';
import accountReducer from './account';
import networkReducer from './network';
import walletReducer from './wallet';

const reducer = combineReducers({
  walletProfileReducer,
  friendDrawerReducer,
  recentChatReducer,
  chatReducer,
  enterPasswordReducer,
  signUpReducer,
  signInReducer,
  accountReducer,
  networkReducer,
  walletReducer,
});

export default reducer;
