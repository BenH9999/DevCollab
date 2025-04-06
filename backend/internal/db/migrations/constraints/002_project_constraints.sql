-- Adding constraints for projects and project_members tables
ALTER TABLE projects DROP CONSTRAINT IF EXISTS projects_owner_id_fkey;
ALTER TABLE projects ADD CONSTRAINT fk_projects_owner
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE project_members DROP CONSTRAINT IF EXISTS project_members_project_id_fkey;
ALTER TABLE project_members ADD CONSTRAINT fk_project_members_project
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE;

ALTER TABLE project_members DROP CONSTRAINT IF EXISTS project_members_user_id_fkey;
ALTER TABLE project_members ADD CONSTRAINT fk_project_members_user
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE; 