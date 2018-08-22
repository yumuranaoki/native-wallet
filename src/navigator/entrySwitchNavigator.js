import { createSwitchNavigator, } from 'react-navigation';
import EntryLoading from '../component/entryLoading/index';
import NewUserNavigator from '../navigator/newUserNavigator';
import SignedUserNavigator from '../navigator/signedUserNavigator';

const EntrySwitchNavigator = createSwitchNavigator({
  EntryLoading, 
  NewUserNavigator,
  SignedUserNavigator,
}, {
  initialRouteName: 'EntryLoading'
});

export default EntrySwitchNavigator;

