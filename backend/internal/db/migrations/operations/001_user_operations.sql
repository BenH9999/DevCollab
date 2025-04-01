-- Create the user
CREATE OR REPLACE FUNCTION create_user(
    p_name VARCHAR(255),
    p_email VARCHAR(255),
    p_password VARCHAR(255)
) RETURNS TABLE (
    id INTEGER,
    name VARCHAR(255),
    email VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    INSERT INTO users (name, email, password)
    VALUES (p_name, p_email, p_password)
    RETURNING users.id, users.name, users.email, users.created_at;
END;
$$ LANGUAGE plpgsql;

-- For authentication
CREATE OR REPLACE FUNCTION find_user_for_auth(p_email VARCHAR(255))
RETURNS TABLE (
    id INTEGER,
    password VARCHAR(255)
) AS $$
BEGIN
    RETURN QUERY
    SELECT users.id, users.password
    FROM users
    WHERE users.email = p_email;
END;
$$ LANGUAGE plpgsql;

-- Find user by id
CREATE OR REPLACE FUNCTION find_user_by_id(p_id INTEGER)
RETURNS TABLE (
    id INTEGER,
    name VARCHAR(255),
    email VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT users.id, users.name, users.email, users.created_at, users.updated_at
    FROM users
    WHERE users.id = p_id;
END;
$$ LANGUAGE plpgsql;

-- Find user by email
CREATE OR REPLACE FUNCTION find_user_by_email(p_email VARCHAR(255))
RETURNS TABLE (
    id INTEGER,
    name VARCHAR(255),
    email VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT users.id, users.name, users.email, users.created_at, users.updated_at
    FROM users
    WHERE users.email = p_email;
END;
$$ LANGUAGE plpgsql;


