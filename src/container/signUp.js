import { connect } from 'react-redux';
import SignUp from '../component/signUp';
import {
  onChangeAccountNameTextInSignUp,
  onChangeAccountIdTextInSignUp,
  onChangePasswordTextInSignUp,
  onChangePasswordConfirmationTextInSignUp,
  changePasswordHiddenInSignUp,
  setUpAccount,
  onMnemonicWordModalSwipe,
} from '../action/signUp';

const mapStateToProps = state => ({
  accountName: state.signUpReducer.accountName,
  accountId: state.signUpReducer.accountId,
  password: state.signUpReducer.password,
  passwordConfirmation: state.signUpReducer.passwordConfirmation,
  passwordHidden: state.signUpReducer.passwordHidden,
  isMnemonicWordModalVisible: state.signUpReducer.isMnemonicWordModalVisible,
});

const mapDispatchToProps = dispatch => ({
  onChangeAccountNameTextInSignUp: text => dispatch(onChangeAccountNameTextInSignUp(text)),
  onChangeAccountIdTextInSignUp: text => dispatch(onChangeAccountIdTextInSignUp(text)),
  onChangePasswordTextInSignUp: text => dispatch(onChangePasswordTextInSignUp(text)),
  onChangePasswordConfirmationTextInSignUp: text =>
    dispatch(onChangePasswordConfirmationTextInSignUp(text)),
  changePasswordHiddenInSignUp: () => dispatch(changePasswordHiddenInSignUp()),
  setUpAccount: (accountName, accountId, password, passwordConfirmation) =>
    dispatch(setUpAccount(accountName, accountId, password, passwordConfirmation)),
  onMnemonicWordModalSwipe: () => dispatch(onMnemonicWordModalSwipe()),
});

const signUpConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);

export default signUpConnected;
