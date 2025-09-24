-- 003_geo_indexes.sql
-- Prepare geo foundations for future property listings

-- Ensure topology extension available (not used yet)
create extension if not exists postgis_topology;

-- Documentation stub (no tables yet):
-- Future table `properties` will include `location geography(Point, 4326)` for WGS84 coords.
-- Typical index we plan later:
--   create index idx_properties_location on public.properties using gist (location);


