import '../../../shim';
import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import SInfo from 'react-native-sensitive-info';
import Wallet from '../../util/wallet';

class WalletProfile extends Component {
  async componentDidMount() {    
    // addressがないuserには、walletを作成
    // addressがあるuserにはaddressを引っ張ってくる
    let wallet;
    try {
      const walletInfo = await SInfo.getItem('walletInfo', {
        sharedPreferencesName: 'plasmaWalletSharedPreference',
        keychainService: 'plasmaWalletKeyChain',
      });
      
      if (walletInfo !== undefined) {
        const jsonWalletInfo = JSON.parse(walletInfo);
        const { mnemonicWord, privateKey, publicKey, address } = jsonWalletInfo;
        wallet = new Wallet(
          mnemonicWord,
          privateKey,
          publicKey,
          address,
        );
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
        // ここのpromiseでなにかしらの処理をしてもいい
        SInfo.setItem('walletInfo', JSON.stringify(newWalletInfo), {
          sharedPreferencesName: 'plasmaWalletSharedPreference',
          keychainService: 'plasmaWalletKeyChain'
        });
      }
    } catch (error) {
      console.log(error);
    }

    // walletがあればここでbalanceを取得
    if (wallet) {
      this.props.getBalance(wallet);
    }
  }

  render() {
    const { 
      wallet,
      balance,
      toAddress,
      onChangeToAddress,
      sendEther,
    } = this.props;
    const styles = StyleSheet.create({
      textInput: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
      }
    });
    return ( 
      <View>
        <Text>Hello from Plasma Wallet</Text>
        <Text>{wallet ? wallet.address : ''}</Text>
        <Text>Your Balance: {balance}ETH</Text>
        <TextInput
          style={styles.textInput}
          value={toAddress}
          onChangeText={text => onChangeToAddress(text)}
        />
        <Button
          title='send ether'
          onPress={() => sendEther(wallet, toAddress)}
        />
      </View>
    );
  }
}

export default WalletProfile;
