/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import StackNavigator from './components/navigators/StackNavigator';
import { LogBox } from 'react-native';
import DemoNotification from './components/screens/DemoNotification';
LogBox.ignoreLogs([ 'new NativeEventEmitter()was called with a non-null argument without the requiredaddListener method.', 'new NativeEventEmitter()was called with a non-null argument without the requiredremoveListenersmethod.', ]);
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs();

AppRegistry.registerComponent(appName, () => DemoNotification);
