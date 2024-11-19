// middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Helper function to check if a token is expired
const isTokenExpired = (token: string): boolean => {
  if (!token) return true;
  const [, payload] = token.split('.');
  try {
    const { exp, iat } = JSON.parse(atob(payload));
    return Date.now() >= Math.min(exp * 1000, iat * 1000 + 48 * 60 * 60 * 1000);
  } catch {
    return true;
  }
};


export function middleware(request: NextRequest) {

  // Retrieve the access token from cookies
  const token = request.cookies.get('accessToken')?.value;

  // Extract pathname for easy readability
  const pathname = request.nextUrl.pathname;

  // List of public paths that don't require authentication
  const publicPaths = ['/user/login', '/user/signup','', '/', '/about', '/pricing', '/marketplace', '/support'];
  const isPublicPath = publicPaths.includes(pathname);


  // Define private paths
  const privatePaths = ['/home','apps', '/configuration','/products', '/dashboard', '/profile', '/settings'];
  const isPrivatePath = privatePaths.includes(pathname);

  // Check if token is valid (exists and is not expired)
  const isAuthenticated = token && !isTokenExpired(token);
  console.log(pathname,isAuthenticated)
  // Redirect to login if accessing a protected path without a valid token
  if (isPrivatePath && !isAuthenticated) {
    return NextResponse.redirect(new URL('/user/login', request.url));
  }
  // Redirect authenticated users trying to access public pages
  if (isAuthenticated && isPublicPath) {
    
    return NextResponse.redirect(new URL('/home', request.url));
  }
  return NextResponse.next(); // Continue if conditions are met
}

// Specify which routes to apply this middleware to
export const config = {
  matcher: [
    '/',
    '/home', 
    '/configuration', 
    "/docs",
    "/statistics",
    "/saas",
    '/dashboard', 
    '/profile', 
    '/settings',
    '/user/login',
    '/user/signup',
    '/about', 
    '/pricing', 
    '/marketplace', 
    '/apps',
    '/support',
  ],
};