import React, { useState, useEffect } from "react";
import { Bar } from 'react-chartjs-2';
import { dayOfWeek, timeOfDay } from '../helpers';
import { celsiusToFahr } from '../helpers';

const VerticalBar = props => {
  const newLabels = props.data.map(label => timeOfDay(label.dt_txt))
  const newData = props.data.map(temp => temp.main.temp)
  const [temps, setTemps] = useState([]);

  useEffect(() => {
    if(props.currentTempUnit !== 'celsius') {
      const data = props.data.map(temp => celsiusToFahr(temp.main.temp))
      setTemps(data)
    } else {
      setTemps(newData)
    }
  }, [props.currentTempUnit, props.data]);

  const data = {
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
        <h4 className='title' data-test-id="chart-title">Hourly Data for {dayOfWeek(props.data[0].dt)}</h4>
      </div>
      <Bar data={data} options={options} className="font-fam"/>
    </div>
  )
};

export default VerticalBar;