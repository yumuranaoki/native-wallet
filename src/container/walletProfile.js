import { connect } from 'react-redux';
import WalletProfile from '../component/walletProfile/index';
import { onChangeToAddress, setWallet, getBalance, sendEther } from '../action/walletProfile';

const mapStateToProps = state => ({
  wallet: state.walletProfileReducer.wallet,
  balance: state.walletProfileReducer.balance,
  toAddress: state.walletProfileReducer.toAddress,
});

const mapDispatchToProps = dispatch => ({
  onChangeToAddress: text => dispatch(onChangeToAddress(text)),
  setWallet: wallet => dispatch(setWallet(wallet)),
  getBalance: wallet => dispatch(getBalance(wallet)),
  sendEther: (wallet, toAddress) => dispatch(sendEther(wallet, toAddress)),
});

const WalletProfileConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletProfile);

export default WalletProfileConnected;
