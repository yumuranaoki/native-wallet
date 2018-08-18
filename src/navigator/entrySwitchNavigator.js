import { createSwitchNavigator } from 'react-navigation';
import EntryLoading from '../component/entryLoading/index';
import NewUserNavigator from './newUserNavigator';
import WalletProfileConnected from '../container/walletProfile';

const EntrySwitchNavigator = createSwitchNavigator({
  EntryLoading, 
  NewUserNavigator,
  WalletProfileConnected,
}, {
  initialRouteName: 'EntryLoading'
});

export default EntrySwitchNavigator;

