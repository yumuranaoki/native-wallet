import { connect } from 'react-redux';
import FriendDrawer from '../component/friendDrawer/index';
import {
  onChangeAccountIdText,
  getFolloweds,
} from '../action/friendDrawer';
import {
  changeModalState,
  onSubmitAccountId,
} from '../action/recentChat';

const mapStateToProps = state => ({
  accountId: state.friendDrawerReducer.accountId,
  searchedUser: state.friendDrawerReducer.searchedUser,
  followeds: state.friendDrawerReducer.followeds,
  followingInLocal: state.recentChatReducer.followingInLocal,
  unfollowingInLocal: state.recentChatReducer.unfollowingInLocal,
});

const mapDispatchToProps = dispatch => ({
  onChangeAccountIdText: text => dispatch(onChangeAccountIdText(text)),
  onSubmitAccountId: text => dispatch(onSubmitAccountId(text)),
  getFolloweds: userId => dispatch(getFolloweds(userId)),
  changeModalState: () => dispatch(changeModalState()),
});

const FriendDrawerConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendDrawer);

export default FriendDrawerConnected;
