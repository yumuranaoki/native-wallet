import '../../shim';
import { keccak256 } from 'js-sha3';

export const onChangeToAddress = toAddress => ({
  type: 'ON_CHANGE_TO_ADDRESS',
  toAddress,
});

export const onChangeValue = value => ({
  type: 'ON_CHANGE_VALUE',
  value,
});

export const onChangeERC20Address = ERC20Address => ({
  type: 'ON_CHANGE_ERC20_ADDRESS',
  ERC20Address,
});

export const setWallet = wallet => ({
  type: 'SET_WALLET',
  wallet,
});

export const getBalance = wallet => (
  function (dispatch) {
   if (wallet.address) {
     wallet.getBalance()
     .then(balance => dispatch(finishedGetBalance(balance)));
   }
  }
);

const finishedGetBalance = balance => ({
  type: 'FINISHED_GET_BALANCE',
  balance,
});

export const sendEther = (wallet, balance, toAddress, value) => (
  function (dispatch) {
    const valueNum = Number(value);
    console.log(wallet);
    if (
      wallet.bytePrivateKey && 
      balance * 1000000000000000000 >=
      (valueNum * 1000000000000000000) + (4 * 21000)
    ) {
      console.log('これからtxParams');
      const txParams = {
        gasLimit: 21000,
        gasPrice: 4,
        toAddress,
        value: valueNum * 1000000000000000000,
        chainId: 42,
      };
      wallet.sendRawTransaction(txParams)
      .then(result => dispatch(finishedSendEther(result)))
      .catch(err => console.log(err));
    }
  }
);

const finishedSendEther = result => ({
  type: 'FINISHED_SEND_ETHER',
  result,
});

export const openSendModal = () => ({
  type: 'OPEN_SEND_MODAL'
});

export const openGetModal = () => ({
  type: 'OPEN_GET_MODAL'
});

export const onSendModalSwipe = () => ({
  type: 'ON_SEND_MODAL_SWIPE'
});

export const onGetModalSwipe = () => ({
  type: 'ON_GET_MODAL_SWIPE'
});

export const getERC20Info = (wallet, ERC20Address) => (
  function (dispatch) {
    if (wallet && wallet.address !== '') {
      const method = keccak256('balance');
      const address = `000000000000000000000000${wallet.address.slice(2)}`;
      const data = `0x${method + address}`;
      const txParams = {
        to: ERC20Address,
        data
      };
      wallet.call(txParams)
      .then(res => {
        if (res == '0x') {
          return 0;
        } 
        return parseInt(res, 16);
      })
      .then(res => dispatch(finishedGetERC20Info(res)))
      .catch(err => console.log(err));
    }
  }
);

const finishedGetERC20Info = ERC20Balance => ({
  type: 'FINISHED_GET_ERC20_INFO',
  ERC20Balance,
});

