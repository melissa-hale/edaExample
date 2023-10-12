import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [service1Requests, setService1Requests] = useState(0);
  const [service2Requests, setService2Requests] = useState(0);

  const sendRequests = (service, count) => {
    // Define the API endpoint (adjust the URL as needed)
    const API_ENDPOINT = process.env.REACT_APP_API_GATEWAY;
    console.log(API_ENDPOINT)

    for (let i = 0; i < count; i++) {
      axios.post(`${API_ENDPOINT}/events`, {
        eventType: service,
      }).then(() => {
        console.log(`Request to ${service} sent successfully!`);
      }).catch((error) => {
        console.error(`Failed to send request to ${service}:`, error);
      });
    }
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
          requests to Service1
        </label>
        <button onClick={() => sendRequests('service1', service1Requests)}>Submit</button>
      </div>
      <div>
        <label>
          Send 
          <input 
            type="number" 
            value={service2Requests} 
            onChange={(e) => setService2Requests(e.target.value)}
          /> 
          requests to Service2
        </label>
        <button onClick={() => sendRequests('service2', service2Requests)}>Submit</button>
      </div>
    </div>
  );
}

export default App;
