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
    try {
      await SInfo.getItem('walletInfo', {
        sharedPreferencesName: 'plasmaWalletSharedPreference',
        keychainService: 'plasmaWalletKeyChain',
      }).then(walletInfo => {
        const jsonWalletInfo = JSON.parse(walletInfo);
        const { mnemonicWord, privateKey, publicKey, address } = jsonWalletInfo;
        const wallet = new Wallet(
          mnemonicWord,
          privateKey,
          publicKey,
          address,
        );
        this.setState({ wallet });
      });
    } catch (error) {
      console.log(error);
    }
    // 以下の処理をどこに書くか？
    // addressがないuserには、walletを作成
    // addressがあるuserにはaddressを引っ張ってくる
    // SInfo.getItem()のコード次第
    /*
    const wallet = new Wallet();
    await wallet.setMnemonicWord();
    await wallet.generatePrivateKey();
    await wallet.generatePublicKey();
    await wallet.generateAddress();
    this.setState({ wallet });
    
    const walletInfo = {
      mnemonicWord: wallet.mnemonicWord,
      privateKey: wallet.privateKey,
      publicKey: wallet.publicKey,
      address: wallet.address,
    };
    
    // ここでbyteではないprivateKeyとpublicKeyをSInfoにセット
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
