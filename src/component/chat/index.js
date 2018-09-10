import { createStackNavigator } from 'react-navigation';
import RecentChatConnected from '../../container/recentChat';
import Chat from './chat';

const ChatStck = createStackNavigator({
  RecentChatConnected,
  Chat: {
    screen: Chat,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.accountName,
    }),
  }
});

export default ChatStck;
