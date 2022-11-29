'use strict';
const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.DB_HOST || "sql6.freemysqlhosting.net",
  user: process.env.DB_USER || "sql6581337",
  password: process.env.DB_PASSWORD || "cg5PjRqaJI",
  database: process.env.DB_NAME || "sql6581337"
});

module.exports = db
