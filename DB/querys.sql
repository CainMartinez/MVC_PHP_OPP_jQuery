SELECT p.*,c.name_city,
    (SELECT GROUP_CONCAT(DISTINCT t.name_type) FROM property_type pt JOIN type t ON pt.id_type = t.id_type WHERE pt.id_property = p.id_property) as types,
    (SELECT GROUP_CONCAT(DISTINCT e.name_extras) FROM property_extras pe JOIN extras e ON pe.id_extras = e.id_extras WHERE pe.id_property = p.id_property) as extras,
    (SELECT GROUP_CONCAT(DISTINCT cat.name_category) FROM property_category pc JOIN category cat ON pc.id_category = cat.id_category WHERE pc.id_property = p.id_property) as categories,
    (SELECT GROUP_CONCAT(DISTINCT o.name_operation) FROM property_operation po JOIN operation o ON po.id_operation = o.id_operation WHERE po.id_property = p.id_property) as operations
FROM property p
LEFT JOIN city c ON p.id_city = c.id_city
WHERE p.id_property = 1;