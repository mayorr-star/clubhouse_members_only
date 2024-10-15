const { Pool } = require("pg");
require('dotenv').config()

let connection = null;

if (process.env.NODE_ENV === "development") {
  connection = process.env.LOCAL_DATABASE_URL;
} else {
  connection = process.env.DATABASE_URL;
}

module.exports = new Pool({
  connectionString: connection,
});