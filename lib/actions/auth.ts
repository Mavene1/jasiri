// app/lib/actions/authActions.ts
'use server';

import { User } from '@/types';
import { cookies } from 'next/headers';
import { clearAuthToken, setAuthToken } from '../util/auth';
import { signinSchema, signupSchema } from '../validations/validations';
import { z } from 'zod';

export async function signupAction(data: z.infer<typeof signupSchema>) {
  // Validate with Zod
  const validation = signupSchema.safeParse(data);

  if (!validation.success) {
    return {
      success: false,
      user: null,
      message: validation.error.errors[0].message
    };
  }

  const { firstName, lastName, mobile, email, county, password } = validation.data;

  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user already exists (simple email check)
    if (email === 'example@gmail.com') {
      return {
        success: false,
        user: null,
        message: 'User with this email already exists'
      };
    }

    // Auto-login after successful signup
    await setAuthToken('valid-jwt-token');

    return {
      success: true,
      message: 'Account created successfully!',
      user: {
        id: Date.now().toString(),
        name: `${firstName} ${lastName}`,
        email,
        username: email,
        role: 'member' as User['role'],
        firstName,
        lastName,
        mobile,
        county,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    };

  } catch (error) {
    return {
      success: false,
      user: null,
      message: 'Registration failed. Please try again.'
    };
  }
}

export async function loginAction({ email, password }: { email: string; password: string }) {
  const validation = signinSchema.safeParse({ email, password });

  if (!validation.success) {
    return {
      success: false,
      user: null,
      message: validation.error.errors[0].message
    };
  }
  if (email === 'example@gmail.com' && password === '12345678') {
    await setAuthToken('valid-jwt-token');
    // (await cookies()).set('token', 'valid-jwt-token', {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: 'strict',
    //   path: '/',
    // });

    return {
      success: true,
      user: {
        id: '1',
        name: 'John Doe',
        email,
        username: email,
        role: 'admin' as User['role'],
        firstName: 'John',
        lastName: 'Doe',
        mobile: '1234567890',
        county: 'Nairobi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      message: 'Login successful',
    };
  }

  return {
    success: false,
    user: null,
    message: 'Invalid credentials'
  };
}

export async function logoutAction() {
  // (await cookies()).delete('token');
  clearAuthToken();
  return { success: true, user: null, message: 'Logout successful' };
}