import axios from 'axios';

const DASHBOARD_API_URL = process.env.DASHBOARD_API_URL || "dashboard-api-production-c497.up.railway.app";
console.log(DASHBOARD_API_URL)

export const fetchTopicData = async (topic) => {
  try {
    const resp = await axios.get(
      `https://${DASHBOARD_API_URL}/api/topicRequestMetrics?topic=${topic}`
    );
    const pgResponse = resp.data;
    const totalMessages = pgResponse.length;
    const sum = pgResponse.reduce(
      (accumulator, currentObj) =>
        accumulator + (currentObj.total_time_ms || 0),
      0
    );
    const average = sum / totalMessages;
    const currentTime = new Date().toLocaleTimeString();

    return {
      time: currentTime,
      averageTimeMs: average,
      total: totalMessages,
    };
  } catch (error) {
    console.error(`Error fetching data for ${topic}:`, error);
    return null;
  }
};
