#!/bin/bash

# Load environment variables from .env file
if [ -f .env ]; then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi

# Create the database
echo "Creating database $DB_NAME..."
PGPASSWORD="$DB_PASSWORD" psql -U "$DB_USER" -c "CREATE DATABASE \"$DB_NAME\";"

# Connect to the newly created database
echo "Connecting to database $DB_NAME..."
PGPASSWORD="$DB_PASSWORD" psql -U "$DB_USER" -d "$DB_NAME" << EOF

-- Create the tables
CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(200) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "word" (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    word VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE
);

CREATE TABLE "word_of_the_day" (
    id SERIAL PRIMARY KEY,
    image_alt VARCHAR(100),
    image_src VARCHAR(200),
    meaning TEXT,
    part_of_speech VARCHAR(20),
    word VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

EOF

echo "Database initialization completed."
