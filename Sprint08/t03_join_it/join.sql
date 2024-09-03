USE ucode_web;

SELECT h.name AS hero_name, t.name AS team_name
FROM
    heroes h
    LEFT JOIN heroes_teams ht ON h.id = ht.hero_id
    LEFT JOIN teams t ON ht.team_id = t.id;

SELECT h.name AS hero_name, p.name AS power_name
FROM
    powers p
    LEFT JOIN heroes_powers hp ON p.id = hp.power_id
    LEFT JOIN heroes h ON hp.hero_id = h.id;

SELECT
    h.name AS hero_name,
    p.name AS power_name,
    t.name AS team_name
FROM
    heroes h
    JOIN heroes_powers hp ON h.id = hp.hero_id
    JOIN powers p ON hp.power_id = p.id
    JOIN heroes_teams ht ON h.id = ht.hero_id
    JOIN teams t ON ht.team_id = t.id;