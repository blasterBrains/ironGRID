import { nanoid } from 'nanoid';
import { SignJWT, jwtVerify } from 'jose';
import type { User } from '@prisma/client';

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_LIFETIME = '15m';
const REFRESH_TOKEN_LIFETIME = '1d';

export const generateAccessToken = async (user: User) => {
  if (ACCESS_TOKEN_SECRET) {
    try {
      const token = await new SignJWT({ ...user })
        .setProtectedHeader({ alg: 'HS256' })
        .setJti(nanoid())
        .setIssuedAt()
        .setExpirationTime(ACCESS_TOKEN_LIFETIME)
        .sign(new TextEncoder().encode(ACCESS_TOKEN_SECRET));
      return token;
    } catch (e) {
      console.error('Error creating access token:', e);
      return null;
    }
  }
};

export const generateRefreshToken = async (user: User) => {
  if (REFRESH_TOKEN_SECRET) {
    try {
      const token = await new SignJWT({ ...user })
        .setProtectedHeader({ alg: 'HS256' })
        .setJti(nanoid())
        .setIssuedAt()
        .setExpirationTime(REFRESH_TOKEN_LIFETIME)
        .sign(new TextEncoder().encode(REFRESH_TOKEN_SECRET));
      return token;
    } catch (e) {
      console.error('Error creating refresh token:', e);
      return null;
    }
  }
};

export const generateTokens = async (user: User) => {
  const [accessToken, refreshToken] = await Promise.all([
    generateAccessToken(user),
    generateRefreshToken(user),
  ]);
  const tokens = {
    accessToken,
    refreshToken,
  };
  return tokens;
};

export const verifyAccessToken = async (token?: string) => {
  try {
    if (!token) return null;
    if (ACCESS_TOKEN_SECRET) {
      const verified = await jwtVerify(
        token,
        new TextEncoder().encode(ACCESS_TOKEN_SECRET)
      );
      return verified.payload as User;
    }
  } catch (error) {
    return null;
  }
};

export const verifyRefreshToken = async (token?: string) => {
  try {
    if (!token) return null;
    if (REFRESH_TOKEN_SECRET) {
      const verified = await jwtVerify(
        token,
        new TextEncoder().encode(REFRESH_TOKEN_SECRET)
      );
      return verified.payload as User;
    }
  } catch (error) {
    return null;
  }
};
