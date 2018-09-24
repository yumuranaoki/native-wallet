import { connect } from 'react-redux';
import MnemonicWord from '../component/profile/mnemonicWord';
import { } from '../action/mnemonicWord';

const mapStateToProps = state => ({
  wallet: state.walletReducer.wallet,
});

const mapDispatchToProps = dispatch => ({

})

const MnemonicWordConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(MnemonicWord);

export default MnemonicWordConnected;
