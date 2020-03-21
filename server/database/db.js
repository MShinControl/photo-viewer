const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const URI = 'postgres://pvvqmtjc:d8TtjYTuwG-_h44IkMH-4D5bK3ycH6rt@drona.db.elephantsql.com:5432/pvvqmtjc';
const SQL = fs.readFileSync(path.join(__dirname, './queries.sql')).toString();

const pool = new Pool({ connectionString: URI });


pool.connect(async (err) => {
  if(err) console.log('Cannot Connect to Database');
  else await pool.query(SQL);
});

module.exports = pool;