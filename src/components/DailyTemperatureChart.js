import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

export default function DailyTemperatureChart({ data }) {
  return (
    <div>
      <h2>Daily temperature forecast (next 7 days)</h2>
      <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="minTemp" stroke="#0000ff" />
        <Line type="monotone" dataKey="maxTemp" stroke="#ff0000" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="time" tickFormatter={unixTimeToDateString} />
        <YAxis />
        <Tooltip labelFormatter={unixTimeToDateString} formatter={t => t + 'C'} />
      </LineChart>
    </div>
  );
}

const unixTimeToDateString = (t) => {
  const dt = new Date(t * 1000);
  return dt.toLocaleDateString();
}
