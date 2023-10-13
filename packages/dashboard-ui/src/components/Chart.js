import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const Chart = ({ data, title }) => {
    return (
        <div>
            <h2>{title}</h2>
            <LineChart width={600} height={300} data={data}>
                <Line type="monotone" dataKey="averageTimeMs" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="total" stroke="#82ca9d" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
            </LineChart>
        </div>
    );
}

export default Chart;
