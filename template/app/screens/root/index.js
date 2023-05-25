import toastContainer from '@app/redux/toast/containers/toast-container';
import asyncStatusAppLoaderContainer from '@app/redux/async-handler/containers/async-status-app-loader-container';
import {compose} from 'redux';
import Root from './root';

export default compose(toastContainer, asyncStatusAppLoaderContainer)(Root);
