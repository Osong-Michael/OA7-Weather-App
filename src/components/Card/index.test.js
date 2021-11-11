import { mount } from 'enzyme';
import CardBody from './';
import { findByTestId } from '../config';
import data from '../../test_data/data.json'


describe('Card Body Renders correctly', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(< CardBody  weather={data.list[0]} />)
  });

  test('renders the entire card block', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('shows the weather description of a particular day', () => {
    const description = findByTestId(wrapper, 'weather-description')
    expect(description.text()).toEqual('Light Rain');
  });

  test('shows the weather "Max Temperature" of a particular day', () => {
    const maxTemp = findByTestId(wrapper, 'weather-max-temp')
    expect(maxTemp.text()).toEqual('Max Temperature');
  });

  test('shows the weather "Min Temperature" of a particular day', () => {
    const minTemp = findByTestId(wrapper, 'weather-min-temp')
    expect(minTemp.text()).toEqual('Min Temperature');
  });

});