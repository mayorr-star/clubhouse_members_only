const { Pool } = require("pg");
require("dotenv").config();

let connectionString = null;

if (process.env.NODE_ENV === "development") {
  connectionString = process.env.LOCAL_DATABASE_URL;
} else {
  connectionString = process.env.EXTERNAL_DATABASE_URL;
}

module.exports = new Pool({
  connectionString: connectionString,
  ssl: { require: true },
});
