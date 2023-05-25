import {shouldShowLoaderSelector} from '@app/redux/async-handler/async-handler.selectors';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
  isLoading: shouldShowLoaderSelector(state),
});

export default connect(mapStateToProps);
