import { connect } from 'react-redux';
import { checkUser } from '../action/entryLoading';
import Entry from '../component/entryLoading/index';

const mapDispatchToProps = dispatch => ({
  checkUser: () => dispatch(checkUser())
});

const EntryConnected = connect(
  mapDispatchToProps
)(Entry);

export default EntryConnected;
