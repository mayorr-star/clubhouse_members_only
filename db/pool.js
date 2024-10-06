const { Pool} = require('pg');
require('dotenv').config();

let connectionURI = null;

if (process.env.NODE_ENV === 'development') {
    connectionURI = process.env.LOCAL_DATABASE_URL;
} else {
    connectionURI = process.env.PUBLIC_DATABASE_URL;
}

module.exports = new Pool({
    connectionString: connectionURI
})