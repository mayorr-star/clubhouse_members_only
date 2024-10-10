const getYear = () => new Date().getFullYear();
const getDate = () => new Date().toLocaleDateString();
const getTime = () => new Date().toLocaleTimeString()

module.exports = { getYear, getDate, getTime };
