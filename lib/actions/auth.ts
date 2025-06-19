// app/lib/actions/authActions.ts
'use server';

import { User } from '@/types';
import { cookies } from 'next/headers';

export async function loginAction({ email, password }: { email: string; password: string }) {
  if (email === 'example@gmail.com' && password === '123456') {
    (await cookies()).set('token', 'valid-jwt-token', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });

    return {
      success: true,
      user: {
        id: '1',
        name: 'JohnDoe',
        email,
        username: email,
        role: 'admin' as User['role'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      message: 'Login successful',
    };
  }

  return { success: false, user: null, message: 'Invalid credentials' };
}

export async function logoutAction() {
    (await cookies()).delete('token');
    return { success: true, message: 'Logout successful' };
}