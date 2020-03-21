/**
 * ************************************
 *
 * @module db.js
 * @description Connects server to PostgreSQL Database. URI is held in .env file.
 *
 * ************************************
 */

//Configuration for .env file
require('dotenv').config();

const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

//Sets URI in .env to variable
const URI = process.env.URI;
//Sets SQL query table to variable
const SQL = fs.readFileSync(path.join(__dirname, './queries.sql')).toString();

//Creates Pool using URI.
const pool = new Pool({ connectionString: URI });

//Connects to database using SQL CREATE string.
pool.connect(async (err) => {
  if(err) console.log('Cannot Connect to Database');
  else await pool.query(SQL);

  console.log('Connected to PG Database');
});

module.exports = pool;