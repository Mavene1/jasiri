// lib/auth.ts
import { cookies } from 'next/headers';

export async function setAuthToken(token: string) {
  (await cookies()).set('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });
}

export async function clearAuthToken() {
  (await cookies()).delete('token');
}
