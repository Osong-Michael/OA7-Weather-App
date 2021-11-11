import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import App from './components/App'
import weatherReducer from './components/Redux/reducers';

const middleWares = [thunk, logger];
const store = createStore(weatherReducer, applyMiddleware(...middleWares));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
