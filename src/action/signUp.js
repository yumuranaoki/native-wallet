import {
  AsyncStorage
} from 'react-native';
import Wallet from '../util/wallet';

export const onChangeAccountNameTextInSignUp = text => ({
  type: 'ON_CHANGE_ACCOUNT_NAME_TEXT_IN_SIGN_UP',
  accountName: text
});

export const onChangeAccountIdTextInSignUp = text => ({
  type: 'ON_CHNAGE_ACCOUNT_ID_TEXT_IN_SIGN_UP',
  accountId: text
});

export const onChangePasswordTextInSignUp = text => ({
  type: 'ON_CHANGE_PASSWORD_TEXT_IN_SIGN_UP',
  password: text
});

export const onChangePasswordConfirmationTextInSignUp = text => ({
  type: 'ON_CHNAGE_PASSWORD_CONFIRMATION_TEXT_IN_SIGN_UP',
  passwordConfirmation: text
});

export const changePasswordHiddenInSignUp = () => ({
  type: 'ON_CHANGE_PASSWORD_HIDDENIN_SIGN_UP'
});

export const setUpAccount = (accountName, accountId, password, passwordConfirmation) => 
  async (dispatch) => {
    const data = {
      accountName,
      accountId,
      password,
      passwordConfirmation,
    };
    try {
      const result = await fetch('http://localhost:3000/users', {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      });
      const jsonResult = await result.json();
      if (jsonResult.result === 'success') {
        const userId = jsonResult.userId;
        AsyncStorage.setItem('userId', userId);
        dispatch(finishedSetUpAccount(password));
      } else {
        console.log(jsonResult.result);
      }
    } catch (error) {
      console.log(error);
    }
};

const finishedSetUpAccount = password => async (dispatch) => {
  const wallet = new Wallet(
    null,
    password,
    null,
    null,
    null,
    null,
    null
  );
  await wallet.setMnemonicWord();
  await wallet.generatePrivateKey();
  await wallet.generateAddress();
  // walletはwallet用のreducerを用意。actionやcontainerは作成しない
  dispatch(afterFinishedSetUpAccount(wallet));
  dispatch(onMnemonicWordModalSwipe());
};

const afterFinishedSetUpAccount = wallet => ({
  type: 'AFTER_FINISHED_SET_UP_ACCOUNT',
  wallet
});

export const onMnemonicWordModalSwipe = () => ({
  type: 'ON_MNEMONIC_WORD_MODAL_SWIPE'
});
