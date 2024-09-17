use test1;

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
    cost INT NOT NULL,
    image VARCHAR(255) NOT NULL
);

INSERT INTO cards (name, attack, defense, cost, image) VALUES
    ('Iron Man', 8, 6, 5, 'Iron_Man.png'),
    ('Captain America', 7, 7, 4, 'Captain_America.jpg'),
    ('Thor', 9, 8, 6, 'Thor.jpg'),
    ('Hulk', 10, 10, 7, 'Hulk.jpg'),
    ('Black Widow', 6, 5, 3, 'Black_Widow.jpg'),
    ('Hawkeye', 5, 4, 3, 'Hawkeye.png'),
    ('Spider-Man', 7, 6, 4, 'Spider_Man.png'),
    ('Doctor Strange', 8, 5, 6, 'Doctor_Strange.jpg'),
    ('Scarlet Witch', 9, 6, 6, 'Scarlet_Witch.jpg'),
    ('Vision', 7, 7, 5, 'Vision.jpg'),
    ('Black Panther', 8, 6, 5, 'Black_Panther.png'),
    ('Ant-Man', 6, 5, 4, 'Ant_Man.jpg'),
    ('Wasp', 5, 4, 3, 'Wasp.jpg'),
    ('Captain Marvel', 9, 7, 6, 'Captain_Marvel.jpg'),
    ('Winter Soldier', 7, 6, 5, 'Winter_Soldier.jpg'),
    ('Falcon', 6, 5, 4, 'Falcon.jpg'),
    ('War Machine', 8, 6, 5, 'War_Machine.jpg'),
    ('Star-Lord', 7, 5, 4, 'Star_Lord.jpg'),
    ('Gamora', 6, 5, 3, 'Gamora.jpg'),
    ('Drax', 8, 7, 5, 'Drax.jpg');