import { connect } from 'react-redux';
import WalletProfile from '../component/walletProfile/index';
import { 
  onChangeToAddress,
  onChangeValue,
  onChangeERC20Address,
  setWallet,
  getBalance,
  sendEther,
  openSendModal,
  openGetModal,
  onSendModalSwipe,
  onGetModalSwipe,
  getERC20Info,
} from '../action/walletProfile';

const mapStateToProps = state => ({
  wallet: state.walletProfileReducer.wallet,
  balance: state.walletProfileReducer.balance,
  ERC20Balance: state.walletProfileReducer.ERC20Balance,
  toAddress: state.walletProfileReducer.toAddress,
  ERC20Address: state.walletProfileReducer.ERC20Address,
  value: state.walletProfileReducer.value,
  isSendModalVisible: state.walletProfileReducer.isSendModalVisible,
  isGetModalVisible: state.walletProfileReducer.isGetModalVisible,
});

const mapDispatchToProps = dispatch => ({
  onChangeToAddress: text => dispatch(onChangeToAddress(text)),
  onChangeValue: text => dispatch(onChangeValue(text)),
  onChangeERC20Address: text => dispatch(onChangeERC20Address(text)),
  setWallet: wallet => dispatch(setWallet(wallet)),
  getBalance: wallet => dispatch(getBalance(wallet)),
  sendEther: (wallet, balance, toAddress, value) => 
    dispatch(sendEther(wallet, balance, toAddress, value)),
  openSendModal: () => dispatch(openSendModal()),
  openGetModal: () => dispatch(openGetModal()),
  onSendModalSwipe: () => dispatch(onSendModalSwipe()),
  onGetModalSwipe: () => dispatch(onGetModalSwipe()),
  getERC20Info: (wallet, ERC20Address) => dispatch(getERC20Info(wallet, ERC20Address)),
});

const WalletProfileConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletProfile);

export default WalletProfileConnected;
