import {LogBox} from 'react-native';
import DebugConfig from '@app/config/debug-config';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'Warning: componentWillMount has been renamed, and is not recommended for use. See https://fb.me/react-unsafe-component-lifecycles for details.',
  'Warning: Failed prop type: Invalid prop `extraData` of type `object` supplied to `MessageContainer`, expected `array`',
]);

if (__DEV__) {
  // If ReactNative's yellow box warnings are too much, it is possible to turn
  // it off, but the healthier approach is to fix the warnings.  =)
  LogBox.ignoreAllLogs(DebugConfig.ignoreAllLogs);
}
