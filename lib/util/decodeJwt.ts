// lib/utils/decodeJwt.ts
import { jwtDecode } from 'jwt-decode';

export interface DecodedToken {
  sub: string;
  userId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
  csId: string;
  iat: number;
  exp: number;
  iss: string;
  aud: string;
  jti: string;
}

export const decodeJwtToken = (token: string): DecodedToken | null => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded;
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};
