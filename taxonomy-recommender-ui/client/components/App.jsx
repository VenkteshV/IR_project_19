import React from 'react';
import PropTypes from 'prop-types';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import FcContainer from '../containers/FcContainer.jsx'
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(!_.isEmpty(this.props.config)) {
      return(
        <Router>
          <Switch>
            <Route exact path='/' component={FcContainer}/>
            <Route path='/fc-list' component={FcContainer}/>
          </Switch>
        </Router>
      );
} else {
  return (
    <div className="loader"></div>
  );
}


  }
}

App.propTypes = {
  config: PropTypes.object,
};
