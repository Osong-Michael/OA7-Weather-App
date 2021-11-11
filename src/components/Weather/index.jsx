import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; 

// Carousel from react-multi-carousel library
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// Components from Material UI
import { Box,Container, Typography, Input } from '@mui/material';

// Component from application
import CardBody from '../Card'
import Checkbox from '../Checkbox';
import VerticalBar from '../Chart';

// Reducer methods to get Redux state values
import { getWeatherDetails, getCurrentUnit } from '../Redux/reducers';

// Helper methods
import { dayOfWeek } from '../helpers';

const ariaLabel = { 'aria-label': 'description' };
class Weather extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fiveDayWeatherForecast: [],
      hourlyDataForOneDay: [],
      city: '',
      currentTempUnit: 'celsius',
    };
    this.showCard = this.showCard.bind(this);
    this.submitForm = this.submitForm.bind(this);
  };

  componentDidMount(){
    const { weatherDetails } = this.props;

    if(Object.entries(weatherDetails).length) {
      const fiveDayWeather = [];
      for(let i = 0; i < weatherDetails.list.length; i += 8) {
        fiveDayWeather.push(weatherDetails.list[i]);
      };

      this.setState({ fiveDayWeatherForecast: fiveDayWeather });

      this.showCard(dayOfWeek(weatherDetails.list[0].dt));
    };

  };

  componentDidUpdate(prevProps) {
    const { weatherDetails, currentUint } = this.props;
    if(prevProps.weatherDetails.city.name !== weatherDetails.city.name ) {
      const fiveDayWeather = [];
      for(let i = 0; i < weatherDetails.list.length; i += 8) {
        fiveDayWeather.push(weatherDetails.list[i]);
      };

      this.setState({ fiveDayWeatherForecast: fiveDayWeather });
    };

    if(prevProps.currentUint !== currentUint) {
      this.setState({ currentTempUnit: currentUint });
    };
  };

  showCard(currentDay) {
    const { weatherDetails } = this.props;
    const oneDayData =  weatherDetails.list.filter(day => dayOfWeek(day.dt) === currentDay);

    this.setState({ hourlyDataForOneDay: oneDayData });
  };

  submitForm(e) {
    e.preventDefault();
    const { getCityWeatherDetails } = this.props;
    const { city } = this.state;
    getCityWeatherDetails(city);
    this.setState({ city: '' });
  }


  render() {
    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        slidesToSlide: 3
      },
      tablet: {
        breakpoint: { max: 1024, min: 800 },
        items: 2,
        slidesToSlide: 2
      },
      mobile: {
        breakpoint: { max: 800, min: 0 },
        items: 1,
        slidesToSlide: 1
      }
    };

    const { fiveDayWeatherForecast, hourlyDataForOneDay, currentTempUnit } = this.state;
    const { weatherDetails } = this.props;
    

    return (
      <Container maxWidth="lg">
        <Box
          sx={{
            bgcolor: 'transparent',
            boxShadow: 3,
            borderRadius: 5,
            padding: '20px',
          }} >
          <Checkbox />
          <div className="form" data-test-id="input-form">
            <form onSubmit={this.submitForm}>
              <Input
                placeholder="Enter a city..."
                inputProps={ariaLabel}
                onChange={e => this.setState({ city: e.target.value })}
                required={true}
                value={this.state.city}
              />
            </form>
          </div>
          <Typography variant="h5" gutterBottom component="div" sx={{ textAlign: 'center', marginTop: '50px' }}>
            Weather Forecast for <strong style={{ color: '#1976d2' }}>{weatherDetails?.city?.name}</strong>
          </Typography>
          <div style={{ marginTop: '70px'}}>
            <Carousel
              responsive={responsive}
              infinite={false}
              itemClass="padding-class"
            >
              {fiveDayWeatherForecast.map((weather, index) => <div key={index + 1}><CardBody weather={weather} showCard={this.showCard} currentTempUnit={currentTempUnit} /></div>)}
            </Carousel>
          </div>
          {hourlyDataForOneDay.length > 0 && <VerticalBar data={hourlyDataForOneDay} currentTempUnit={currentTempUnit} />}
        </Box>
      </Container>
    );
  };
};

const mapStateToProps = state => ({
  weatherDetails: getWeatherDetails(state),
  currentUint: getCurrentUnit(state)
});

Weather.propTypes = {
  getCityWeatherDetails: PropTypes.func.isRequired,
  weatherDetails: PropTypes.shape({
    city: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    list: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.shape({
        dt: PropTypes.number.isRequired,
      }),
    ]),
  }).isRequired,
};

export default connect(mapStateToProps,  null)(Weather);