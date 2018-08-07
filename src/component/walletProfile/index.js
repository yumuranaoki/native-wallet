import '../../../shim';
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import SInfo from 'react-native-sensitive-info';
import Wallet from '../../util/wallet';
import SendModal from './sendModal';
import GetModal from './getModal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
  },
  textInput: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: 200,
    marginBottom: 30,
    marginTop: 10,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonsAlign: {
    flex: 1,
    flexDirection: 'row',
  },
  getButton: {
    width: 110,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#ff9966',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },
  sendButton: {
    width: 110,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#00ff99',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  button: {
    width: 120,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#00ff99',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

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
          null,
          privateKey,
          null,
          publicKey,
          address
        );
        await wallet.generatePrivateKey();
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
      openSendModal,
      openGetModal,
    } = this.props;

    return ( 
      <View style={styles.container}>
        <Text style={{ fontSize: 18, marginBottom: 15 }}>
          Hello from Plasma Wallet
        </Text>
        <Text>{wallet ? wallet.address : ''}</Text>
        <Text style={{ fontSize: 18, marginTop: 15, marginBottom: 15 }}>
          Your Balance: {balance}ETH
        </Text>
        <View style={styles.buttonsAlign}>
          <TouchableOpacity onPress={() => openSendModal()}>
            <View style={styles.sendButton}>
              <Text style={styles.buttonText}>
                Send Ether
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openGetModal()}>
            <View style={styles.getButton}>
              <Text style={styles.buttonText}>
                Get Ether
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <SendModal {...this.props} />
        <GetModal {...this.props} />
      </View>
    );
  }
}

export default WalletProfile;
