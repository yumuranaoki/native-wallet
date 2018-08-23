import { connect } from 'react-redux';
import FriendDrawer from '../component/friendDrawer/index';
import { onChangeAccountIdText, onSubmitAccountId, getFolloweds } from '../action/friendDrawer';

const mapStateToProps = state => ({
  accountId: state.friendDrawerReducer.accountId,
  searchedUser: state.friendDrawerReducer.searchedUser,
  followeds: state.friendDrawerReducer.followeds,
});

const mapDispatchToProps = dispatch => ({
  onChangeAccountIdText: text => dispatch(onChangeAccountIdText(text)),
  onSubmitAccountId: text => dispatch(onSubmitAccountId(text)),
  getFolloweds: userId => dispatch(getFolloweds(userId)),
});

const FriendDrawerConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendDrawer);

export default FriendDrawerConnected;
