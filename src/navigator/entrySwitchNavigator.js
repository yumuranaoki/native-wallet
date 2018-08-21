import { createSwitchNavigator, } from 'react-navigation';
import NewUserNavigator from '../navigator/newUserNavigator';
import EntryLoading from '../component/entryLoading/index';
import WalletProfileConnected from '../container/walletProfile';

const EntrySwitchNavigator = createSwitchNavigator({
  EntryLoading, 
  NewUserNavigator,
  WalletProfileConnected,
}, {
  initialRouteName: 'EntryLoading'
});

export default EntrySwitchNavigator;

