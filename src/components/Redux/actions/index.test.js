import { getWeatherForecast, changeUnit, GETTING_WEATHER_FORECAST, CHANGE_SI_UNIT } from './index';

describe('Redux Actions', () => {
  test('creates an action to store weather data in Redux store', () => {
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
    const expectedAction = {
      type: GETTING_WEATHER_FORECAST,
      data
    };

    expect(getWeatherForecast(data)).toEqual(expectedAction);
  });

  test('creates an action to change the "SI Unit" of temperature in Redux store', () => {
    const unit = 'celsius';
    const expectedAction = {
      type: CHANGE_SI_UNIT,
      unit
    };

    expect(changeUnit(unit)).toEqual(expectedAction);
  });
});