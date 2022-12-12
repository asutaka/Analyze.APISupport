'use strict';
const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.DB_HOST || "db4free.net",
  user: process.env.DB_USER || "asutaka",
  password: process.env.DB_PASSWORD || "7sm.!_zDHSvgQ33",
  database: process.env.DB_NAME || "analyze12354"
});

module.exports = db
