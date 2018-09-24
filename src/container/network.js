import { connect } from 'react-redux';
import Network from '../component/profile/network';
import { changeNetwork } from '../action/network';

const mapStateToProps = state => ({
  wallet: state.walletReducer.wallet,
  network: state.networkReducer.network,
});

const mapDispatchToProps = dispatch => ({
  changeNetwork: (network, wallet) => dispatch(changeNetwork(network, wallet))
});

const NetworkConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Network);

export default NetworkConnected;
