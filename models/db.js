// models/db.js
const mysql = require('mysql2');
require('dotenv').config(); // Load environment variables from .env file (Create a .env file to store your db keys)

// Create a pool connection to your local MySQL database USE This if you are using local mysql
const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306, // Default to MySQL's default port if not specified
  });

//const connection = mysql.createPool(process.env.JAWSDB_URL);  //Use this if you are using JAWS db

module.exports = connection.promise();
