// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAccessToken } from '../../helpers/auth_helper';

export async function middleware(request: NextRequest) {
  const token = await getAccessToken();

  // If the user is not authenticated, redirect to the login page
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If the user is authenticated, continue to the requested page
  return NextResponse.next();
}

// Define the routes where the middleware should run
export const config = {
  matcher: ['/u/admin/:path*', '/u/:path*'],
};
