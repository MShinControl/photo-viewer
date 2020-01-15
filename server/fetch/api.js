require('dotenv').config();
const fetch = require('node-fetch');
const apiUrl = process.env.API_URL;

const pool = {};

pool.apiCall = async () => {
  try {
    let res = await (await fetch(apiUrl)).text();
    res = res.split('\n')
    return res;
  } catch (error) {
    return error ? console.error(error) : null;
  }
}

module.exports = pool;