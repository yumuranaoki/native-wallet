import Wallet from '../util/wallet';

export const changeNetwork = (network, wallet) => dispatch => {
  const mnemonicWord = wallet.mnemonicWord;
  const password = wallet.password;
  const newWallet = new Wallet(
    mnemonicWord,
    password,
    network
  );
  dispatch(changeSelected(network));
  dispatch(changeWallet(newWallet));
};

const changeSelected = network => ({
  type: 'CHANGE_NETWORK',
  network,
});

const changeWallet = newWallet => ({
  type: 'CHANGE_WALLET',
  newWallet
});
