-- 007_complete_property_system.sql
-- Complete Property System Migration - All Tables and Data

-- Enable PostGIS extensions (if not already enabled)
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS postgis_topology;
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- Create profiles table (if not exists)
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  full_name text,
  phone text,
  country_code text NOT NULL DEFAULT 'KE',
  is_admin boolean NOT NULL DEFAULT false
);

-- Create users table (legacy)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(32) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

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

-- Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  role VARCHAR(50) DEFAULT 'team_member',
  access_level VARCHAR(20) DEFAULT 'full',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

-- Create all indexes
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

CREATE INDEX IF NOT EXISTS idx_profiles_updated_at ON public.profiles (updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_is_admin ON public.profiles (is_admin);
CREATE INDEX IF NOT EXISTS idx_profiles_country_code ON public.profiles (country_code);

CREATE INDEX IF NOT EXISTS idx_property_listings_property_type ON property_listings(property_type);
CREATE INDEX IF NOT EXISTS idx_property_listings_transaction_type ON property_listings(transaction_type);
CREATE INDEX IF NOT EXISTS idx_property_listings_bedrooms ON property_listings(bedrooms);
CREATE INDEX IF NOT EXISTS idx_property_listings_created_at ON property_listings(created_at);
CREATE INDEX IF NOT EXISTS idx_property_images_property_id ON property_images(property_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers
DROP TRIGGER IF EXISTS update_property_listings_updated_at ON property_listings;
CREATE TRIGGER update_property_listings_updated_at
    BEFORE UPDATE ON property_listings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_profiles_updated_at ON public.profiles;
CREATE TRIGGER trg_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Insert sample users data
INSERT INTO users (username, email, password_hash) VALUES
('abdi', 'abdi@gmail.com', '$2b$15$rQZ8K9vL8K9vL8K9vL8K9O'),
('yahya', 'yahya@gmail.com', '$2b$15$rQZ8K9vL8K9vL8K9vL8K9O'),
('admin', 'admin@hanti.com', '$2b$15$rQZ8K9vL8K9vL8K9vL8K9O')
ON CONFLICT (username) DO NOTHING;

-- Insert team members
INSERT INTO team_members (name, email, role, access_level) VALUES
('Abdi', 'abdi@gmail.com', 'admin', 'admin'),
('Yahya', 'yahya@gmail.com', 'developer', 'full'),
('Team Member 1', 'member1@hanti.com', 'analyst', 'readonly'),
('Team Member 2', 'member2@hanti.com', 'developer', 'full')
ON CONFLICT (email) DO NOTHING;

-- Insert property listings data (BuyRentKenya scraped data)
INSERT INTO property_listings (id, title, price, location, bedrooms, bathrooms, area, property_type, transaction_type, url, scraped_at) VALUES
(1, '4 Bedroom Property', 'KSh 78,000,000', '4 Bed Townhouse with En Suite at Spring Valley - Shanzu Road | BuyRentKenya', 4, 4, 'N/A', 'Townhouse', 'Sale', 'https://www.buyrentkenya.com/listings/4-bedroom-townhouse-for-sale-spring-valley-3844840', '2025-09-16T11:27:29.983183'::timestamp),
(2, '5 Bedroom Property', 'KSh 22,000,000', '5 Bed House with En Suite at Karai', 4, 4, 'N/A', 'House', 'Sale', 'https://www.buyrentkenya.com/listings/5-bedroom-house-for-sale-kikuyu-town-3843680', '2025-09-16T11:27:29.983185'::timestamp),
(3, '4 Bedroom Property', 'KSh 135,000,000', '4 Bed Villa with En Suite at Loresho Ridge', 4, 5, 'N/A', 'Villa', 'Sale', 'https://www.buyrentkenya.com/listings/4-bedroom-villa-for-sale-loresho-3842712', '2025-09-16T11:27:29.983186'::timestamp),
(4, '2 Bedroom Property', 'KSh 140,000 / month', '2 Bed House with En Suite at Karen | BuyRentKenya', 2, 2, 'N/A', 'House', 'Rent', 'https://www.buyrentkenya.com/listings/2-bedroom-house-for-rent-karen-3843889', '2025-09-16T11:27:29.983188'::timestamp),
(6, '4 Bedroom Property', 'KSh 32,450,000', '4 Bed House with En Suite at Ruiru-Kiambu Road', 5, 5, 'N/A', 'House', 'Sale', 'https://www.buyrentkenya.com/listings/4-bedroom-house-for-sale-kiambu-road-3845280', '2025-09-16T11:27:29.983188'::timestamp),
(9, '5 Bedroom Property', 'KSh 81,000,000', '5 Bed Townhouse with En Suite in Lavington | BuyRentKenya', 4, 6, 'N/A', 'Townhouse', 'Sale', 'https://www.buyrentkenya.com/listings/5-bedroom-townhouse-for-sale-lavington-3845223', '2025-09-16T11:27:29.983190'::timestamp),
(10, '4 Bedroom Property', 'KSh 72,000,000', '4 Bed Townhouse with En Suite in Lavington | BuyRentKenya', 4, 5, 'N/A', 'Townhouse', 'Sale', 'https://www.buyrentkenya.com/listings/4-bedroom-townhouse-for-sale-lavington-3845224', '2025-09-16T11:27:29.983190'::timestamp)
ON CONFLICT (id) DO NOTHING;

-- Insert property images data
INSERT INTO property_images (property_id, image_path, image_order) VALUES
-- Property 1 Images
(1, 'id1_Images/04f49211-4586-4765-8aad-24f2919a24c1.jpg', 1),
(1, 'id1_Images/208ed780-e67d-4cc2-a1b0-0e35eabe78c3.jpg', 2),
(1, 'id1_Images/2daa352d-e058-4a36-86e2-91daaf29ca51.jpg', 3),
(1, 'id1_Images/2fec8b82-05ce-4779-aff4-da9c496121c3.jpg', 4),
(1, 'id1_Images/322469b7-e10a-4463-8edf-61bf24aeda48.jpg', 5),
(1, 'id1_Images/3ec2f7b8-37e4-42e8-a82c-87dda7345e99.jpg', 6),
(1, 'id1_Images/45e07b42-85a9-4d8c-ace1-f8127f5fb676.jpg', 7),
(1, 'id1_Images/46cfa6c4-3f46-40d4-a8d3-dd610a58b417.jpg', 8),
(1, 'id1_Images/4fef5e64-6168-4bd6-a640-314138d1ba42.jpg', 9),
(1, 'id1_Images/57648e83-e351-4fe5-bfd8-75cbd53cfd28.jpg', 10),
(1, 'id1_Images/60c295d7-c61e-483c-8c00-d04081f10093.jpg', 11),
(1, 'id1_Images/67ce0d88-b8f7-41f2-bf7d-bcab5e7ed03c.jpg', 12),
(1, 'id1_Images/705c28cb-8f7f-4b97-935c-03927118df9b-2.jpg', 13),
(1, 'id1_Images/705c28cb-8f7f-4b97-935c-03927118df9b.jpg', 14),
(1, 'id1_Images/7cff0475-03a7-4d9a-865c-9667d86d7338.jpg', 15),
(1, 'id1_Images/7ede1583-6787-42b8-ad66-45e077406837.jpg', 16),
(1, 'id1_Images/8401204d-a7e3-4bf8-9cf9-e897cd2e7e36-2.jpg', 17),
(1, 'id1_Images/8401204d-a7e3-4bf8-9cf9-e897cd2e7e36.jpg', 18),
(1, 'id1_Images/94c78496-f654-4470-9f18-d7e94c1b7826.jpg', 19),
(1, 'id1_Images/a44e4cca-e887-4cbc-ac3c-8a08aabd213e.jpg', 20),
(1, 'id1_Images/e069ca65-0a92-48f9-8336-27007cad60ed.jpg', 21),
(1, 'id1_Images/e3d2fb7b-d1e2-44a1-a3f9-b758e8dfeb1b.webp', 22),
-- Property 2 Images
(2, 'id2_Images/2ced50ea-f2d2-4037-915f-ecd47caef871.jpg', 1),
(2, 'id2_Images/3bb0c910-9ebe-4f18-9d69-092c76a0672b.jpeg', 2),
(2, 'id2_Images/7394c12c-c9fc-4d19-8c63-7a7974c7d245.jpg', 3),
(2, 'id2_Images/789b6871-be17-469b-a093-33f70d34d362.jpg', 4),
(2, 'id2_Images/89e76a0b-1ca8-4cc5-a414-8b28642b43b7.jpg', 5),
(2, 'id2_Images/94c58a36-d9fe-4afe-836c-b1fc74458c56.jpg', 6),
(2, 'id2_Images/aec62238-43c1-4264-afcf-7238bd591cf6.jpg', 7),
(2, 'id2_Images/e2bcb302-37be-4b87-a54c-779bec0490ad.jpg', 8),
(2, 'id2_Images/f7bb0c3b-d300-4288-9f76-cf5f1a60e557.jpg', 9),
(2, 'id2_Images/f8e5be1b-217e-47b7-a4cb-41cf7203c8f2.jpg', 10),
(2, 'id2_Images/fe1c71d9-65a7-453a-a22d-2cf1a0daab9d.png.jpeg', 11),
-- Property 3 Images
(3, 'id3_Images/2e0f8812-87a2-44c1-8e85-91d4021ba150-2.jpg', 1),
(3, 'id3_Images/2e0f8812-87a2-44c1-8e85-91d4021ba150.jpg', 2),
(3, 'id3_Images/30f2e564-2532-481c-91ef-0c98e831876d.jpg', 3),
(3, 'id3_Images/79febba4-4944-4c25-8683-fb1684c8e62e.JPG', 4),
(3, 'id3_Images/9c2ce280-7de1-4ea0-b653-17df6e75a62b.jpg', 5),
(3, 'id3_Images/9e072963-1eac-4e86-be3c-4aa0500620e4.jpg', 6),
(3, 'id3_Images/a98de5e7-53ea-47c4-ae38-738dcb3014a5.jpg', 7),
(3, 'id3_Images/bcf02a24-b49a-4c5c-9846-1566c9c97513.jpg', 8),
(3, 'id3_Images/e8cf20aa-1f4e-4f64-a736-bee2af70fce2.JPG', 9),
(3, 'id3_Images/f8f240f5-dbd8-4992-a6c1-fa8388c23167.jpg', 10),
-- Property 4 Images
(4, 'id4_Images/1a0e52d1-d55e-44c1-9da5-6b9b93b0463a.jpeg', 1),
(4, 'id4_Images/2dd7145a-13c3-4b09-9ee7-568e7aa73de9.jpeg', 2),
(4, 'id4_Images/3af4cfed-fe7d-4e26-a0e4-78b665f0ed97.jpeg', 3),
(4, 'id4_Images/3efdc286-925c-41ba-9d58-3aacf7543c00-2.jpeg', 4),
(4, 'id4_Images/3efdc286-925c-41ba-9d58-3aacf7543c00.jpeg', 5),
(4, 'id4_Images/47c9c66e-ef37-4886-b9c5-d68d18ba7796.jpeg', 6),
(4, 'id4_Images/83c652c4-1522-4bd7-95f2-ff841e4e112d.jpeg', 7),
(4, 'id4_Images/8cfd4539-21c4-4004-bdb9-cb9de59ee2cb.jpeg', 8),
(4, 'id4_Images/9dc9c235-e47f-4110-ae08-3689ddeca4d1.jpeg', 9),
(4, 'id4_Images/bbee2551-5108-4e75-9bd7-da748a3df863.jpeg', 10),
(4, 'id4_Images/bef14467-6236-4bbb-b84c-e67faf4aa7f2-2.jpeg', 11),
(4, 'id4_Images/bef14467-6236-4bbb-b84c-e67faf4aa7f2.jpeg', 12),
(4, 'id4_Images/fd7c1c1b-61ed-4363-aec7-ae403980aea7.jpeg', 13),
-- Property 6 Images
(6, 'id6_Images/22f0b45f-fbca-436f-bfbb-14dda60bf074.jpg', 1),
(6, 'id6_Images/3ca38a46-d837-44a3-9441-c5a8c5788cac.jpg', 2),
(6, 'id6_Images/40463063-49ae-4115-a182-7ded14a60814.jpg', 3),
(6, 'id6_Images/45eb270a-9770-4275-9590-6bdec6948631.jpg', 4),
(6, 'id6_Images/55f77acc-29e9-4c39-a0d7-50b06d82918e.jpg', 5),
(6, 'id6_Images/7655b8c8-afd7-46a1-ad0e-ca607625df28.jpg', 6),
(6, 'id6_Images/90e5f80a-d190-40a3-8fd7-8844f93aacdd.jpg', 7),
(6, 'id6_Images/a3a9da48-d0d8-4de7-9f47-280a3092ae16.jpg', 8),
(6, 'id6_Images/a76ba7e8-fdd8-4631-b223-70dbfb3bdb96.jpg', 9),
(6, 'id6_Images/a7a1e9f6-ba36-4280-8f50-1a5f82529985.jpg', 10),
(6, 'id6_Images/d44f9e71-b4c6-4bd0-9bd8-dbab57ad120a.webp', 11),
(6, 'id6_Images/e31b178c-75b8-4029-8fb0-be5f00593c4f.jpg', 12),
-- Property 9 Images
(9, 'id9_Images/0d6f8352-cbf4-4264-8835-df50b4aed84b.jpg', 1),
(9, 'id9_Images/3804fa6f-4bfc-4a60-bfef-5b3323b2d32d.webp', 2),
(9, 'id9_Images/3857cf0e-0d6a-4558-9fea-bd520d5fa718.jpg', 3),
(9, 'id9_Images/482bba85-79d5-4917-ae5f-3e271608f2d9.jpg', 4),
(9, 'id9_Images/52d7df0f-596a-4b6a-9a2d-a42a2e33eb8b.jpg', 5),
(9, 'id9_Images/58900504-b954-4703-87f5-c1f6277dde5d-2.jpg', 6),
(9, 'id9_Images/58900504-b954-4703-87f5-c1f6277dde5d.jpg', 7),
(9, 'id9_Images/86b4466c-8083-44cd-8303-6cff8a23d40b.jpg', 8),
(9, 'id9_Images/88400ef5-8c87-4553-91b1-cfa8e40abe75.webp', 9),
(9, 'id9_Images/b04c443c-58c9-4fcb-b430-d812961d01bc.jpg', 10),
(9, 'id9_Images/c4c3072e-9a1d-4815-afc8-6b54ee043412.jpg', 11),
(9, 'id9_Images/e1712ed6-9768-4df6-8457-d945645811bd.jpg', 12),
(9, 'id9_Images/f18a8b15-964a-466e-a8d6-4cebaf26096e.jpg', 13),
-- Property 10 Images
(10, 'id10_Images/0fc18cf3-36d2-41dd-a650-61181e99b045.jpg', 1),
(10, 'id10_Images/1c347f86-9bc9-44c1-b9ec-f52e6c510ee9.jpg', 2),
(10, 'id10_Images/4c54cd95-793c-4ca9-b685-235249435b93.jpg', 3),
(10, 'id10_Images/53d60251-7d26-4e2a-b3e4-ecd4c172d118.jpg', 4),
(10, 'id10_Images/5cfbbdfb-aa44-4836-8ff1-c6587e3d1b59.jpg', 5),
(10, 'id10_Images/5d29fad0-cbd9-4542-bb7e-529d4ce81c62.jpg', 6),
(10, 'id10_Images/5dfdadae-1de8-489c-83c6-1c726e61884e.jpg', 7),
(10, 'id10_Images/607a5bae-fd2a-49a4-85d5-3cb69959c668.jpg', 8),
(10, 'id10_Images/ab66e9b6-b507-4986-b434-90453c59ced7.jpg', 9),
(10, 'id10_Images/baaecd20-8839-4a59-ac79-7b2deb7c2625.jpg', 10),
(10, 'id10_Images/c1c0305b-a3b7-4b4f-ae7b-9b56d95d7a28.jpg', 11),
(10, 'id10_Images/f95036fe-9962-4a4b-93d6-268a9a627f12-2.jpg', 12),
(10, 'id10_Images/f95036fe-9962-4a4b-93d6-268a9a627f12.jpg', 13);

-- Verification queries
SELECT 'Complete Property System Migration' as status;
SELECT 'Tables Created:' as info, count(*) as table_count FROM information_schema.tables WHERE table_schema = 'public';
SELECT 'Users:' as info, count(*) as user_count FROM users;
SELECT 'Properties:' as info, count(*) as property_count FROM property_listings;
SELECT 'Property Images:' as info, count(*) as image_count FROM property_images;
SELECT 'Team Members:' as info, count(*) as team_count FROM team_members;
SELECT 'Profiles:' as info, count(*) as profile_count FROM public.profiles;

-- Property summary
SELECT 'Property Summary by Type' as info, property_type, count(*) as count FROM property_listings GROUP BY property_type;
SELECT 'Property Summary by Transaction' as info, transaction_type, count(*) as count FROM property_listings GROUP BY transaction_type;
