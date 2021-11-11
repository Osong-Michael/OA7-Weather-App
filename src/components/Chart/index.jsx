import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';

// Bar Chart from react-chartjs library
import { Bar } from 'react-chartjs-2';

// Helper Methods
import { dayOfWeek, timeOfDay, celsiusToFahr } from '../helpers';

const VerticalBar = props => {
  const { data, currentTempUnit } = props;
  const newLabels = data.map(label => timeOfDay(label.dt_txt));
  const newData = data.map(temp => temp.main.temp);
  const [temps, setTemps] = useState([]);

  useEffect(() => {
    if(currentTempUnit !== 'celsius') {
      const barData = data.map(temp => celsiusToFahr(temp.main.temp));
      setTemps(barData);
    } else {
      setTemps(newData);
    }
  }, [currentTempUnit, data]);

  const barData = {
    labels: [...newLabels],
    datasets: [
      {
        label: 'Temperature',
        data: [...temps],
        backgroundColor: [
          '#1976d2'
        ],
        borderColor: [
          '#1976d2'
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom'
     }
    }
  };

  return (
    <div className="chart">
      <div className='header'>
        <h4 className='title' data-test-id="chart-title">Hourly Data for {dayOfWeek(data[0].dt)}</h4>
      </div>
      <Bar data={barData} options={options} className="font-fam"/>
    </div>
  );
};

VerticalBar.propTypes = {
  currentTempUnit: PropTypes.string,
  data: PropTypes.array,
};

export default VerticalBar;