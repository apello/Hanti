const pool = require('../../config/database');

export default async function handler(req, res) {
  try {
    // Test database connection
    const result = await pool.query('SELECT NOW() as current_time, version() as postgres_version');
    
    res.status(200).json({
      message: 'Database connection successful',
      timestamp: result.rows[0].current_time,
      postgres_version: result.rows[0].postgres_version,
      status: 'connected'
    });

  } catch (error) {
    console.error('Database test error:', error);
    res.status(500).json({ 
      message: 'Database connection failed',
      error: error.message,
      status: 'disconnected'
    });
  }
}
