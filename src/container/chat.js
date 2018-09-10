import { connect } from 'react-redux';
import Chat from '../component/chat/chat';

const mapStateToProps = state => ({
  wallet: state.walletProfileProduer
});

const mapDispatchToProps = dispatch => ({

});

const ChatConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);

export default ChatConnected;
