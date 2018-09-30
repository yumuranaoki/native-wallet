import React from 'react';
import { createBottomTabNavigator, } from 'react-navigation';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ChatStack from '../component/chat/index';
import WalletProfileConnected from '../container/walletProfile';
import ProfileStack from '../component/profile/index';

const SignedUserNavigator = createBottomTabNavigator({
  Chat: {
    screen: ChatStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor, focused }) => (
        <Entypo
          name={'chat'}
          size={focused ? 24 : 16}
          style={{ color: tintColor }}
        />
      ),
    }
  },
  Wallet: {
    screen: WalletProfileConnected,
    navigationOptions: {
      tabBarIcon: ({ tintColor, focused }) => (
        <Entypo
          name={'wallet'}
          size={focused ? 24 : 16}
          style={{ color: tintColor }}
        />
      ),
    }
  },
  Profile: {
    screen: ProfileStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={'ios-person'}
          size={focused ? 24 : 16}
          style={{ color: tintColor }}
        />
      ),
    }
  },
});

export default SignedUserNavigator;
