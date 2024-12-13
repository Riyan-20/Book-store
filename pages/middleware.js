// middleware.js
import { NextResponse } from 'next/server';
import { parseCookies } from 'nookies'; // Use 'nookies' to manage cookies

export function middleware(req) {
  const cookies = parseCookies(req);
  const isLoggedIn = cookies.token; // Check for token in cookies

  const url = req.url;

  // If the user is not logged in and tries to access restricted pages
  if ((url.includes('/books/') || url.includes('/authors/')) && !isLoggedIn) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('redirect', url); // Save original URL to redirect after login
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/books/:path*', '/authors/:path*'], // Protect book and author details
};
