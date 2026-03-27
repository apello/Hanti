import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const { path: imagePath } = req.query;
  
  if (!imagePath || !Array.isArray(imagePath)) {
    return res.status(400).json({ message: 'Invalid image path' });
  }

  try {
    // Construct the full path to the image
    const fullPath = path.join(process.cwd(), 'Webs', 'buyrentkenya_data', ...imagePath);
    
    console.log('Looking for image at:', fullPath);
    
    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      console.log('File not found:', fullPath);
      return res.status(404).json({ message: 'Image not found', path: fullPath });
    }

    // Get file stats
    const stats = fs.statSync(fullPath);
    
    // Set appropriate headers
    const ext = path.extname(fullPath).toLowerCase();
    let contentType = 'image/jpeg'; // default
    
    switch (ext) {
      case '.jpg':
      case '.jpeg':
        contentType = 'image/jpeg';
        break;
      case '.png':
        contentType = 'image/png';
        break;
      case '.webp':
        contentType = 'image/webp';
        break;
      case '.gif':
        contentType = 'image/gif';
        break;
    }

    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Length', stats.size);
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year

    // Stream the file
    const fileStream = fs.createReadStream(fullPath);
    fileStream.pipe(res);

  } catch (error) {
    console.error('Image serving error:', error);
    res.status(500).json({ message: 'Error serving image', error: error.message });
  }
}
