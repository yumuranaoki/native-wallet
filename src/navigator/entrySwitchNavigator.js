import { createSwitchNavigator, } from 'react-navigation';
import EntryLoading from '../component/entryLoading/index';
import NewUserNavigator from '../navigator/newUserNavigator';
import SignedUserNavigator from '../navigator/signedUserNavigator';
import EnterPasswordConnected from '../container/enterPassword';

const EntrySwitchNavigator = createSwitchNavigator({
  EntryLoading, 
  NewUserNavigator,
  EnterPasswordConnected,
  SignedUserNavigator,
}, {
  initialRouteName: 'EntryLoading'
});

export default EntrySwitchNavigator;

