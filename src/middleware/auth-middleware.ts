import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function getTokenFromCookies(request: NextRequest): string | null {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) return null;

  const tokenCookie = cookieHeader.split('; ').find(cookie => cookie.startsWith('token='));
  return tokenCookie ? tokenCookie.split('=')[1] : null;
}

export function middleware(request: NextRequest) {
  const token = getTokenFromCookies(request);

  if (token) {
    const response = NextResponse.next();

    response.headers.set('Cookie', `token=${token}`);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/**', '/protected/**', '/users/**'],
};
