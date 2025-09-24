const pool = require('../../../config/database');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Get all properties with image counts
      const result = await pool.query(`
        SELECT 
          p.id,
          p.title,
          p.price,
          p.location,
          p.bedrooms,
          p.bathrooms,
          p.area,
          p.property_type,
          p.transaction_type,
          p.url,
          p.scraped_at,
          p.created_at,
          COUNT(pi.id) as image_count
        FROM property_listings p
        LEFT JOIN property_images pi ON p.id = pi.property_id
        GROUP BY p.id, p.title, p.price, p.location, p.bedrooms, p.bathrooms, p.area, p.property_type, p.transaction_type, p.url, p.scraped_at, p.created_at
        ORDER BY p.id
      `);

      res.status(200).json({
        message: 'Properties retrieved successfully',
        properties: result.rows,
        count: result.rows.length
      });

    } catch (error) {
      console.error('Get properties error:', error);
      res.status(500).json({ 
        message: 'Internal server error',
        error: error.message
      });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
