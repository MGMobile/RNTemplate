import {
  errorSelector,
  isLoadingSelector,
} from '@app/redux/async-handler/async-handler.selectors';
import {connect} from 'react-redux';

const mapStateToProps = asyncEventName => state => ({
  error: errorSelector(asyncEventName)(state),
  isLoading: isLoadingSelector(asyncEventName)(state),
});

export default asyncEventName => connect(mapStateToProps(asyncEventName));
