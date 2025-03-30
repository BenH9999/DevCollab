import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// This is a temporary mock implementation
// In a real app, this would register a user in your database

// Mock users store (in-memory for development only)
let MOCK_USERS = [
  {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    password: 'password123', // In a real app, passwords would be hashed
  },
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    // Validate input
    if (!email || !name || !password) {
      return NextResponse.json(
        { message: 'Email, name, and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = MOCK_USERS.find(u => u.email === email);
    if (existingUser) {
      return NextResponse.json(
        { message: 'Email already in use' },
        { status: 409 }
      );
    }

    // Create new user
    const newUser = {
      id: `${MOCK_USERS.length + 1}`,
      email,
      name,
      password, // In a real app, this would be hashed
    };

    // Add user to our mock database
    MOCK_USERS.push(newUser);

    // Generate a mock token (in a real app, this would be a JWT)
    const token = Buffer.from(`${newUser.id}:${Date.now()}`).toString('base64');

    // Set the auth cookie
    const cookieStore = await cookies();
    cookieStore.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    // Return user data (excluding sensitive information)
    return NextResponse.json({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      token,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 