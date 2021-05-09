/*
    ./client/index.js
*/
// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './components/App.jsx';
//
// ReactDOM.render(<App />, document.getElementById('root'));
import React from 'react';
import { render } from 'react-dom';
import 'regenerator-runtime/runtime';
import AppContainer from './containers/AppContainer.jsx';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import combinedReducers from './reducers/combined';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/sagas';
import * as actions from './constants/actions';
import './styles/index.scss';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

let store = createStore(combinedReducers, composeEnhancers(applyMiddleware(sagaMiddleware)));

const task =  sagaMiddleware.run(rootSaga);

export const action = type => store.dispatch({ type });

action(actions.START_APPLICATION);

task.done.catch((error) => {
  action(actions.ERROR);
});

render(
  <Provider store={store}>
    <AppContainer/>
  </Provider>, document.getElementById('app'));
