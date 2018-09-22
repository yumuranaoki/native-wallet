import '../../../shim';
import React, { Component } from 'react';
import {
  View, 
  StyleSheet,
} from 'react-native';
import SInfo from 'react-native-sensitive-info';
import Wallet from '../../util/wallet';
import Header from '../common/header';
import Card from './card';
import SendModal from './sendModal';
import GetModal from './getModal';
import ERC20Card from './erc20Card';

class WalletProfile extends Component {
  async componentDidMount() {
    // addressがないuserには、walletを作成
    // addressがあるuserにはaddressを引っ張ってくる
    /* 
    let wallet;
    try {
      const walletInfo = await SInfo.getItem('walletInfo', {
        sharedPreferencesName: 'pWalletSharedPreference',
        keychainService: 'pWalletKeyChain',
      });

      console.log(walletInfo);
      
      if (walletInfo != undefined) {
        const jsonWalletInfo = JSON.parse(walletInfo);
        const { mnemonicWord, privateKey, publicKey, address } = jsonWalletInfo;
        wallet = new Wallet(
          mnemonicWord,
          null,
          null,
          privateKey,
          null,
          publicKey,
          address
        );
        console.log(wallet);
        await wallet.generatePrivateKey();
        console.log(wallet);
        this.props.setWallet(wallet);
      } else {
        wallet = new Wallet();
        await wallet.setMnemonicWord();
        await wallet.generatePrivateKey();
        await wallet.generatePublicKey();
        await wallet.generateAddress();
        this.props.setWallet(wallet);

        const newWalletInfo = {
          mnemonicWord: wallet.mnemonicWord,
          privateKey: wallet.privateKey,
          publicKey: wallet.publicKey,
          address: wallet.address,
        };

        console.log(newWalletInfo);
        // ここのpromiseでなにかしらの処理をしてもいい
        SInfo.setItem('walletInfo', JSON.stringify(newWalletInfo), {
          sharedPreferencesName: 'pWalletSharedPreference',
          keychainService: 'pWalletKeyChain'
        });
      }
    } catch (error) {
      console.log(error);
    }
    */

    // walletがあればここでbalanceを取得
    if (this.props.wallet) {
      this.props.getBalance(wallet);
      console.log(wallet.address);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header />
        
        <View style={styles.cardConteiner}>
          <Card {...this.props} name='Ether' />
        </View>
        <View style={styles.cardConteiner}>
          <ERC20Card {...this.props} name='Other ERC20' />
        </View>        
         
        <SendModal {...this.props} />
        <GetModal {...this.props} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
  },
  cardConteiner: {
    flexDirection: 'row',
  },
});

export default WalletProfile;
