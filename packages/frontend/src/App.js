import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [service1Requests, setService1Requests] = useState(0);
  const [service2Requests, setService2Requests] = useState(0);

  const sendRequests = (event, count) => {
    // Define the API endpoint (adjust the URL as needed)
    const API_ENDPOINT = process.env.REACT_APP_API_GATEWAY;

    // for (let i = 0; i < count; i++) {
      axios.post(`https://${API_ENDPOINT}/events`, {
        eventType: event, count: count
      }).then(() => {
        console.log(`${count} ${event} request(s) sent successfully!`);
      }).catch((error) => {
        console.error(`Failed to send ${count} ${event} request(s):`, error);
      });
    // }
  };

  return (
    <div className="App">
      <div>
        <label>
          Send 
          <input 
            type="number" 
            value={service1Requests} 
            onChange={(e) => setService1Requests(e.target.value)}
          /> 
          passive event(s)
        </label>
        <button onClick={() => sendRequests('passiveEvent', service1Requests)}>Submit</button>
      </div>
      <div>
        <label>
          Send 
          <input 
            type="number" 
            value={service2Requests} 
            onChange={(e) => setService2Requests(e.target.value)}
          /> 
          action event(s)
        </label>
        <button onClick={() => sendRequests('actionEvent', service2Requests)}>Submit</button>
      </div>
    </div>
  );
}

export default App;
