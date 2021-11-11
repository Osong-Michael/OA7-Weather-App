const GETTING_WEATHER_FORECAST = 'GETTING_WEATHER_FORECAST';
const CHANGE_SI_UNIT = 'CHANGE_SI_UNIT';

function getWeatherForecast(data) {
  return {
    type: GETTING_WEATHER_FORECAST,
    data
  };
};

function changeUnit(unit) {
  return {
    type: CHANGE_SI_UNIT,
    unit
  };
};

export {  getWeatherForecast, changeUnit,  GETTING_WEATHER_FORECAST, CHANGE_SI_UNIT };