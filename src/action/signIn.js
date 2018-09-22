import { AsyncStorage } from 'react-native';
import SInfo from 'react-native-sensitive-info';
import Wallet from '../util/wallet';

export const onChangeAccountIdTextInSignIn = text => ({
  type: 'ON_CHANGE_ACCOUNT_ID_TEXT_IN_SIGN_IN',
  accountId: text
});

export const onChangePasswordTextInSignIn = text => ({
  type: 'ON_CHNAGE_PASSWORD_TEXT_IN_SIGN_IN',
  accountId: text
});

export const onChangeMnemonicWordTextInSignIn = text => ({
  type: 'ON_CHANGE_MNEMONIC_WORD_TEXT_IN_SIGN_IN',
  mnemonicWord: text
});

export const signIn = (accountId, password, mnemonicWord) => async (dispatch) => {
  try {
    const wallet = new Wallet(
      mnemonicWord,
      password
    );
    await wallet.generatePrivateKey();
    await wallet.generatePublicKey();
    await wallet.generateAddress();
    const accessToken = await wallet.generateAccessToken();
    const data = {
      accountId,
      accessToken,
    };
    const result = await fetch('http://localhost:3000/signin', {
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
    const jsonResult = await result.json();
    if (jsonResult.result === 'success') {
      const userId = jsonResult.user_id;
      await AsyncStorage.setItem('userId', userId);
      SInfo.setItem('accessToken', accessToken, {
        sharedPreferencesName: 'pWalletSharedPreference',
        keychainService: 'pWalletKeyChain',
      });
      SInfo.setItem('mnemonicWord', mnemonicWord, {
        sharedPreferencesName: 'pWalletSharedPreference',
        keychainService: 'pWalletKeyChain',
      });
      dispatch(moveToSignedInUser());
      dispatch(setWallet(wallet));
    } 
  } catch (error) {
    console.log(error);
  }
};

const moveToSignedInUser = () => ({
  type: 'MOVE_TO_SIGNED_IN_USER',
});

const setWallet = wallet => ({
  type: 'AFTER_FINISHED_SET_UP_ACCOUNT',
  wallet,
});
