// lib/hooks/useLoginMutation.ts
'use client';

import { useMutation } from '@tanstack/react-query';
import { useAppStore } from '../store/useAppStore';
import { loginAction } from '../actions/auth';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export const useLoginMutation = () => {
  const setUser = useAppStore((state) => state.setUser);
  const setAccessToken = useAppStore((state) => state.setAccessToken);
  const setRefreshToken = useAppStore((state) => state.setRefreshToken);
  const router = useRouter();

  return useMutation({
    mutationFn: loginAction,
    onSuccess: (response) => {
      if (response.success && response.user && response.accessToken && response.refreshToken) {
        setUser(response.user);
        setAccessToken(response.accessToken);
        setRefreshToken(response.refreshToken);
        toast.success('Sign in successful');
        router.push('/dashboard/profile');
      } else {
        toast.error(response.message);
        console.error(response.message);
      }
    },
    onError: (error) => {
      console.error('Login error:', error);
    },
  });
};
