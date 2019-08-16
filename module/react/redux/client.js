const React = require('react');
const ReactDOM = require('react-dom');

const { Provider } = require('react-redux');
const { Router } = require('react-router');
const { browserHistory } = require('react-router');

const storage = require('@redux/storage');
const { routes } = require('@redux/routes');

const initialState = window.__INITIAL_STATE__;

ReactDOM.render(
  <Provider store={storage.configureStore(initialState)}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document
)
