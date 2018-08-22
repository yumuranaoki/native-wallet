import { createTabNavigator } from 'react-navigation';
import Chat from '../component/chat/index';
import WalletProfileConnected from '../container/walletProfile';
import Profile from '../component/profile/index';

const SignedUserNavigator = createTabNavigator({
  Chat,
  Wallet: WalletProfileConnected,
  Profile,
});

export default SignedUserNavigator;
