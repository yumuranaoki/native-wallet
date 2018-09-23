import { connect } from 'react-redux';
import RecentChat from '../component/chat/recentChat';
import {
  changeModalState,
  changeRelation,
  changeFollowButtonAbility,
  getUsers,
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
});

const RecentChatConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecentChat);

export default RecentChatConnected;
