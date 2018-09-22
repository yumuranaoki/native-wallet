import { AsyncStorage } from 'react-native';
import SInfo from 'react-native-sensitive-info';
import Wallet from '../util/wallet';

export const onChangePasswordText = text => ({
  type: 'ON_CHANGE_PASSWORD_TEXT',
  text
});

export const changeSecurity = () => ({
  type: 'CHANGE_SECURITY'
});

// serverにpostしてpasswordがvalidか確かめる
export const enterPassword = password => async (dispatch) => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    const data = {
      userId,
      password,
    };
    const result = await fetch('http://localhost:3000/auth', {
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
    const jsonResult = await result.json();
    if (jsonResult.result === 'success') {
      dispatch(finishedEnterPassword(password));
    }
  } catch (error) {
    console.log(error);
  }
};

// validならwalletを作成
const finishedEnterPassword = password => async (dispatch) => {
  const mnemonicWord = await SInfo.getItem('mnemonicWord', {
    sharedPreferencesName: 'pWalletSharedPreference',
    keychainService: 'pWalletKeyChain',
  });
  const wallet = new Wallet(
    mnemonicWord,
    password,
  );
  await wallet.generatePrivateKey();
  await wallet.generatePublicKey();
  await wallet.generateAddress();
  dispatch(afterFinishedEnterPassword(wallet));
};

const afterFinishedEnterPassword = wallet => ({
  type: 'AFTER_FINISHED_ENTER_PASSWORD',
  wallet,
});
