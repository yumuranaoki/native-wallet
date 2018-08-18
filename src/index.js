import React from 'react';
import { Provider } from 'react-redux';
import EntrySwitchNavigaotr from './navigator/entrySwitchNavigator';
import store from './store/index';

const App = () => (
  <Provider store={store}>
    <EntrySwitchNavigaotr />
  </Provider>
);

export default App;
