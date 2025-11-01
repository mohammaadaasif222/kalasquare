// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const adminToken = request.cookies.get('adminToken')?.value;
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/about', '/contact'];
  const authRoutes = ['/login', '/register'];
  
  // Dashboard routes
  const userDashboardRoutes = ['/artist', '/influencer', '/brand', '/agency', '/venue'];
  const adminRoutes = ['/admin'];

  // Check if the current path matches route types
  const isPublicRoute = publicRoutes.some(route => pathname === route);
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  const isUserDashboardRoute = userDashboardRoutes.some(route => pathname.startsWith(route));
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));

  // Allow public routes
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Admin routes - require adminToken
  if (isAdminRoute) {
    if (!adminToken) {
      const url = new URL('/login', request.url);
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // User dashboard routes - require regular token
  if (isUserDashboardRoute) {
    if (!token) {
      const url = new URL('/login', request.url);
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // If has adminToken and trying to access auth routes, redirect to admin
  if (adminToken && isAuthRoute) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // If has regular token and trying to access auth routes, redirect to artist dashboard
  // if (token && isAuthRoute) {
  //   return NextResponse.redirect(new URL('/artist', request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)',
  ],
};