import { connect } from 'react-redux';
import WalletProfile from '../component/walletProfile/index';
import { 
  onChangeToAddress,
  onChangeValue,
  setWallet,
  getBalance,
  sendEther,
  openSendModal,
  openGetModal,
  onSendModalSwipe,
  onGetModalSwipe,
} from '../action/walletProfile';

const mapStateToProps = state => ({
  wallet: state.walletProfileReducer.wallet,
  balance: state.walletProfileReducer.balance,
  toAddress: state.walletProfileReducer.toAddress,
  value: state.walletProfileReducer.value,
  isSendModalVisible: state.walletProfileReducer.isSendModalVisible,
  isGetModalVisible: state.walletProfileReducer.isGetModalVisible,
});

const mapDispatchToProps = dispatch => ({
  onChangeToAddress: text => dispatch(onChangeToAddress(text)),
  onChangeValue: text => dispatch(onChangeValue(text)),
  setWallet: wallet => dispatch(setWallet(wallet)),
  getBalance: wallet => dispatch(getBalance(wallet)),
  sendEther: (wallet, balance, toAddress, value) => 
    dispatch(sendEther(wallet, balance, toAddress, value)),
  openSendModal: () => dispatch(openSendModal()),
  openGetModal: () => dispatch(openGetModal()),
  onSendModalSwipe: () => dispatch(onSendModalSwipe()),
  onGetModalSwipe: () => dispatch(onGetModalSwipe()),
});

const WalletProfileConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletProfile);

export default WalletProfileConnected;
