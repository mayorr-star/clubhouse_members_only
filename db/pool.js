const { Pool} = require('pg');
require('dotenv').config();

module.exports = new Pool({
    ssl: process.env.NODE_ENV === "production"
})