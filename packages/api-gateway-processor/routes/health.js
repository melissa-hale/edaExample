function healthCheck(req, res) {
    // Additional logic for checking the health can be added here
    res.status(200).send({ status: 'ok' });
}

module.exports = healthCheck;
