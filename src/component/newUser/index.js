import React from 'react';
import { View, StyleSheet } from 'react-native';
import SInfo from 'react-native-sensitive-info';
import Wallet from '../../util/wallet';
import MyButton from '../common/myButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const NewUser = ({ navigation }) => {
  const setUpWallet = async () => {
    const wallet = new Wallet();
    try {
      await wallet.setMnemonicWord();
      await wallet.generatePrivateKey();
      await wallet.generatePublicKey();
      await wallet.generateAddress();
    } catch (err) {
      console.log(err);
    }
    const walletInfo = {
      mnemonicWord: wallet.mnemonicWord,
      privateKey: wallet.privateKey,
      publicKey: wallet.publicKey,
      address: wallet.address,
    };
    SInfo.setItem('walletInfo', JSON.stringify(walletInfo), {
      sharedPreferencesName: 'pWalletSharedPreference',
      keychainService: 'pWalletKeyChain',
    });
    try {
      const accessToken = await wallet.generateAccessToken();
      SInfo.setItem('accessToken', accessToken, {
        sharedPreferencesName: 'pWalletSharedPreference',
        keychainService: 'pWalletKeyChain',
      });
      navigation.navigate('SignUp', { accessToken, address: wallet.address });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <MyButton onPressedFunction={() => navigation.navigate('SignIn')}>
        sign in
      </MyButton>
      <MyButton onPressedFunction={() => setUpWallet()}>
        sign up
      </MyButton>
    </View>
  );
};

export default NewUser;
