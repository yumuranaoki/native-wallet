import { createStackNavigator } from 'react-navigation';
import NewUser from '../component/newUser/index';
import SignInConnected from '../container/signIn';
import SignUpConnected from '../container/signUp';

const NewUserNavigator = createStackNavigator({
  NewUser,
  SignInConnected,
  SignUpConnected,
}, {
  initialRouteName: 'NewUser'
});

export default NewUserNavigator;
