-- SQL Migration to normalize user roles
-- Run this migration to convert existing role values to standardized enum values

-- Convert existing values to proper enum format
UPDATE users SET role='CHEF' WHERE LOWER(role)='chef';
UPDATE users SET role='FOODIE' WHERE LOWER(role)='foodie';
UPDATE users SET role='ADMIN' WHERE LOWER(role)='admin';

-- Set default role for any remaining NULL or invalid values
UPDATE users SET role='FOODIE' WHERE role IS NULL OR role NOT IN ('CHEF', 'FOODIE', 'ADMIN');

-- Add ALTER TABLE to change column type to ensure compatibility with enum
-- Note: This may vary depending on your database (MySQL, PostgreSQL, etc.)
-- For MySQL:
-- ALTER TABLE users MODIFY COLUMN role ENUM('FOODIE', 'CHEF', 'ADMIN') NOT NULL DEFAULT 'FOODIE';

-- For PostgreSQL:
-- ALTER TABLE users ALTER COLUMN role TYPE VARCHAR(50);
-- Then Spring will automatically handle the enum mapping
