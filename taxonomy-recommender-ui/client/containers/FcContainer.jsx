import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Upload from '../components/Upload.jsx';
import { searchConditions, runExperiment} from '../actions/search';
const mapStateToProps = (state) => ({
  config: state.config,
  selectedValues: state.config.selectedValues
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    searchConditions,
    runExperiment,
}, dispatch);

const FcContainer = connect(mapStateToProps, mapDispatchToProps)(Upload);

export default FcContainer;
