export const CREATE_USER_QUERY = `
    INSERT INTO users (
        email,
        password_hash,
        role,
        employee_id
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *;
`;

export const GET_USER_BY_EMAIL_QUERY = `
    SELECT *
    FROM users
    WHERE email = $1;
`;

export const GET_USER_BY_ID_QUERY = `
    SELECT *
    FROM users
    WHERE id = $1;
`;

export const GET_EMPLOYEE_BY_ID_QUERY = `
    SELECT id
    FROM employees
    WHERE id = $1;
`;

export const GET_USER_BY_EMPLOYEE_ID_QUERY = `
    SELECT id
    FROM users
    WHERE employee_id = $1;
`;

export const GET_ALL_EMPLOYEE_USERS_QUERY = `
    SELECT
        u.id,
        u.email,
        u.role,
        u.employee_id,
        e.employee_code,
        e.first_name,
        e.last_name,
        e.position,
        s.name AS section_name
    FROM users u
    INNER JOIN employees e ON u.employee_id = e.id
    LEFT JOIN sections s ON e.section_id = s.id
    WHERE u.role = 'EMPLOYEE'
    ORDER BY u.id ASC;
`;

export const UPDATE_USER_PASSWORD_QUERY = `
    UPDATE users
    SET password_hash = $1,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
    RETURNING id;
`;