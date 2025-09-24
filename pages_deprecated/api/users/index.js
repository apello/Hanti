const pool = require('../../../config/database');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Get all users (for testing purposes)
      const result = await pool.query(
        'SELECT id, username, email FROM users ORDER BY id DESC'
      );

      res.status(200).json({
        message: 'Users retrieved successfully',
        users: result.rows,
        count: result.rows.length
      });

    } catch (error) {
      console.error('Get users error:', error);
      res.status(500).json({ 
        message: 'Internal server error' 
      });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
