import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { CssBaseline, Snackbar, Alert } from '@mui/material';
import './app.css'
import Weather from './Weather';
import Loader from './Loader'
import { getWeatherForecast } from './Redux/actions'

const APP_API_KEY = '56f69b3a4a17c94f6dc74ba275ffcf43';

const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [city, setCity] = useState('Munich');
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch();


  useEffect(() => {
    if(loading && !show) {
      fetchAllWeatherDetails(city)
    }
  })

  const getCityWeatherDetails = town => fetchAllWeatherDetails(town)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError(false);
  };

  const fetchAllWeatherDetails = (currentCity) => {
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?appid=${APP_API_KEY}&q=${currentCity}&units=metric`)
      .then(res => {
        dispatch(getWeatherForecast(res.data));
        setLoading(false)
        setShow(true)
        return res.data;
      })
      .catch(() => {
        setLoading(false)
        setError(true)
      });
  }

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
}

export default App;