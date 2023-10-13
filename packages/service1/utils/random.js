const axios = require('axios');
const { RANDOM_WORD_API } = require('../config');

async function getRandomWord() {
    try {
        const response = await axios.get(RANDOM_WORD_API);
        return response.data[0];
    } catch (error) {
        console.error("Error making API call:", error);
        throw error;
    }
};

module.exports = {
    getRandomWord
};