import { createTabNavigator, createDrawerNavigator } from 'react-navigation';
import { Dimensions } from 'react-native';
import Chat from '../component/chat/index';
import FriendDrawer from '../component/friendDrawer/index';
import WalletProfileConnected from '../container/walletProfile';
import Profile from '../component/profile/index';

const { height, width } = Dimensions.get('window');
const oneThirdWidth = width / 3;

const SignedUserNavigator = createTabNavigator({
  Chat: {
    screen: createDrawerNavigator({
      Chat,
    }, {
      contentComponent: FriendDrawer,
      drawerWidth: 300,
    })
  },
  Wallet: WalletProfileConnected,
  Profile,
}, {
  tabBarPosition: 'bottom',
  swipeEnabled: true,
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
