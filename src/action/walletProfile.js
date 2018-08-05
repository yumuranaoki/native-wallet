export const onChangeToAddress = toAddress => ({
  type: 'ON_CHANGE_TO_ADDRESS',
  toAddress,
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

export const sendEther = (wallet, toAddress) => {

  return { type: 'SEND_ETHER' };
};
