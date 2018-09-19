import { combineReducers } from 'redux';
import walletProfileReducer from './walletProfile';
import friendDrawerReducer from './friendDrawer';
import recentChatReducer from './recentChat';
import chatReducer from './chat';
import enterPasswordReducer from './enterPassword';

const reducer = combineReducers({
  walletProfileReducer,
  friendDrawerReducer,
  recentChatReducer,
  chatReducer,
  enterPasswordReducer,
});

export default reducer;
