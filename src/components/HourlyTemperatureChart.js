import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

export default function HourlyTemperatureChart({ data }) {
  return (
    <div>
      <h2>Hourly temperature forecast (next 48 hours)</h2>
      <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="temp" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="time" tickFormatter={unixTimeToDateTimeString} />
        <YAxis />
        <Tooltip labelFormatter={unixTimeToDateTimeString} formatter={t => t + 'C'} />
      </LineChart>
    </div>
  );
}

const unixTimeToDateTimeString = (t) => {
  const dt = new Date(t * 1000);
  return dt.toLocaleDateString() + ' ' + dt.toLocaleTimeString();
}
