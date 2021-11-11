import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import App from './App';
import { findByTestId, storeFactory } from './config';

const state = {
  weather: {},
  siUnit: 'celsius',
};

const setup = () => {
  const store = storeFactory(state);
  return mount(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

test('renders the App component without crashing', () => {
  const wrapper = setup();
  const appComponent = findByTestId(wrapper, 'app-component');
  expect(appComponent.exists()).toBe(true);
});