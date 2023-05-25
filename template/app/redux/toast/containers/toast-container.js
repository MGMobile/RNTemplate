import {
  currentToastSelector,
  shouldShowToastSelector,
} from '@app/redux/toast/toast.selectors';
import {connect} from 'react-redux';
import ToastActions from '@app/redux/toast/toast.actions';

const mapStateToProps = state => ({
  shouldShowToast: shouldShowToastSelector(state),
  toast: currentToastSelector(state),
});

const mapDispatchToProps = {
  showToast: ToastActions.showToast,
  hideToast: ToastActions.hideToast,
};

export default connect(mapStateToProps, mapDispatchToProps);
