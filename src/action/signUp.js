import { AsyncStorage } from 'react-native';
import SInfo from 'react-native-sensitive-info';
import Wallet from '../util/wallet';

export const onChangeAccountNameTextInSignUp = text => ({
  type: 'ON_CHANGE_ACCOUNT_NAME_TEXT_IN_SIGN_UP',
  accountName: text
});

export const onChangeAccountIdTextInSignUp = text => ({
  type: 'ON_CHANGE_ACCOUNT_ID_TEXT_IN_SIGN_UP',
  accountId: text
});

export const onChangePasswordTextInSignUp = text => ({
  type: 'ON_CHANGE_PASSWORD_TEXT_IN_SIGN_UP',
  password: text
});

export const onChangePasswordConfirmationTextInSignUp = text => ({
  type: 'ON_CHANGE_PASSWORD_CONFIRMATION_TEXT_IN_SIGN_UP',
  passwordConfirmation: text
});

export const changePasswordHiddenInSignUp = () => ({
  type: 'ON_CHANGE_PASSWORD_HIDDENIN_SIGN_UP'
});

export const setUpAccount = (accountName, accountId, password, passwordConfirmation) => 
  async (dispatch) => {
    try {
      const wallet = new Wallet(
        null,
        password,
        'kovan',
      );
      await wallet.setMnemonicWord();
      await wallet.generatePrivateKey();
      await wallet.generatePublicKey();
      const address = await wallet.generateAddress();
      const accessToken = await wallet.generateAccessToken();
      console.log(wallet);
      const data = {
        accountName,
        accountId,
        password,
        passwordConfirmation,
        accessToken,
        address,
      };
      console.log(data);
      const result = await fetch('http://localhost:3000/users', {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      });
      console.log(result);
      const jsonResult = await result.json();
      console.log(jsonResult);
      if (jsonResult.result === 'success') {
        const userId = jsonResult.user_id.toString();
        await AsyncStorage.setItem('userId', userId);
        SInfo.setItem('accessToken', accessToken, {
          sharedPreferencesName: 'pWalletSharedPreference',
          keychainService: 'pWalletKeyChain',
        });
        console.log(wallet);
        console.log(wallet.mnemonicWord);
        SInfo.setItem('mnemonicWord', wallet.mnemonicWord, {
          sharedPreferencesName: 'pWalletSharedPreference',
          keychainService: 'pWalletKeyChain',
        });
        console.log('ここまで');
        dispatch(afterFinishedSetUpAccount(wallet));
        dispatch(onMnemonicWordModalSwipe());
      } else {
        console.log(jsonResult.result);
      }
    } catch (error) {
      console.log(error);
    }
};

const afterFinishedSetUpAccount = wallet => ({
  type: 'AFTER_FINISHED_SET_UP_ACCOUNT',
  wallet
});

export const onMnemonicWordModalSwipe = () => ({
  type: 'ON_MNEMONIC_WORD_MODAL_SWIPE'
});

export const onPressConfirmButton = () => ({
  type: 'ON_PRESS_CONFIRM_BUTTON'
});

export const resetState = () => ({
  type: 'RESET_STATE_IN_SIGN_UP',
});
