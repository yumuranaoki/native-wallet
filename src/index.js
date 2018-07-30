import '../shim';
import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import Wallet from './util/wallet';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wallet: null,
      balance: 0,
    };
  }

  componentDidMount() {
    // asyncStoreageで問い合わせして条件分岐
    const wallet = new Wallet();
    wallet.setMnemonicWord()
    .then(() => wallet.generatePrivateKey())
    .then(() => wallet.generatePublicKey())
    .then(() => wallet.generateAddress())
    .then(() => this.setState({ wallet }));
  }

  onPressButton() {
    if (this.state.wallet) {
      this.state.wallet.getBalance()
      .then((result) => this.setState({ balance: result }));
    }
  }

  render() {
    const { wallet, balance } = this.state;
    return ( 
      <View>
        <Text>Hello from My Wallet</Text>
        <Button
          onPress={() => this.onPressButton()}
          title='generate private key'
        />
        <Text>{wallet ? wallet.address : ''}</Text>
        <Text>{ balance }</Text>
      </View>
    );
  }
}

export default App;
