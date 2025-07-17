'use client';

import { useQuery } from '@tanstack/react-query';
import { useAppStore } from '@/lib/store/useAppStore';
import { getPriorityAreas, getRoleActivitiesAction } from '../actions/activities';

export const useRoleActivities = () => {
  const accessToken = useAppStore((state) => state.accessToken);

  return useQuery({
    queryKey: ['roleActivities'],
    queryFn: async () => {
      if (!accessToken) throw new Error('No access token found');
      return await getRoleActivitiesAction(accessToken);
    },
    enabled: !!accessToken, // Only run if token is present
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
};


// export function useRoleActivities(accessToken: string) {
//     return useQuery({
//       queryKey: ['role-activities'],
//       queryFn: () => getRoleActivitiesAction(accessToken),
//       staleTime: 1000 * 60 * 30, // 30 minutes
//     });
//   }


export const usePriorityAreas = () => {
    const accessToken = useAppStore((state) => state.accessToken);

    return useQuery({
      queryKey: ['priorityAreas'],
      queryFn: async () => {
        if (!accessToken) throw new Error('No access token found');
        return await getPriorityAreas(accessToken);
      },
      enabled: !!accessToken, // Only run if token is present
      staleTime: 1000 * 60 * 30, // 30 minutes
    });
  }

