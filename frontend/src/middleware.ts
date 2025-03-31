import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define routes that need to be protected (require authentication)
const protectedRoutes = [
  '/dashboard',
  '/profile',
  '/projects',
  '/editor',
];

// Define routes that are only for non-authenticated users
const authRoutes = [
  '/auth/login',
  '/auth/register',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the user is authenticated (based on cookie, local storage value is not accessible in middleware)
  // For now, use a cookie since middleware can't access localStorage
  const authCookie = request.cookies.get('auth-token')?.value;
  const isAuthenticated = !!authCookie;

  // Redirect logic for protected routes - if not authenticated, redirect to login
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );
  
  if (isProtectedRoute && !isAuthenticated) {
    const url = new URL('/auth/login', request.url);
    url.searchParams.set('callbackUrl', encodeURI(pathname));
    return NextResponse.redirect(url);
  }

  // Redirect logic for auth routes - if already authenticated, redirect to dashboard
  const isAuthRoute = authRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );
  
  if (isAuthRoute && isAuthenticated) {
    const url = new URL('/dashboard', request.url);
    return NextResponse.redirect(url);
  }

  // For public routes or when authentication status matches route requirements, proceed normally
  return NextResponse.next();
}

const generateMatcherPatterns = (routes: string[]) => {
  return routes.map(route =>  `${route}/:path*`);
}

// Configure which paths middleware runs on
export const config = {
  matcher: [
    // Protected routes
    ...generateMatcherPatterns(protectedRoutes),
    // Auth routes
    ...generateMatcherPatterns(authRoutes),
  ],
}; 