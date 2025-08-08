-- backend/schema.sql

CREATE DATABASE IF NOT EXISTS media_team CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE media_team;

CREATE TABLE churches (
  church_id INT AUTO_INCREMENT PRIMARY KEY,
  church_name VARCHAR(255) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE media_specialties (
  specialty_id INT AUTO_INCREMENT PRIMARY KEY,
  specialty_name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE participants (
  participant_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  fathers_name VARCHAR(255),
  age INT,
  gender VARCHAR(50),
  phone_number VARCHAR(20),
  email VARCHAR(255) UNIQUE,
  church_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (church_id) REFERENCES churches(church_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX idx_participants_church ON participants(church_id);

CREATE TABLE participant_skills (
  participant_id INT NOT NULL,
  specialty_id INT NOT NULL,
  PRIMARY KEY (participant_id, specialty_id),
  FOREIGN KEY (participant_id) REFERENCES participants(participant_id) ON DELETE CASCADE,
  FOREIGN KEY (specialty_id) REFERENCES media_specialties(specialty_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE participant_training_details (
  detail_id INT AUTO_INCREMENT PRIMARY KEY,
  participant_id INT NOT NULL,
  current_skill_level VARCHAR(50) DEFAULT 'Beginner',
  expectations_from_training TEXT,
  FOREIGN KEY (participant_id) REFERENCES participants(participant_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
