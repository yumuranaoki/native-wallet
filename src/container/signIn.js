import { connect } from 'react-redux';
import SignIn from '../component/signIn/index';
import {
  onChangeAccountIdTextInSignIn,
  onChangePasswordTextInSignIn,
  onChnageMnemonicWordTextInSignIn,
  signIn
} from '../action/signIn';

const mapStateToProps = state => ({
  accountId: state.signInReducer.accountId,
  password: state.signInReducer.password,
  mnemonicWord: state.signInReducer.mnemonicWord
});

const mapDispatchToProps = dispatch => ({
  onChangeAccountIdTextInSignIn: text => dispatch(onChangeAccountIdTextInSignIn(text)),
  onChangePasswordTextInSignIn: text => dispatch(onChangePasswordTextInSignIn(text)),
  onChnageMnemonicWordTextInSignIn: text => dispatch(onChnageMnemonicWordTextInSignIn(text)),
  signIn: (accountId, password, mnemonicWord) => dispatch(signIn(accountId, password, mnemonicWord))
});

const SignInConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);

export default SignInConnected;

