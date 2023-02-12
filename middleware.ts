// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  verifyAccessToken,
  verifyRefreshToken,
  generateTokens,
} from './common/utils/authTokens';

const createUnverifiedResponse = () =>
  new NextResponse(
    JSON.stringify({ success: false, message: 'Authentication Failed' }),
    { status: 401, headers: { 'content-type': 'application/json' } }
  );

const matchesRoute = (request: NextRequest) => {
  console.log({ nextUrl: request.nextUrl.pathname, method: request.method });
  if (
    (request.nextUrl.pathname.startsWith('/api/grid') &&
      request.method === 'POST') ||
    (request.nextUrl.pathname.startsWith('/api/grid') &&
      request.method === 'PATCH') ||
    (request.nextUrl.pathname.startsWith('/api/square') &&
      request.method === 'POST') ||
    (request.nextUrl.pathname.startsWith('/api/square') &&
      request.method === 'PATCH')
  ) {
    return true;
  }
  return false;
};

export async function middleware(request: NextRequest) {
  if (matchesRoute(request)) {
    console.log('Protected route');
    const accessToken = request.cookies.get('x-access-token')?.value;
    const refreshToken = request.cookies.get('x-refresh-token')?.value;

    if (!refreshToken) return createUnverifiedResponse();

    const verifiedAccessToken = await verifyAccessToken(accessToken);
    const response = NextResponse.next();
    console.log('access token verified', !!verifiedAccessToken);
    if (!verifiedAccessToken) {
      const verifiedRefreshToken = await verifyRefreshToken(refreshToken);
      console.log('refresh token verified', !!verifiedRefreshToken);
      if (!verifiedRefreshToken) return createUnverifiedResponse();

      const tokens = await generateTokens(verifiedRefreshToken);
      if (!tokens.accessToken || !tokens.refreshToken)
        return createUnverifiedResponse();

      console.log('creating new access and refresh tokens');
      response.cookies.set({
        name: 'x-access-token',
        value: tokens.accessToken,
      });
      response.cookies.set({
        name: 'x-refresh-token',
        value: tokens.refreshToken,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      });
    }
    return response;
  }
}
