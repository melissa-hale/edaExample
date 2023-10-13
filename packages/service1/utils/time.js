function getDiffInMs(created, processed) {
    const createDate = new Date(created);
    const processedAt = new Date(processed);

    return processedAt - createDate;
}

module.exports = {
    getDiffInMs
};