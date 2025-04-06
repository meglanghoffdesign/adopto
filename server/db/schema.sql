-- DROP DATABASE IF EXISTS (REMOVE WHEN READY FOR PRODUCTION)
DROP DATABASE IF EXISTS adopto_db;

-- CREATE DATABASE (REMOVE WHEN READY FOR PRODUCTION)
CREATE DATABASE adopto_db;

-- CONNECT TO THE NEW DATABASE
\c adopto_db;

-- DROP TABLE IF EXISTS
DROP TABLE IF EXISTS users, favorites, pets, organizations;

-- CREATE USERS TABLE
CREATE TABLE users (
    id SERIAL PRIMARY KEY, -- Unique user identifier
    created_at TIMESTAMP DEFAULT NOW(), -- Account creation date
    updated_at TIMESTAMP DEFAULT NOW(), -- Last profile update
    username VARCHAR(255) UNIQUE NOT NULL, -- User’s login name
    email VARCHAR(255) UNIQUE NOT NULL, -- User’s email
    password_hash TEXT NOT NULL, -- Hashed Password
    quiz_parameters JSONB, -- The responses from the quiz
    CONSTRAINT email_unique UNIQUE (email) -- Ensure email is unique
);

-- CREATE FAVORITES TABLE
CREATE TABLE favorites (
    id SERIAL PRIMARY KEY, -- Unique favorite ID
    created_at TIMESTAMP DEFAULT NOW(), -- Favorite entry creation date
    updated_at TIMESTAMP DEFAULT NOW(), -- Last update timestamp
    user_id INTEGER REFERENCES users(id), -- Reference to users table
    pet_id INTEGER REFERENCES pets(id) -- Reference to pets table
);

-- CREATE PETS TABLE
CREATE TABLE pets (
    id SERIAL PRIMARY KEY, -- Unique pet identifier
    created_at TIMESTAMP DEFAULT NOW(), -- Pet entry creation date
    updated_at TIMESTAMP DEFAULT NOW(), -- Last update timestamp
    petfinder_id VARCHAR(50) UNIQUE, -- Petfinder API ID
    name VARCHAR(255) NOT NULL, -- Pet’s name
    species VARCHAR(100) NOT NULL, -- Pet species (e.g., dog, cat, rabbit)
    breed VARCHAR(255), -- Pet breed
    size VARCHAR(50), -- Pet size (e.g., small, medium, large)
    gender VARCHAR(50), -- Pet gender (e.g., male, female, unknown)
    age VARCHAR(50), -- Pet age (e.g., baby, young, adult, senior)
    color VARCHAR(100), -- Pet color
    coat VARCHAR(100), -- Pet coat type
    status VARCHAR(50) DEFAULT 'adoptable', -- Adoption status
    organization_id INTEGER REFERENCES organizations(id), -- Reference to organizations table
    good_with_children BOOLEAN, -- Whether pet is good with children
    good_with_dogs BOOLEAN, -- Whether pet is good with dogs
    good_with_cats BOOLEAN, -- Whether pet is good with cats
    house_trained BOOLEAN, -- Whether pet is house trained
    declawed BOOLEAN, -- Whether pet is declawed
    special_needs BOOLEAN, -- Whether pet has special needs
    location TEXT, -- Pet location (e.g., city, state, postal code)
    distance INTEGER DEFAULT 100, -- Search distance in miles
    photo_url TEXT, -- Pet photo URL
    adopt_url TEXT, -- Adoption link
    description TEXT, -- Detailed pet description
    published_at TIMESTAMP DEFAULT NOW(), -- Timestamp when pet was published
    fetch_timestamp TIMESTAMP DEFAULT NOW() -- Last fetch timestamp from API
);

-- CREATE ORGANIZATIONS TABLE
CREATE TABLE organizations (
    id SERIAL PRIMARY KEY, -- Unique org identifier
    created_at TIMESTAMP DEFAULT NOW(), -- Row entry creation date
    updated_at TIMESTAMP DEFAULT NOW(), -- Last update timestamp
    petfinder_id VARCHAR(50) UNIQUE NOT NULL, -- Organization’s API ID from Petfinder
    name VARCHAR(255) NOT NULL, -- Organization’s name
    email VARCHAR(255), -- Contact email
    phone VARCHAR(50), -- Contact phone number
    website TEXT, -- Organization's website URL
    address TEXT, -- Full street address
    city VARCHAR(100), -- Organization's city
    state VARCHAR(10), -- State abbreviation (e.g., "CA")
    postal_code VARCHAR(20), -- ZIP or postal code
    country VARCHAR(10), -- Country code (e.g., "US", "CA")
    location TEXT, -- Location data (city, state, lat/lon)
    distance INTEGER, -- Distance from user in miles (if searched)
    description TEXT, -- Organization description
    adopt_url TEXT, -- Direct link to organization's adoption page
    photo_url TEXT, -- Organization logo/photo URL
    fetch_timestamp TIMESTAMP DEFAULT NOW(), -- Last time fetched from API
    pet_id INTEGER REFERENCES pets(id) -- Link back to pets table
);