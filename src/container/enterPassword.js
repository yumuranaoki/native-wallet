import { connect } from 'react-redux';
import EnterPassword from '../component/enterPassword/index';
import { onChangePasswordText, changeSecurity, enterPassword } from '../action/enterPassword';

const mapStateToProps = state => ({
  password: state.enterPasswordReducer.password,
  security: state.enterPasswordReducer.security,
  navigationAbility: state.enterPasswordReducer.navigationAbility,
});

const mapDispatchToProps = dispatch => ({
  onChangePasswordText: text => dispatch(onChangePasswordText(text)),
  changeSecurity: () => dispatch(changeSecurity()),
  enterPassword: password => dispatch(enterPassword(password)),
});

const EnterPasswordConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EnterPassword);

export default EnterPasswordConnected;
