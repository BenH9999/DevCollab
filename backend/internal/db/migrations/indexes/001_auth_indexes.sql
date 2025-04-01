-- Create indexes for authentication
CREATE INDEX idx_users_email ON users (email);

create index idx_sessions_user_id on sessions (user_id);
create index idx_sessions_token on sessions (token);

create index idx_refresh_tokens_user_id on refresh_tokens (user_id);
create index idx_refresh_tokens_token on refresh_tokens (token);

create index idx_verification_tokens_user_id on verification_tokens (user_id);
create index idx_verification_tokens_token on verification_tokens (token);