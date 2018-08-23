import { combineReducers } from 'redux';
import walletProfileReducer from './walletProfile';
import friendDrawerReducer from './friendDrawer';

const reducer = combineReducers({
  walletProfileReducer,
  friendDrawerReducer,
});

export default reducer;
