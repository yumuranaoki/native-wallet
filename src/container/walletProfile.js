import { connect } from 'react-redux';
import WalletProfile from '../component/walletProfile/index';
import { 
  onChangeToAddress,
  onChangeValue,
  setWallet,
  getBalance,
  sendEther,
  openModal,
  onSwipe,
} from '../action/walletProfile';

const mapStateToProps = state => ({
  wallet: state.walletProfileReducer.wallet,
  balance: state.walletProfileReducer.balance,
  toAddress: state.walletProfileReducer.toAddress,
  value: state.walletProfileReducer.value,
  isModalVisible: state.walletProfileReducer.isModalVisible,
});

const mapDispatchToProps = dispatch => ({
  onChangeToAddress: text => dispatch(onChangeToAddress(text)),
  onChangeValue: text => dispatch(onChangeValue(text)),
  setWallet: wallet => dispatch(setWallet(wallet)),
  getBalance: wallet => dispatch(getBalance(wallet)),
  sendEther: (wallet, balance, toAddress, value) => 
    dispatch(sendEther(wallet, balance, toAddress, value)),
  openModal: () => dispatch(openModal()),
  onSwipe: () => dispatch(onSwipe()),
});

const WalletProfileConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletProfile);

export default WalletProfileConnected;
