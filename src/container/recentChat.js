import { connect } from 'react-redux';
import RecentChat from '../component/chat/recentChat';
import { changeModalState, changeRelation } from '../action/recentChat';

const mapStateToProps = state => ({
  modalVisible: state.recentChatReducer.modalVisible,
  following: state.recentChatReducer.following,
  searchedUser: state.recentChatReducer.searchedUser,
});

const mapDispatchToProps = dispatch => ({
  changeModalState: () => dispatch(changeModalState()),
  changeRelation: () => dispatch(changeRelation()),
});

const RecentChatConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecentChat);

export default RecentChatConnected;
