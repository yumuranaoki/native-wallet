import React from 'react';
import { Provider } from 'react-redux';
import WalletProfileConnected from './container/walletProfile';
import store from './store/index';

const App = () => (
  <Provider store={store}>
    <WalletProfileConnected />
  </Provider>
);

export default App;
