// models/db.js
const mysql = require('mysql2');
require('dotenv').config(); // Load environment variables from .env file

// Create a pool connection to your local MySQL database 
const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306, // Default to MySQL's default port if not specified

  });
  
  if (process.env.NODE_ENV !== 'production') {
    console.log('Environment variables loaded');
  }


//const connection = mysql.createPool(process.env.JAWSDB_URL);

module.exports = connection.promise();
