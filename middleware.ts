// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/about', '/contact'];
  const authRoutes = ['/login', '/register'];
  
  // Dashboard routes
  const dashboardRoutes = ['/artist', '/influencer', '/brand', '/agency', '/venue', '/admin'];

  // Check if the current path is public
  const isPublicRoute = publicRoutes.some(route => pathname === route);
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  const isDashboardRoute = dashboardRoutes.some(route => pathname.startsWith(route));

  // Allow public routes
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // If no token and trying to access protected route
  if (!token && isDashboardRoute) {
    const url = new URL('/login', request.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  // If has token and trying to access auth routes, redirect to dashboard
  if (token && isAuthRoute) {
    // In production, decode token to get user_type
    // For now, redirect to a default dashboard
    return NextResponse.redirect(new URL('/artist', request.url));
  }

  // For dashboard routes, verify user has access
  if (token && isDashboardRoute) {
    try {
      // In production, verify JWT and check user_type
      // Example: const decoded = jwt.verify(token, secret);
      // const userType = decoded.user_type;
      
      // Check if user is accessing their correct dashboard
      // For now, allow all authenticated users
      return NextResponse.next();
    } catch (error) {
      // Invalid token, redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)',
  ],
};