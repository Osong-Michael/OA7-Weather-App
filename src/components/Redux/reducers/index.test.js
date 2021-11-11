import weatherReducer from './'
import { GETTING_WEATHER_FORECAST, CHANGE_SI_UNIT } from '../actions'


describe('Redux Reducers', () => {
  let state
  beforeEach(() => {
    state = {
      weather: {},
      siUnit: 'celsius',
    }
  })

  test('returns initial state when no action is passed', () => {
    weatherReducer(state, {});
    expect(state).toEqual(state)
  });
  
  test('changes the SI Unit of the state when the "CHANGE_SI_UNIT" action is passed', () => {
    const testState = {
      weather: {},
      siUnit: 'fahrenheit',
    };
    const newState = weatherReducer(state, { type: CHANGE_SI_UNIT, unit: 'fahrenheit' });
    expect(newState).toEqual(testState)
  });
  
  test('populates the weather object of the state when the "GETTING_WEATHER_FORECAST" action is passed', () => {
    const data = {
      city: {
        id: 12345,
        country: 'DE',
        name: 'Munich',
      },
      cnt: 40,
      list: [{ clouds: {}, main: {}, dt: 124587999 }, { clouds: {}, main: {}, dt: 1245822499 }],
      message: 0,
    };
    
    const testState = {
      weather: {...data},
      siUnit: 'celsius',
    };
    const newState = weatherReducer(state, { type: GETTING_WEATHER_FORECAST, data });
    expect(newState).toEqual(testState)
  });
})