import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import './App.css';

const DASHBOARD_API_URL = process.env.DASHBOARD_API_URL || 'dashboard-api-production-c497.up.railway.app';

function Dashboard() {
  const [pgData, setpgData] = useState([]);
  const [rabbitData, setRabbitData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const pgResponse = await axios.get(`https://${DASHBOARD_API_URL}/api/totalTopic1Requests`);
      const rabbitResponse = await axios.get(`https://${DASHBOARD_API_URL}/api/rabbitmqTopic1Metrics`);
      const currentTime = new Date().toLocaleTimeString();

      setpgData(prevData => [...prevData, { time: currentTime, requests: pgResponse.data.count }]);
      setRabbitData(prevData => [...prevData, { time: currentTime, queueLength: rabbitResponse.data.queueLength }]);

      if (pgData.length > 10) {
        setpgData(pgData.slice(pgData.length - 10));
      }

      if (rabbitData.length > 10) {
        setRabbitData(rabbitData.slice(rabbitData.length - 10));
      }

      setLoading(false);

    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Dashboard</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <h2>PostgreSQL Data</h2>
            <LineChart width={600} height={300} data={pgData}>
              <Line type="monotone" dataKey="requests" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
            </LineChart>

            <h2>RabbitMQ Data</h2>
            <LineChart width={600} height={300} data={rabbitData}>
              <Line type="monotone" dataKey="queueLength" stroke="#82ca9d" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </div>
        )}
      </header>
    </div>
  );
}

export default Dashboard;
