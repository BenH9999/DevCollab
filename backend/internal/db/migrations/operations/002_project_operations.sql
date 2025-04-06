-- Project operations

-- Function to create a new project
CREATE OR REPLACE FUNCTION create_project(
    p_name VARCHAR(255),
    p_description TEXT,
    p_owner_id INTEGER
) RETURNS INTEGER AS $$
DECLARE
    project_id INTEGER;
BEGIN
    INSERT INTO projects (name, description, owner_id)
    VALUES (p_name, p_description, p_owner_id)
    RETURNING id INTO project_id;
    
    -- Also add the owner as a member with 'owner' role
    INSERT INTO project_members (project_id, user_id, role)
    VALUES (project_id, p_owner_id, 'owner');
    
    RETURN project_id;
END;
$$ LANGUAGE plpgsql;

-- Function to get project by ID
CREATE OR REPLACE FUNCTION get_project_by_id(
    p_project_id INTEGER
) RETURNS TABLE (
    id INTEGER,
    name VARCHAR(255),
    description TEXT,
    owner_id INTEGER,
    status VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT p.id, p.name, p.description, p.owner_id, p.status, p.created_at, p.updated_at
    FROM projects p
    WHERE p.id = p_project_id;
END;
$$ LANGUAGE plpgsql;

-- Function to get projects by user ID (both owned and member of)
CREATE OR REPLACE FUNCTION get_user_projects(
    p_user_id INTEGER
) RETURNS TABLE (
    id INTEGER,
    name VARCHAR(255),
    description TEXT,
    owner_id INTEGER,
    status VARCHAR(50),
    role VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT p.id, p.name, p.description, p.owner_id, p.status, pm.role, p.created_at, p.updated_at
    FROM projects p
    JOIN project_members pm ON p.id = pm.project_id
    WHERE pm.user_id = p_user_id;
END;
$$ LANGUAGE plpgsql;

-- Function to add a member to a project
CREATE OR REPLACE FUNCTION add_project_member(
    p_project_id INTEGER,
    p_user_id INTEGER,
    p_role VARCHAR(50) DEFAULT 'member'
) RETURNS VOID AS $$
BEGIN
    INSERT INTO project_members (project_id, user_id, role)
    VALUES (p_project_id, p_user_id, p_role)
    ON CONFLICT (project_id, user_id) 
    DO UPDATE SET role = p_role;
END;
$$ LANGUAGE plpgsql;

-- Function to remove a member from a project
CREATE OR REPLACE FUNCTION remove_project_member(
    p_project_id INTEGER,
    p_user_id INTEGER
) RETURNS VOID AS $$
BEGIN
    DELETE FROM project_members
    WHERE project_id = p_project_id AND user_id = p_user_id;
END;
$$ LANGUAGE plpgsql; 