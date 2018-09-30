import { connect } from 'react-redux';
import Chat from '../component/chat/chat';
import { sendEther } from '../action/walletProfile';
import { setContents } from '../action/chat';

const mapStateToProps = state => ({
  wallet: state.walletReducer.wallet,
  balance: state.walletProfileReducer.balance,
  accountName: state.accountReducer.accountName,
  contents: state.chatReducer.contents,
});

const mapDispatchToProps = dispatch => ({
  sendEther: (wallet, balance, toAddress, value) => 
    dispatch(sendEther(wallet, balance, toAddress, value)),
  setContents: contents => dispatch(setContents(contents)),
});

const ChatConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);

export default ChatConnected;
