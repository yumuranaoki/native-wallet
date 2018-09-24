import { createStackNavigator } from 'react-navigation';
import ProfileMain from './profileMain';
import NetworkConnected from '../../container/network';
import MnemonicWordConnected from '../../container/mnemonicWord'
import Account from './account';

const ProfileStack = createStackNavigator({
  Main: {
    screen: ProfileMain,
  },
  MnemonicWord: {
    screen: MnemonicWordConnected,
  },
  Network: {
    screen: NetworkConnected,
  },
  Account: {
    screen: Account,
  }
}, {
  headerMode: 'screen'
});

export default ProfileStack;
