import { createTabNavigator, createDrawerNavigator } from 'react-navigation';
import { Dimensions } from 'react-native';
import ChatStack from '../component/chat/index';
import FriendDrawerConnected from '../container/friendDrawer';
import WalletProfileConnected from '../container/walletProfile';
import ProfileStack from '../component/profile/index';

const { height, width } = Dimensions.get('window');
const oneThirdWidth = width / 3;

const SignedUserNavigator = createTabNavigator({
  Chat: ChatStack,
  Wallet: WalletProfileConnected,
  ProfileStack,
}, {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    tabStyle: {
      borderWidth: 3,
      borderColor: 'black',
      width: oneThirdWidth,
    },
    activeTintColor: 'black',
    activeBackgroundColor: '#FF7367',
    inactiveTintColor: 'black',
    inactiveBackgroundColor: 'white',
  }
});

export default SignedUserNavigator;
