import { createStackNavigator } from 'react-navigation';
import NewUser from '../component/newUser/index';
import SignIn from '../component/signIn/index';
import SignUpConnected from '../container/signUp';

const NewUserNavigator = createStackNavigator({
  NewUser,
  SignIn,
  SignUpConnected,
}, {
  initialRouteName: 'NewUser'
});

export default NewUserNavigator;
