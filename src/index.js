import React from 'react';
import { Provider } from 'react-redux';
import 'core-js/es6/map';
import 'core-js/es6/symbol';
import 'core-js/fn/symbol/iterator';
import EntrySwitchNavigaotr from './navigator/entrySwitchNavigator';
import store from './store/index';

const App = () => (
  <Provider store={store}>
    <EntrySwitchNavigaotr />
  </Provider>
);

export default App;
