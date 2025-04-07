CREATE TABLE IF NOT EXISTS project_members (
    PRIMARY KEY (project_id, user_id)
    project_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    role VARCHAR(50) DEFAULT 'member',
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
);