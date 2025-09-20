-- Property Listings Database Schema
-- BuyRentKenya Scraped Data (IDs 1-10)

-- Create property_listings table
CREATE TABLE IF NOT EXISTS property_listings (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    price VARCHAR(100) NOT NULL,
    location VARCHAR(1000) NOT NULL,
    bedrooms INTEGER,
    bathrooms INTEGER,
    area VARCHAR(100),
    property_type VARCHAR(50) NOT NULL,
    transaction_type VARCHAR(20) NOT NULL,
    url TEXT UNIQUE NOT NULL,
    scraped_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create property_images table
CREATE TABLE IF NOT EXISTS property_images (
    id SERIAL PRIMARY KEY,
    property_id INTEGER REFERENCES property_listings(id) ON DELETE CASCADE,
    image_path VARCHAR(500) NOT NULL,
    image_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_property_listings_property_type ON property_listings(property_type);
CREATE INDEX IF NOT EXISTS idx_property_listings_transaction_type ON property_listings(transaction_type);
CREATE INDEX IF NOT EXISTS idx_property_listings_bedrooms ON property_listings(bedrooms);
CREATE INDEX IF NOT EXISTS idx_property_listings_created_at ON property_listings(created_at);
CREATE INDEX IF NOT EXISTS idx_property_images_property_id ON property_images(property_id);

-- Insert scraped data from BuyRentKenya (IDs 1-10)

-- Property 1: 4 Bedroom Townhouse in Spring Valley
INSERT INTO property_listings (id, title, price, location, bedrooms, bathrooms, area, property_type, transaction_type, url, scraped_at) VALUES
(1, '4 Bedroom Property', 'KSh 78,000,000', '4 Bed Townhouse with En Suite at Spring Valley - Shanzu Road | BuyRentKenya', 4, 4, 'N/A', 'Townhouse', 'Sale', 'https://www.buyrentkenya.com/listings/4-bedroom-townhouse-for-sale-spring-valley-3844840', '2025-09-16T11:27:29.983183'::timestamp);

-- Property 2: 5 Bedroom House in Karai
INSERT INTO property_listings (id, title, price, location, bedrooms, bathrooms, area, property_type, transaction_type, url, scraped_at) VALUES
(2, '5 Bedroom Property', 'KSh 22,000,000', '5 Bed House with En Suite at Karai', 4, 4, 'N/A', 'House', 'Sale', 'https://www.buyrentkenya.com/listings/5-bedroom-house-for-sale-kikuyu-town-3843680', '2025-09-16T11:27:29.983185'::timestamp);

-- Property 3: 4 Bedroom Villa in Loresho Ridge
INSERT INTO property_listings (id, title, price, location, bedrooms, bathrooms, area, property_type, transaction_type, url, scraped_at) VALUES
(3, '4 Bedroom Property', 'KSh 135,000,000', '4 Bed Villa with En Suite at Loresho Ridge', 4, 5, 'N/A', 'Villa', 'Sale', 'https://www.buyrentkenya.com/listings/4-bedroom-villa-for-sale-loresho-3842712', '2025-09-16T11:27:29.983186'::timestamp);

-- Property 4: 2 Bedroom House for Rent in Karen
INSERT INTO property_listings (id, title, price, location, bedrooms, bathrooms, area, property_type, transaction_type, url, scraped_at) VALUES
(4, '2 Bedroom Property', 'KSh 140,000 / month', '2 Bed House with En Suite at Karen | BuyRentKenya', 2, 2, 'N/A', 'House', 'Rent', 'https://www.buyrentkenya.com/listings/2-bedroom-house-for-rent-karen-3843889', '2025-09-16T11:27:29.983188'::timestamp);

-- Property 6: 4 Bedroom House in Ruiru-Kiambu Road
INSERT INTO property_listings (id, title, price, location, bedrooms, bathrooms, area, property_type, transaction_type, url, scraped_at) VALUES
(6, '4 Bedroom Property', 'KSh 32,450,000', '4 Bed House with En Suite at Ruiru-Kiambu Road', 5, 5, 'N/A', 'House', 'Sale', 'https://www.buyrentkenya.com/listings/4-bedroom-house-for-sale-kiambu-road-3845280', '2025-09-16T11:27:29.983188'::timestamp);

-- Property 9: 5 Bedroom Townhouse in Lavington
INSERT INTO property_listings (id, title, price, location, bedrooms, bathrooms, area, property_type, transaction_type, url, scraped_at) VALUES
(9, '5 Bedroom Property', 'KSh 81,000,000', '5 Bed Townhouse with En Suite in Lavington | BuyRentKenya', 4, 6, 'N/A', 'Townhouse', 'Sale', 'https://www.buyrentkenya.com/listings/5-bedroom-townhouse-for-sale-lavington-3845223', '2025-09-16T11:27:29.983190'::timestamp);

-- Property 10: 4 Bedroom Townhouse in Lavington
INSERT INTO property_listings (id, title, price, location, bedrooms, bathrooms, area, property_type, transaction_type, url, scraped_at) VALUES
(10, '4 Bedroom Property', 'KSh 72,000,000', '4 Bed Townhouse with En Suite in Lavington | BuyRentKenya', 4, 5, 'N/A', 'Townhouse', 'Sale', 'https://www.buyrentkenya.com/listings/4-bedroom-townhouse-for-sale-lavington-3845224', '2025-09-16T11:27:29.983190'::timestamp);