USE ucode_web;

-- Create the powers table
CREATE TABLE IF NOT EXISTS powers (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    type ENUM('attack', 'defense') NOT NULL,
    points INT NOT NULL
);

-- Create the heroes_powers join table
CREATE TABLE IF NOT EXISTS heroes_powers (
    hero_id INT(6) UNSIGNED,
    power_id INT(6) UNSIGNED,
    power_points INT NOT NULL,
    PRIMARY KEY (hero_id, power_id),
    FOREIGN KEY (hero_id) REFERENCES heroes (id) ON DELETE CASCADE,
    FOREIGN KEY (power_id) REFERENCES powers (id) ON DELETE CASCADE
);

-- Create the races table
CREATE TABLE IF NOT EXISTS races (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL UNIQUE
);

-- Add race_id to heroes table
ALTER TABLE heroes ADD COLUMN race_id INT(6) UNSIGNED;

ALTER TABLE heroes
ADD FOREIGN KEY (race_id) REFERENCES races (id) ON DELETE SET NULL;

-- Create the teams table
CREATE TABLE IF NOT EXISTS teams (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL UNIQUE
);

-- Create the heroes_teams join table
CREATE TABLE IF NOT EXISTS heroes_teams (
    hero_id INT(6) UNSIGNED,
    team_id INT(6) UNSIGNED,
    PRIMARY KEY (hero_id, team_id),
    FOREIGN KEY (hero_id) REFERENCES heroes (id) ON DELETE CASCADE,
    FOREIGN KEY (team_id) REFERENCES teams (id) ON DELETE CASCADE
);