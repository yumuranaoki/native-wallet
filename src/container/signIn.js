import { connect } from 'react-redux';
import SignIn from '../component/signIn/index';
import {
  onChangeAccountIdTextInSignIn,
  onChangePasswordTextInSignIn,
  onChangeMnemonicWordTextInSignIn,
  signIn,
  resetState,
} from '../action/signIn';

const mapStateToProps = state => ({
  accountId: state.signInReducer.accountId,
  password: state.signInReducer.password,
  mnemonicWord: state.signInReducer.mnemonicWord,
  isAbleToMoveToSignedInUser: state.signInReducer.isAbleToMoveToSignedInUser,
});

const mapDispatchToProps = dispatch => ({
  onChangeAccountIdTextInSignIn: text => dispatch(onChangeAccountIdTextInSignIn(text)),
  onChangePasswordTextInSignIn: text => dispatch(onChangePasswordTextInSignIn(text)),
  onChangeMnemonicWordTextInSignIn: text => dispatch(onChangeMnemonicWordTextInSignIn(text)),
  signIn: (accountId, password, mnemonicWord) => 
    dispatch(signIn(accountId, password, mnemonicWord)),
  resetState: () => dispatch(resetState()),
});

const SignInConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);

export default SignInConnected;

