// app/lib/actions/authActions.ts
'use server';

import { User } from '@/types';
import { cookies } from 'next/headers';
import { clearAuthToken, setAuthToken } from '../util/auth';
import { signinSchema, signupSchema } from '../validations/validations';
import { z } from 'zod';
import { jwtDecode } from 'jwt-decode';

interface LoginRequest {
  email: string;
  password: string;
}

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

interface DecodedUser {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role?: string;
  status?: string;
  userId: string;
  [key: string]: any;
}

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
        role: 'nctc' as User['role'],
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

// export async function loginAction({ email, password }: { email: string; password: string }) {
//   const validation = signinSchema.safeParse({ email, password });

//   if (!validation.success) {
//     return {
//       success: false,
//       user: null,
//       message: validation.error.errors[0].message
//     };
//   }
//   if (email === 'example@gmail.com' && password === '12345678') {
//     await setAuthToken('valid-jwt-token');
//     // (await cookies()).set('token', 'valid-jwt-token', {
//     //   httpOnly: true,
//     //   secure: true,
//     //   sameSite: 'strict',
//     //   path: '/',
//     // });

//     return {
//       success: true,
//       user: {
//         id: '1',
//         name: 'John Doe',
//         email,
//         username: email,
//         role: 'individual' as User['role'],
//         firstName: 'John',
//         lastName: 'Doe',
//         mobile: '1234567890',
//         county: 'Nairobi',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       message: 'Login successful',
//     };
//   }

//   return {
//     success: false,
//     user: null,
//     message: 'Invalid credentials'
//   };
// }

export async function loginAction({ email, password }: LoginRequest) {
  const validation = signinSchema.safeParse({ email, password });
  if (!validation.success) {
    return {
      success: false,
      user: null,
      message: validation.error.errors[0].message,
    };
  }

  try {
    const res = await fetch('http://34.68.6.39:8000/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: email,
        client_secret: password,
      }),
    });

    if (!res.ok) {
      return {
        success: false,
        user: null,
        message: 'Invalid credentials',
      };
    }

    const data: TokenResponse = await res.json();
    const decoded: DecodedUser = jwtDecode(data.access_token);

    await setAuthToken(data.access_token);

    return {
      success: true,
      user: {
        id: decoded.userId,
        email: decoded.email,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        phone: decoded.phone,
        role: decoded?.role as User['role'] ?? "individual",
        status: decoded.status,
        createdAt: new Date(),
        updatedAt: new Date(),
        username: decoded.email,
        avatar: "",
        profileComplete: 25,
        county: "",
        name: decoded.firstName + ' ' + decoded.lastName,
      },
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      message: 'Login successful',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      user: null,
      message: 'Something went wrong. Try again later.',
    };
  }
}

export async function logoutAction() {
  await clearAuthToken();
  return { success: true, user: null, message: 'Logout successful' };
}