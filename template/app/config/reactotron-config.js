import Config from '@app/config/debug-config';
import Immutable from 'seamless-immutable';
import Reactotron from 'reactotron-react-native';
import {NativeModules} from 'react-native';
import {reactotronRedux as reduxPlugin} from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

const host = NativeModules.SourceCode.scriptURL.split('://')[1].split(':')[0];

const reactotron = Reactotron.configure({name: 'Match', host})
  .useReactNative()
  .use(reduxPlugin({onRestore: Immutable}))
  .use(sagaPlugin());

if (Config.useReactotron) {
  // https://github.com/infinitered/reactotron for more options!
  reactotron.onCustomCommand({
    command: 'logout',
    handler: () => {},
    title: 'Logout',
    description: 'Logout current user',
  });

  reactotron.connect();

  // Let's clear Reactotron on every time we load the app
  reactotron.clear();

  // Totally hacky, but this allows you to not both importing reactotron-react-native
  // on every file.  This is just DEV mode, so no big deal.
}
export default reactotron;
console.tron = reactotron;
