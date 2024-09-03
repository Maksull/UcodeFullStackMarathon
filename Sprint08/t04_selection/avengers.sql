USE ucode_web;

SELECT h.name AS hero_name, SUM(
        CASE
            WHEN p.type = 'attack' THEN hp.power_points
            ELSE 0
        END
    ) + SUM(
        CASE
            WHEN p.type = 'defense' THEN hp.power_points
            ELSE 0
        END
    ) AS total_power
FROM
    heroes h
    JOIN heroes_powers hp ON h.id = hp.hero_id
    JOIN powers p ON hp.power_id = p.id
GROUP BY
    h.id
ORDER BY total_power DESC, h.id ASC
LIMIT 1;

SELECT heroes.name, powers.points
FROM heroes
    JOIN powers on powers.hero_id = heroes.id
WHERE
    powers.points = (
        SELECT min(powers.points)
        FROM powers
    )
LIMIT 1;

SELECT h.name AS hero_name, SUM(
        CASE
            WHEN p.type = 'attack' THEN hp.power_points
            ELSE 0
        END
    ) + SUM(
        CASE
            WHEN p.type = 'defense' THEN hp.power_points
            ELSE 0
        END
    ) AS total_power
FROM
    heroes h
    JOIN heroes_teams ht ON h.id = ht.hero_id
    JOIN teams t ON ht.team_id = t.id
    JOIN heroes_powers hp ON h.id = hp.hero_id
    JOIN powers p ON hp.power_id = p.id
WHERE
    t.name = 'Avengers'
    AND h.name != 'Black Widow'
GROUP BY
    h.id
ORDER BY total_power DESC;

SELECT t.name AS team_name, SUM(
        CASE
            WHEN p.type = 'attack' THEN hp.power_points
            ELSE 0
        END
    ) + SUM(
        CASE
            WHEN p.type = 'defense' THEN hp.power_points
            ELSE 0
        END
    ) AS total_power
FROM
    teams t
    JOIN heroes_teams ht ON t.id = ht.team_id
    JOIN heroes h ON ht.hero_id = h.id
    JOIN heroes_powers hp ON h.id = hp.hero_id
    JOIN powers p ON hp.power_id = p.id
WHERE
    t.name IN ('Avengers', 'Hydra')
GROUP BY
    t.id
ORDER BY
    total_power ASC,
    CASE
        WHEN t.name = 'Avengers' THEN 1
        ELSE 0
    END;