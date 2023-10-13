const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const corsOptions = {
    origin: ['http://localhost:3001', `https://${process.env.FRONTEND_PUBLIC_DOMAIN}`],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

const healthCheck = require('./routes/health');
const { sendEvent } = require('./routes/events');

app.get('/health', healthCheck);
app.post('/events', sendEvent);

app.listen(PORT, () => {
    console.log(`API Gateway running on port: ${PORT}`);
});
