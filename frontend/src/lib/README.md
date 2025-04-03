# Authentication System

This folder contains the authentication system for the DevCollab application. It implements a JWT-based authentication system with refresh tokens.

## How it Works

### Authentication Flow

1. **Login/Register**: When a user logs in or registers, the backend sends back a JWT token and a refresh token.
2. **Token Storage**: 
   - JWT token is stored in an HTTP cookie (auth-token)
   - Refresh token is stored in localStorage (refresh-token)
   - User data is stored in localStorage (userData)
3. **Authentication Check**: Authentication status is maintained by checking for the presence of these tokens.
4. **API Requests**: All authenticated API requests automatically include the JWT token in the Authorization header.
5. **Token Refresh**: If an API request returns a 401 Unauthorized, the system attempts to refresh the token.
6. **Logout**: On logout, tokens are revoked on the server and cleared from the client.

### Files

- **auth.ts**: Core authentication utilities for token management
- **api.ts**: API client for making authenticated requests
- **AuthContext.tsx**: React context for authentication state management

## Usage

### Protected API Requests

To make authenticated API requests, use the `api` utility:

```typescript
import api from '@/lib/api';

// Example of a GET request
const fetchUserProfile = async () => {
  try {
    const response = await api.get('/api/user/profile');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
};

// Example of a POST request
const createProject = async (projectData) => {
  try {
    const response = await api.post('/api/projects', projectData);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating project:', error);
    return null;
  }
};
```

### Auth Context

Use the `useAuth` hook to access authentication state and functions:

```typescript
import { useAuth } from '@/context/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout, refreshToken } = useAuth();

  if (!isAuthenticated) {
    return <p>Please log in</p>;
  }

  return (
    <div>
      <p>Welcome, {user?.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## Security Considerations

- JWT tokens expire after 24 hours
- Refresh tokens can be revoked by the server
- All API requests are secured with proper authentication
- Passwords are securely hashed using Argon2id algorithm 