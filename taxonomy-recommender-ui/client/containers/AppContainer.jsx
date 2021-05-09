import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from '../components/App.jsx';
import { startApplication } from '../sagas/startApplication';

const mapStateToProps = (state) => ({
  config: state.config,
  selectedValues: state.config.selectedValues
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  startApplication,
}, dispatch);

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
