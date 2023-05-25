import createStore from '@app/redux/reducers';
import {ThemeProvider} from 'styled-components/native';
import React from 'react';
import {Provider} from 'react-redux';
import theme from '@app/theme';
// import {LogBox} from 'react-native';
import Root from './screens/root';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
// create our store
const store = createStore();

// configure dayjs
dayjs.extend(utc);
dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);
dayjs.locale('fr');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAppReady: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({isAppReady: true});
    }, 500);
    // LogBox.ignoreAllLogs();
  }

  render() {
    return (
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
              <Root />
          </Provider>
        </ThemeProvider>
      </SafeAreaProvider>
    );
  }
}

// allow reactotron overlay for fast design in dev mode
export default App;
