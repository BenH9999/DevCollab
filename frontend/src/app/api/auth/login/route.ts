import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// This is a temporary mock implementation 
// In a real app, this would validate credentials against your backend

const MOCK_USERS = [
  {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    password: 'password123',
  },
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user (mock implementation)
    const user = MOCK_USERS.find(u => u.email === email);

    // Check if user exists and password is correct
    if (!user || user.password !== password) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate a mock token (in a real app, this would be a JWT)
    const token = Buffer.from(`${user.id}:${Date.now()}`).toString('base64');

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
      id: user.id,
      email: user.email,
      name: user.name,
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 