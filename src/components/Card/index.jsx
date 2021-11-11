import React, { useState, useEffect } from "react";
import { withStyles } from '@mui/styles'
import { CardActionArea, Box, Card, CardContent, Divider, Typography } from '@mui/material';
import { dayOfWeek, dayOfMonth, celsiusToFahr, capitalizeFirstLetterOfWords } from "../helpers";

const CardBody = props => {
  const { classes, weather, showCard } = props;
  const [state, setState] = useState('C');
  const [tempMax, setTempMax] = useState(0);
  const [tempMin, setTempMin] = useState(0);

  useEffect(() => {
    if(props.currentTempUnit !== 'celsius') {
      setTempMax(celsiusToFahr(weather?.main?.temp_max))
      setTempMin(celsiusToFahr(weather?.main?.temp_min))
      setState('F')
    } else {
      setTempMax(weather?.main?.temp_max)
      setTempMin(weather?.main?.temp_min)
      setState('C')
    }
  }, [props.currentTempUnit, weather])

  return (
    <Card className={classes.card} sx={{ bgcolor: 'transparent', boxShadow: 3, borderRadius: 5 }} onClick={() => showCard(dayOfWeek(weather.dt))} >
      <CardActionArea>
        <CardContent className={classes.media} >
          <div className="weather-img"><img src={`http://openweathermap.org/img/w/${weather?.weather[0]?.icon}.png`} alt={weather?.weather[0]?.main}/></div>
          <h3 className={classes.heading}  data-test-id="weather-description" >{capitalizeFirstLetterOfWords(weather?.weather[0]?.description)}</h3>
        </CardContent>
        <Divider light />
          <Box display={'flex'}>
            <Box p={2} flex={'auto'}>
              <p className={classes.statLabel} data-test-id="weather-max-temp">Max Temperature</p>
              <p className={classes.statValue}>{tempMax}&deg;{state}</p>
            </Box>
            <Box p={2} flex={'auto'}>
              <p className={classes.statLabel} data-test-id="weather-min-temp">Min Temperature</p>
              <p className={classes.statValue}>{tempMin}&deg;{state}</p>
            </Box>
          </Box>
          <Divider light />
          <Typography p={2} component="p" className={classes.date}>
            {dayOfMonth(weather?.dt_txt)}
          </Typography>
      </CardActionArea>
    </Card>
  );
}

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
export default withStyles(styles)(CardBody);