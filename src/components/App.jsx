import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

// Axios for API call
import axios from 'axios';

// Components from Material UI library
import { CssBaseline, Snackbar, Alert } from '@mui/material';

// Components from application
import Weather from './Weather';
import Loader from './Loader';

// Redux action to populate Redux state after API call
import { getWeatherForecast } from './Redux/actions';

// Styles for application
import './app.css';

const APP_API_KEY = '56f69b3a4a17c94f6dc74ba275ffcf43';

const App = () => {
  const [state, setState] = useState({ city: 'Munich', show: false, error: false, loading: true });

  const dispatch = useDispatch();
  const { loading, show, city, error } = state;

  useEffect(() => {
    if(loading && !show) {
      fetchAllWeatherDetails(city);
    };
  }, []);

  const getCityWeatherDetails = town => fetchAllWeatherDetails(town);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    };
    setState({ error: false });
  };

  const fetchAllWeatherDetails = async currentCity => {
    setState({ loading: true });
    await axios.get(`https://api.openweathermap.org/data/2.5/forecast?appid=${APP_API_KEY}&q=${currentCity}&units=metric`)
      .then(res => {
        dispatch(getWeatherForecast(res.data));
        setState({
          loading: false,
          show: true,
        });
        return res.data;
      })
      .catch(err => {
        setState({
          loading: false,
          show: true,
        });
      });
  };

  return (
    <div className="ctn-gradient" data-test-id="app-component">
      <Snackbar open={error} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{vertical:'top', horizontal: 'center'}}>
        <Alert severity="error">Sorry City not found, input correct city name</Alert>
      </Snackbar>
      <CssBaseline />
      {loading && ( <Loader /> )}
      {!loading && show && ( <Weather getCityWeatherDetails={getCityWeatherDetails} /> )}
    </div>
  );
};

export default App;