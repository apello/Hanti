-- 006_property_listings.sql
-- Property Listings Migration for BuyRentKenya Scraped Data

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

-- Create updated_at trigger for property_listings
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_property_listings_updated_at ON property_listings;
CREATE TRIGGER update_property_listings_updated_at
    BEFORE UPDATE ON property_listings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert scraped data from BuyRentKenya (IDs 1-10)
INSERT INTO property_listings (id, title, price, location, bedrooms, bathrooms, area, property_type, transaction_type, url, scraped_at) VALUES
(1, '4 Bedroom Property', 'KSh 78,000,000', '4 Bed Townhouse with En Suite at Spring Valley - Shanzu Road | BuyRentKenya', 4, 4, 'N/A', 'Townhouse', 'Sale', 'https://www.buyrentkenya.com/listings/4-bedroom-townhouse-for-sale-spring-valley-3844840', '2025-09-16T11:27:29.983183'::timestamp),
(2, '5 Bedroom Property', 'KSh 22,000,000', '5 Bed House with En Suite at Karai', 4, 4, 'N/A', 'House', 'Sale', 'https://www.buyrentkenya.com/listings/5-bedroom-house-for-sale-kikuyu-town-3843680', '2025-09-16T11:27:29.983185'::timestamp),
(3, '4 Bedroom Property', 'KSh 135,000,000', '4 Bed Villa with En Suite at Loresho Ridge', 4, 5, 'N/A', 'Villa', 'Sale', 'https://www.buyrentkenya.com/listings/4-bedroom-villa-for-sale-loresho-3842712', '2025-09-16T11:27:29.983186'::timestamp),
(4, '2 Bedroom Property', 'KSh 140,000 / month', '2 Bed House with En Suite at Karen | BuyRentKenya', 2, 2, 'N/A', 'House', 'Rent', 'https://www.buyrentkenya.com/listings/2-bedroom-house-for-rent-karen-3843889', '2025-09-16T11:27:29.983188'::timestamp),
(6, '4 Bedroom Property', 'KSh 32,450,000', '4 Bed House with En Suite at Ruiru-Kiambu Road', 5, 5, 'N/A', 'House', 'Sale', 'https://www.buyrentkenya.com/listings/4-bedroom-house-for-sale-kiambu-road-3845280', '2025-09-16T11:27:29.983188'::timestamp),
(9, '5 Bedroom Property', 'KSh 81,000,000', '5 Bed Townhouse with En Suite in Lavington | BuyRentKenya', 4, 6, 'N/A', 'Townhouse', 'Sale', 'https://www.buyrentkenya.com/listings/5-bedroom-townhouse-for-sale-lavington-3845223', '2025-09-16T11:27:29.983190'::timestamp),
(10, '4 Bedroom Property', 'KSh 72,000,000', '4 Bed Townhouse with En Suite in Lavington | BuyRentKenya', 4, 5, 'N/A', 'Townhouse', 'Sale', 'https://www.buyrentkenya.com/listings/4-bedroom-townhouse-for-sale-lavington-3845224', '2025-09-16T11:27:29.983190'::timestamp)
ON CONFLICT (id) DO NOTHING;

-- Verification queries
SELECT 'Property Listings Migration Complete' as status, count(*) as total_properties FROM property_listings;
SELECT 'Properties by Type' as info, property_type, count(*) as count FROM property_listings GROUP BY property_type;
SELECT 'Properties by Transaction Type' as info, transaction_type, count(*) as count FROM property_listings GROUP BY transaction_type;
