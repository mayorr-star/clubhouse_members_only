#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, firstname VARCHAR (100), lastname VARCHAR(100), email VARCHAR(100), password VARCHAR(100), membership_status BOOLEAN DEFAULT FALSE, admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, title VARCHAR(100), message TEXT, date TIMESTAMP, user_id INTEGER);

`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.argv[2],
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
