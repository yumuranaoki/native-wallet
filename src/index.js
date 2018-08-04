import '../shim';
import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import SInfo from 'react-native-sensitive-info';
import Wallet from './util/wallet';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wallet: null,
      balance: 0,
    };
  }

  async componentDidMount() {
    // SInfoからprivateKeyとpublicKeyを取得
    // privateKeyとpublicKeyが取得できれば、stringからbytePrivateKey, bytePublicKeyを作成
    // error | null（depending on library）でwalletを作成
    /*
    try {
      await SInfo.getItem('walletInfo', {
        sharedPreferencesName: 'plasmaWalletSharedPreference',
        keychainService: 'plasmaWalletKeyChain',
      }).then(walletInfo => console.log(walletInfo));
    } catch (error) {
      console.log(error);
    }
    
    const wallet = new Wallet();
    wallet.setMnemonicWord()
    .then(() => wallet.generatePrivateKey())
    .then(() => wallet.generatePublicKey())
    .then(() => wallet.generateAddress())
    .then(() => this.setState({ wallet }));
    // ここでbyteではないprivateKeyとpublicKeyをSInfoにセット
    const walletInfo = {
      privateKey: wallet.privateKey,
      publicKey: wallet.publicKey,
      address: wallet.address,
    };
    SInfo.setItem('walletInfo', JSON.stringify(walletInfo), {
      sharedPreferencesName: 'plasmaWalletSharedPreference',
      keychainService: 'plasmaWalletKeyChain'
    });
    */
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
