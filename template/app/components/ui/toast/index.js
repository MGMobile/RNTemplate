import toastContainer from '@app/redux/toast/containers/toast-container';
import {compose} from 'redux';
import Toast from './toast';
export default compose(toastContainer)(Toast);
