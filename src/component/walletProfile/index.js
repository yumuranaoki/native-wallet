import '../../../shim';
import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
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
      toAddress,
      value,
      isModalVisible,
      onChangeToAddress,
      onChangeValue,
      sendEther,
      openModal,
      onSwipe,
    } = this.props;
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
      }
    });
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
          <TouchableOpacity onPress={() => openModal()}>
            <View style={styles.sendButton}>
              <Text style={styles.buttonText}>
                Send Ether
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openModal()}>
            <View style={styles.getButton}>
              <Text style={styles.buttonText}>
                Get Ether
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <Modal 
          isVisible={isModalVisible}
          onSwipe={() => onSwipe()}
          swipeDirection="down"
          style={styles.modal}
        >
          <View style={styles.modalView}>
            <Text style={{ marginTop: 20 }}>here you can input address</Text>
            <TextInput
              style={styles.textInput}
              value={toAddress}
              onChangeText={text => onChangeToAddress(text)}
            />
            <TextInput
              style={styles.textInput}
              value={value}
              onChangeText={text => onChangeValue(text)}
            />
            <TouchableOpacity onPress={() => sendEther(wallet, balance, toAddress, value)}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>
                  Send Ether
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

export default WalletProfile;
