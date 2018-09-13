import { connect } from 'react-redux';
import RecentChat from '../component/chat/recentChat';
import {
  changeModalState,
  changeRelation,
  changeFollowButtonAbility
} from '../action/recentChat';

const mapStateToProps = state => ({
  modalVisible: state.recentChatReducer.modalVisible,
  following: state.recentChatReducer.following,
  searchedUser: state.recentChatReducer.searchedUser,
  followButtonDisabled: state.recentChatReducer.followButtonDisabled,
});

const mapDispatchToProps = dispatch => ({
  changeModalState: () => dispatch(changeModalState()),
  changeRelation: () => dispatch(changeRelation()),
  changeFollowButtonAbility: () => dispatch(changeFollowButtonAbility())
});

const RecentChatConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecentChat);

export default RecentChatConnected;
