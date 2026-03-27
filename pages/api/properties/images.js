const pool = require('../../../config/database');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { property_id } = req.query;

    try {
      let query, params;
      
      if (property_id) {
        // Get images for specific property
        query = `
          SELECT pi.*, p.title as property_title
          FROM property_images pi
          JOIN property_listings p ON pi.property_id = p.id
          WHERE pi.property_id = $1
          ORDER BY pi.image_order
        `;
        params = [property_id];
      } else {
        // Get all images with property info
        query = `
          SELECT pi.*, p.title as property_title, p.property_type
          FROM property_images pi
          JOIN property_listings p ON pi.property_id = p.id
          ORDER BY pi.property_id, pi.image_order
        `;
        params = [];
      }

      const result = await pool.query(query, params);

      res.status(200).json({
        message: 'Property images retrieved successfully',
        images: result.rows,
        count: result.rows.length
      });

    } catch (error) {
      console.error('Get property images error:', error);
      res.status(500).json({ 
        message: 'Internal server error',
        error: error.message
      });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
