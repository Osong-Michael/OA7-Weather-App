import { GETTING_WEATHER_FORECAST, CHANGE_SI_UNIT } from '../actions'

const initState = {
  weather: {},
  siUnit: 'celsius',
};

const weatherReducer = (state = initState, action) => {
  switch (action.type) {
    case GETTING_WEATHER_FORECAST:
      return {
        ...state,
        weather: action.data
      };
    case CHANGE_SI_UNIT:
      return {
        ...state,
        siUnit: action.unit
      };
    default:
      return state;
  }
};

export const getWeatherDetails = state => state.weather;
export const getCurrentUnit = state => state.siUnit;

export default weatherReducer;