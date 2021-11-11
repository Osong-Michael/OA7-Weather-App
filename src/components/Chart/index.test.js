import { shallow } from 'enzyme';
import VerticalBar from './';
import { findByTestId } from '../config';
import data from '../../test_data/data.json';

const prop = data.list.slice(0, 8);


describe('Bar Chart Renders correctly', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(< VerticalBar  data={prop} />);
  });

  test('renders the chart div', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('shows the title of the chart', () => {
    const description = findByTestId(wrapper, 'chart-title');
    expect(description.text()).toEqual('Hourly Data for Wednesday');
  });

});