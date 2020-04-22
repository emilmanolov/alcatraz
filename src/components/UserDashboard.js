import React, { useEffect, useState } from 'react';

import HourlyTemperatureChart from './HourlyTemperatureChart';
import DailyTemperatureChart from './DailyTemperatureChart';

import { loadWeatherData } from '../backend';

export default function UserDashboard(props) {
  const [weatherData, setWeatherData] = useState();
  const [loadingStatus, setLoadingStatus] = useState('');

  function handleGetWeatherData() {
    setLoadingStatus('Loading weather data...');
    setWeatherData();

    loadWeatherData()
      .then((data) => {
        setWeatherData(data);
        setLoadingStatus('');
      })
      .catch(() => {
        setLoadingStatus('Unable to load weather data');
      });
  }

  useEffect(() => {
    handleGetWeatherData();
  }, []);

  return(
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleGetWeatherData} disabled={loadingStatus} >Refresh</button>
      {weatherData
        ? <>
            <HourlyTemperatureChart data={transformHourlyTemperatureData(weatherData)} />
            <DailyTemperatureChart data={transformDailyTemperatureData(weatherData)} />
          </>
        : <p>{loadingStatus}</p>
      }
    </div>
  );
}

function transformHourlyTemperatureData (data) {
  return data.hourly.map(({dt, temp}) => ({
    time: dt,
    temp: temp,
  }));
}

function transformDailyTemperatureData (data) {
  return data.daily.map(d => ({
    time: d.dt,
    minTemp: d.temp.min,
    maxTemp: d.temp.max
  }));
}
