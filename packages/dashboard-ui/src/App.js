import React, { useState, useEffect, useCallback } from "react";
import { fetchTopicData } from "./api/dashboard";
import ChartComponent from "./components/Chart";
import "./App.css";


function Dashboard() {
  const [data, setData] = useState({
    topic1: [],
    topic2: [],
    topic3: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchAllTopics = useCallback(async () => {
    const topic1Data = await fetchTopicData("topic1");
    const topic2Data = await fetchTopicData("topic2");
    const topic3Data = await fetchTopicData("topic3");

    setData((prevData) => ({
      topic1: updateData(prevData.topic1, topic1Data),
      topic2: updateData(prevData.topic2, topic2Data),
      topic3: updateData(prevData.topic3, topic3Data),
    }));

    setLoading(false);
  }, []);

  const updateData = (prevData, newData) => {
    const updatedData = [...prevData, newData];
    return updatedData.length > 10
      ? updatedData.slice(updatedData.length - 10)
      : updatedData;
  };

  useEffect(() => {
    fetchAllTopics();
    const interval = setInterval(fetchAllTopics, 5000);
    return () => clearInterval(interval);
  }, [fetchAllTopics]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Dashboard</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <ChartComponent data={data.topic1} title="Topic 1 Data" />
            <ChartComponent data={data.topic2} title="Topic 2 Data" />
            <ChartComponent data={data.topic3} title="Topic 3 Data" />
          </div>
        )}
      </header>
    </div>
  );
}

export default Dashboard;
