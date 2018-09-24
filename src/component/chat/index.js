import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import 'core-js/es6/map';
import 'core-js/es6/symbol';
import 'core-js/fn/symbol/iterator';
import RecentChatConnected from '../../container/recentChat';
import ChatConnected from '../../container/chat';
import FriendDrawerConnected from '../../container/friendDrawer';

const ChatStck = createStackNavigator({
  RecentChat: {
    screen: createDrawerNavigator({
      RecentChatConnected
    }, {
      contentComponent: FriendDrawerConnected,
      drawerWidth: 300,
    }),
    navigationOptions: ({ navigation }) => ({
      
    })
  },
  Chat: {
    screen: ChatConnected,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.accountName,
      tabBarVisible: false,
    }),
  }
});

ChatStck.navigationOptions = ({ navigation }) => {
  if (navigation.state.index === 1) {
      return {
          tabBarVisible: false,
      };
  }
  return {
      tabBarVisible: true,
  };
};

export default ChatStck;
