import { connect } from 'react-redux';
import Chat from '../component/chat/chat';
import { sendEther } from '../action/walletProfile';

const mapStateToProps = state => ({
  wallet: state.walletProfileReducer.wallet,
  balance: state.walletProfileReducer.balance,
});

const mapDispatchToProps = dispatch => ({
  sendEther: (wallet, balance, toAddress, value) => 
    dispatch(sendEther(wallet, balance, toAddress, value)),
});

const ChatConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);

export default ChatConnected;
