import { createStackNavigator } from 'react-navigation';
import 'core-js/es6/map';
import 'core-js/es6/symbol';
import 'core-js/fn/symbol/iterator';
import RecentChatConnected from '../../container/recentChat';
import ChatConnected from '../../container/chat';

const ChatStck = createStackNavigator({
  RecentChatConnected,
  Chat: {
    screen: ChatConnected,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.accountName,
    }),
  }
});

export default ChatStck;
