use ucode_web;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(255) NOT NULL
);

CREATE TABLE battle_results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    result ENUM('win', 'loss') NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE cards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    attack INT NOT NULL,
    defense INT NOT NULL,
    cost INT NOT NULL
);

INSERT INTO cards (name, attack, defense, cost) VALUES
    -> ('Goblin Scout', 2, 1, 1),
    -> ('Elven Archer', 3, 2, 2),
    -> ('Knight Errant', 4, 4, 3),
    -> ('Fire Elemental', 5, 3, 4),
    -> ('Frost Giant', 6, 6, 5),
    -> ('Dragon Hatchling', 4, 3, 3),
    -> ('Healing Fairy', 1, 2, 2),
    -> ('Stone Golem', 3, 7, 4),
    -> ('Shadow Assassin', 6, 2, 4),
    -> ('Mermaid Enchantress', 3, 4, 3),
    -> ('Centaur Warrior', 5, 5, 4),
    -> ('Phoenix', 7, 4, 6),
    -> ('Unicorn', 3, 5, 4),
    -> ('Troll Berserker', 8, 2, 5),
    -> ('Wizard Apprentice', 2, 3, 2),
    -> ('Vampiric Bat', 3, 1, 2),
    -> ('Earth Elemental', 4, 6, 4),
    -> ('Spectral Knight', 5, 4, 4),
    -> ('Celestial Guardian', 6, 7, 6),
    -> ('Ancient Dragon', 10, 10, 10);