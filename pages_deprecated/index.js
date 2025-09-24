import { useState, useEffect } from 'react';

export default function Home() {
  const [dbStatus, setDbStatus] = useState('Checking...');
  const [users, setUsers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Test database connection
    fetch('/api/test')
      .then(res => res.json())
      .then(data => {
        setDbStatus(data.message === 'Database connection successful' ? 'Connected ✅' : 'Disconnected ❌');
      })
      .catch(err => {
        setDbStatus('Error ❌');
      });

    // Fetch users
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data.users || []);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
      });

    // Fetch properties
    fetch('/api/properties')
      .then(res => res.json())
      .then(data => {
        setProperties(data.properties || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching properties:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '20px',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <header style={{ 
        backgroundColor: '#2c3e50', 
        color: 'white', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        <h1>🏠 Hanti Property Database Dashboard</h1>
        <p>Property Management System with Image Gallery</p>
      </header>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '20px',
        marginBottom: '20px'
      }}>
        {/* Database Status Card */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2>📊 Database Status</h2>
          <p style={{ 
            fontSize: '18px', 
            fontWeight: 'bold',
            color: dbStatus.includes('Connected') ? '#27ae60' : '#e74c3c'
          }}>
            {dbStatus}
          </p>
        </div>

        {/* Properties Count Card */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2>🏠 Properties</h2>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#3498db' }}>
            {loading ? 'Loading...' : properties.length}
          </p>
        </div>

        {/* Users Count Card */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2>👥 Users</h2>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#9b59b6' }}>
            {loading ? 'Loading...' : users.length}
          </p>
        </div>
      </div>

      {/* Properties List */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '20px'
      }}>
        <h2>🏠 Property Listings with Images</h2>
        {loading ? (
          <p>Loading properties...</p>
        ) : properties.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
            {properties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <p>No properties found</p>
        )}
      </div>

      {/* API Endpoints */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginTop: '20px'
      }}>
        <h2>🔗 Available API Endpoints</h2>
        <div style={{ display: 'grid', gap: '10px' }}>
          <div>
            <strong>GET</strong> <code>/api/test</code> - Database connection test
          </div>
          <div>
            <strong>GET</strong> <code>/api/users</code> - List all users
          </div>
          <div>
            <strong>GET</strong> <code>/api/properties</code> - List all properties with image counts
          </div>
          <div>
            <strong>GET</strong> <code>/api/properties/images</code> - List all property images
          </div>
          <div>
            <strong>GET</strong> <code>/api/properties/images?property_id=1</code> - Images for specific property
          </div>
          <div>
            <strong>GET</strong> <code>/api/images/id1_Images/image.jpg</code> - Serve property images
          </div>
          <div>
            <strong>POST</strong> <code>/api/auth/login</code> - User login
          </div>
          <div>
            <strong>POST</strong> <code>/api/auth/signup</code> - User registration
          </div>
        </div>
      </div>

      <footer style={{ 
        textAlign: 'center', 
        marginTop: '40px', 
        padding: '20px',
        color: '#7f8c8d'
      }}>
        <p>Hanti Property Database System - Built with Next.js & Supabase</p>
        <p>Property images are now displayed as actual images! 🖼️</p>
      </footer>
    </div>
  );
}

// Property Card Component
function PropertyCard({ property }) {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadingImages, setLoadingImages] = useState(true);

  useEffect(() => {
    // Fetch images for this property
    fetch(`/api/properties/images?property_id=${property.id}`)
      .then(res => res.json())
      .then(data => {
        setImages(data.images || []);
        setLoadingImages(false);
      })
      .catch(err => {
        console.error('Error fetching images:', err);
        setLoadingImages(false);
      });
  }, [property.id]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div style={{
      border: '1px solid #e9ecef',
      borderRadius: '8px',
      overflow: 'hidden',
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s ease-in-out',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      {/* Image Section */}
      <div style={{ position: 'relative', height: '250px', backgroundColor: '#f8f9fa' }}>
        {loadingImages ? (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100%',
            color: '#6c757d'
          }}>
            Loading images...
          </div>
        ) : images.length > 0 ? (
          <>
            <img
              src={`/api/images/${images[currentImageIndex]?.image_path}`}
              alt={property.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              backgroundColor: '#f8f9fa',
              color: '#6c757d'
            }}>
              Image not found
            </div>
            
            {/* Image Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  style={{
                    position: 'absolute',
                    left: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  ‹
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  ›
                </button>
                
                {/* Image Counter */}
                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '10px',
                  background: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px'
                }}>
                  {currentImageIndex + 1} / {images.length}
                </div>
              </>
            )}
          </>
        ) : (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100%',
            color: '#6c757d'
          }}>
            No images available
          </div>
        )}
      </div>

      {/* Property Details */}
      <div style={{ padding: '15px' }}>
        <h3 style={{ 
          margin: '0 0 8px 0', 
          fontSize: '18px',
          color: '#2c3e50'
        }}>
          {property.title}
        </h3>
        
        <div style={{ 
          fontSize: '20px', 
          fontWeight: 'bold', 
          color: '#e74c3c',
          marginBottom: '8px'
        }}>
          {property.price}
        </div>
        
        <div style={{ 
          color: '#7f8c8d', 
          fontSize: '14px',
          marginBottom: '8px'
        }}>
          📍 {property.location.split('|')[0].trim()}
        </div>
        
        <div style={{ 
          display: 'flex', 
          gap: '15px', 
          fontSize: '14px',
          color: '#6c757d',
          marginBottom: '8px'
        }}>
          <span>🛏️ {property.bedrooms} bed</span>
          <span>🚿 {property.bathrooms} bath</span>
          <span style={{
            backgroundColor: property.transaction_type === 'Sale' ? '#27ae60' : '#3498db',
            color: 'white',
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '12px'
          }}>
            {property.transaction_type}
          </span>
        </div>
        
        <div style={{ 
          fontSize: '12px',
          color: '#95a5a6'
        }}>
          {property.image_count} images available
        </div>
      </div>
    </div>
  );
}
