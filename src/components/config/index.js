import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import weatherReducer from '../Redux/reducers';

export const storeFactory = (initialState) => {
  return createStore(weatherReducer, {...initialState}, applyMiddleware(thunk));
}

export const findByTestId = (wrapper, val) => {
  return wrapper.find(`[data-test-id="${val}"]`);
}