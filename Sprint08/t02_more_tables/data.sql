USE ucode_web;

INSERT INTO
    races (name)
VALUES ('Human'),
    ('Kree'),
    ('Asgardian'),
    ('Mutant');

INSERT INTO
    teams (name)
VALUES ('Avengers'),
    ('Hydra'),
    ('Guardians of the Galaxy');

INSERT INTO
    powers (name, type, points)
VALUES ('Bloody Fist', 'attack', 110),
    ('Iron Shield', 'defense', 200),
    ('Gamma Smash', 'attack', 150),
    (
        'Mjolnir Strike',
        'attack',
        250
    ),
    (
        'Healing Factor',
        'defense',
        100
    ),
    (
        'Energy Barrier',
        'defense',
        180
    );