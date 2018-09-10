import { combineReducers } from 'redux';
import walletProfileReducer from './walletProfile';
import friendDrawerReducer from './friendDrawer';
import recentChatReducer from './recentChat';

const reducer = combineReducers({
  walletProfileReducer,
  friendDrawerReducer,
  recentChatReducer,
});

export default reducer;
