/** @format */

import { AppRegistry } from 'react-native';
import App from './src/index';
import { name as appName } from './app.json';
import SignUp from './src/component/signUp/index';

AppRegistry.registerComponent(appName, () => SignUp);
