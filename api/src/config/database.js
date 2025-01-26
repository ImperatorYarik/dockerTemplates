const mysql = require('mysql2/promise');
require('dotenv').config({ path: './src/.env' });

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'node_api',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function connectDB() {
  try {
    await pool.getConnection();
    console.log('Connected to the database');
  } catch (err) {
    console.error('Failed to connect to the database:', err);
    throw err;
  }
}

module.exports = { pool, connectDB };