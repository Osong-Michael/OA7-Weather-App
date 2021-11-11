import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'; 

// Material UI Components
import { withStyles } from '@mui/styles';
import { CardActionArea, Box, Card, CardContent, Divider, Typography } from '@mui/material';

// Helper Methods
import { dayOfWeek, dayOfMonth, celsiusToFahr, capitalizeFirstLetterOfWords } from "../helpers";

const CardBody = props => {
  const { classes, weather, showCard, currentTempUnit } = props;
  const [state, setState] = useState({ tempMax: 0, tempMin: 0, tempUnit: 'C'});

  useEffect(() => {
    if(currentTempUnit !== 'celsius') {
      setState({
        tempMax: celsiusToFahr(weather?.main?.temp_max),
        tempMin: celsiusToFahr(weather?.main?.temp_min),
        tempUnit: 'F',
      });
    } else {
      setState({
        tempMax: weather?.main?.temp_max,
        tempMin: weather?.main?.temp_min,
        tempUnit: 'C',
      });
    }
  }, [currentTempUnit, weather]);

  const minMaxTemps = ['Max', 'Min'].map(temp => (
    <Box p={2} flex={'auto'} key={temp}>
      <p className={classes.statLabel} data-test-id={`weather-${temp.toLowerCase()}-temp`}>{temp} Temperature</p>
      <p className={classes.statValue}>{temp === 'Max' ? state.tempMax : state.tempMin}&deg;{state.tempUnit}</p>
    </Box>
  ));

  return (
    <Card className={classes.card} sx={{ bgcolor: 'transparent', boxShadow: 3, borderRadius: 5 }} onClick={() => showCard(dayOfWeek(weather.dt))} >
      <CardActionArea>
        <CardContent className={classes.media} >
          <div className="weather-img"><img src={`http://openweathermap.org/img/w/${weather?.weather[0]?.icon}.png`} alt={weather?.weather[0]?.main}/></div>
          <h3 className={classes.heading}  data-test-id="weather-description" >{capitalizeFirstLetterOfWords(weather?.weather[0]?.description)}</h3>
        </CardContent>
        <Divider light />
          <Box display={'flex'}>
            {minMaxTemps}
          </Box>
          <Divider light />
          <Typography p={2} component="p" className={classes.date}>
            {dayOfMonth(weather?.dt_txt)}
          </Typography>
      </CardActionArea>
    </Card>
  );
};

const styles = {
  card: {
    margin: "0 20px",
  },
  media: {
    height: 140
  },
  avatar: {
    width: 60,
    height: 60,
    margin: 'auto',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    marginTop: 8,
    marginBottom: 0,
    textAlign: 'center',
  },
  subheader: {
    fontSize: 14,
    marginBottom: '0.875em',
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: 900,
    margin: 0,
    textAlign: 'center',
    color: '#1976d2',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    letterSpacing: '1px',
    textAlign: 'center',
  },

  date: {
    textAlign: 'center',
  }
};

CardBody.propTypes = {
  classes: PropTypes.object,
  currentTempUnit: PropTypes.string,
  showCard: PropTypes.func,
  weather: PropTypes.shape({
    dt: PropTypes.number.isRequired,
    dt_txt: PropTypes.string.isRequired,
    main: PropTypes.shape({
      temp_max: PropTypes.number.isRequired,
      temp_min: PropTypes.number.isRequired,
    }),
    weather: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.shape({
        icon: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        main: PropTypes.string.isRequired,
      }),
    ]),
  }).isRequired,
};
export default withStyles(styles)(CardBody);