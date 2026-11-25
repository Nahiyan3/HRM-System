export const CREATE_EMPLOYEE_QUERY = `
    INSERT INTO employees (
        employee_code,
        first_name,
        last_name,
        date_of_birth,
        gender,
        phone,
        address,
        email,
        profile_picture,
        section_id,
        position,
        employee_type,
        date_joined
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    RETURNING *;
`;


export const GET_ALL_EMPLOYEES_QUERY = `
    SELECT
        employees.*,
        sections.name AS section_name
    FROM employees
    LEFT JOIN sections
        ON employees.section_id = sections.id
    ORDER BY employees.id ASC;
`;

export const GET_EMPLOYEE_BY_ID_QUERY = `
    SELECT
        employees.*,
        sections.name AS section_name
    FROM employees
    LEFT JOIN sections
        ON employees.section_id = sections.id
    WHERE employees.id = $1;
`;


export const UPDATE_EMPLOYEE_QUERY = `
    UPDATE employees
    SET
        first_name = COALESCE($1, first_name),
        last_name = COALESCE($2, last_name),
        date_of_birth = COALESCE($3, date_of_birth),
        gender = COALESCE($4, gender),
        phone = COALESCE($5, phone),
        address = COALESCE($6, address),
        email = COALESCE($7, email),
        profile_picture = COALESCE($8, profile_picture),
        section_id = COALESCE($9, section_id),
        position = COALESCE($10, position),
        employee_type = COALESCE($11, employee_type),
        date_joined = COALESCE($12, date_joined),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $13
    RETURNING *;
`;

export const DELETE_EMPLOYEE_QUERY = `
    DELETE FROM employees
    WHERE id = $1
    RETURNING *;
`;

export const UPDATE_OWN_PROFILE_QUERY = `
    UPDATE employees
    SET
        phone = $1,
        address = $2,
        profile_picture = $3,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $4
    RETURNING *;
`;

export const GET_TOTAL_EMPLOYEE_COUNT_QUERY = `
    SELECT COUNT(*) AS total_employees
    FROM employees;
`;

export const GET_EMPLOYEE_COUNT_BY_SECTION_QUERY = `
    SELECT
        s.id AS section_id,
        s.name AS section_name,
        COUNT(e.id) AS employee_count
    FROM sections s
    LEFT JOIN employees e ON s.id = e.section_id
    GROUP BY s.id, s.name
    ORDER BY s.name ASC;
`;

export const GET_EMPLOYEES_WITHOUT_ACCOUNTS_QUERY = `
    SELECT
        employees.id,
        employees.employee_code,
        employees.first_name,
        employees.last_name,
        employees.email,
        employees.position,
        sections.name AS section_name
    FROM employees
    LEFT JOIN users
        ON employees.id = users.employee_id
    LEFT JOIN sections
        ON employees.section_id = sections.id
    WHERE users.id IS NULL
    ORDER BY employees.first_name ASC;
`;