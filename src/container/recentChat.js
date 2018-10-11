import { connect } from 'react-redux';
import RecentChat from '../component/chat/recentChat';
import {
  changeModalState,
  changeRelation,
  changeFollowButtonAbility,
  getUsers,
  follow,
  unfollow,
} from '../action/recentChat';

const mapStateToProps = state => ({
  modalVisible: state.recentChatReducer.modalVisible,
  following: state.recentChatReducer.following,
  searchedUser: state.recentChatReducer.searchedUser,
  followButtonDisabled: state.recentChatReducer.followButtonDisabled,
  recentChatData: state.recentChatReducer.recentChatData,
});

const mapDispatchToProps = dispatch => ({
  changeModalState: () => dispatch(changeModalState()),
  changeRelation: () => dispatch(changeRelation()),
  changeFollowButtonAbility: () => dispatch(changeFollowButtonAbility()),
  getUsers: () => dispatch(getUsers()),
  follow: searchedUser => dispatch(follow(searchedUser)),
  unfollow: followedId => dispatch(unfollow(followedId)),
});

const RecentChatConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecentChat);

export default RecentChatConnected;
