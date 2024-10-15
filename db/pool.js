const { Pool } = require("pg");
require("dotenv").config();

if (process.env.NODE_ENV === "development") {
  module.exports = new Pool({
    connectionString: process.env.LOCAL_DATABASE_URL,
  });
} else {
  module.exports = new Pool({
    connectionString: process.env.EXTERNAL_DATABASE_URL,
    ssl: {
      require: true,
    },
  });
}
