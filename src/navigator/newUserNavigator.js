import { createStackNavigator } from 'react-navigation';
import NewUser from '../component/newUser/index';
import SignIn from '../component/signIn/index';
import SignUp from '../component/signUp/index';

const NewUserNavigator = createStackNavigator({
  NewUser,
  SignIn,
  SignUp
}, {
  initialRouteName: 'NewUser'
});

export default NewUserNavigator;
