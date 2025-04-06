-- Create indexes for projects and project_members tables
CREATE INDEX idx_projects_owner_id ON projects (owner_id);
CREATE INDEX idx_projects_status ON projects (status);
CREATE INDEX idx_projects_created_at ON projects (created_at);

CREATE INDEX idx_project_members_project_id ON project_members (project_id);
CREATE INDEX idx_project_members_user_id ON project_members (user_id);
CREATE INDEX idx_project_members_role ON project_members (role); 