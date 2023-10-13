const express = require('express');
const cors = require('cors');

const app = express();
const corsOptions = {
    origin: ['http://localhost:3005', `https://${process.env.DASHBOARD_PUBLIC_DOMAIN}`],
    optionsSuccessStatus: 200
};
console.log(process.env.DASHBOARD_PUBLIC_DOMAIN);
app.use(cors(corsOptions));
const port = process.env.PORT;

const { getPgData } = require('./routes/pg');
const { getRmqData } = require('./routes/rmq');

app.get('/api/topicRequestMetrics', getPgData);
app.get('/api/rabbitmqMetrics', getRmqData);

app.listen(port, () => {
    console.log(`Dashboard API listening at port :${port}`);
});
