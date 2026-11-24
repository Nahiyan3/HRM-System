export const CREATE_SECTION_QUERY = `
    INSERT INTO sections (name)
    VALUES ($1)
    RETURNING *;
`;

export const GET_ALL_SECTIONS_QUERY = `
    SELECT *
    FROM sections
    ORDER BY id ASC;
`;

export const GET_SECTION_BY_ID_QUERY = `
    SELECT *
    FROM sections
    WHERE id = $1;
`;

export const UPDATE_SECTION_QUERY = `
    UPDATE sections
    SET
        name = COALESCE($1, name),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
    RETURNING *;
`;

export const DELETE_SECTION_QUERY = `
    DELETE FROM sections
    WHERE id = $1
    RETURNING *;
`;