import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducer/index';

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

export default store;
