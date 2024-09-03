USE ucode_web;

SELECT h.name AS hero_name
FROM
    heroes h
    JOIN heroes_teams ht ON h.id = ht.hero_id
    JOIN races r ON h.race_id = r.id
WHERE (
        SELECT COUNT(*)
        FROM heroes_teams ht2
        WHERE
            ht2.hero_id = h.id
    ) >= 2
    AND r.name != 'Human' 
    AND h.name LIKE '%a%' 
    AND (
        h.class_role = 'tankman'
        OR h.class_role = 'healer'
    )
GROUP BY
    h.id
ORDER BY h.id ASC
LIMIT 1;