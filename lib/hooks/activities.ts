'use client';

import { useQuery } from '@tanstack/react-query';
import { useAppStore } from '@/lib/store/useAppStore';
import { getCountiesAction, getOutcomesAction, getPriorityAreasAction, getRoleActivitiesAction, getSubCountiesAction } from '../actions/activities';

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

export const usePriorityAreas = () => {
  const accessToken = useAppStore((state) => state.accessToken);

  return useQuery({
    queryKey: ['priorityAreas'],
    queryFn: async () => {
      if (!accessToken) throw new Error('No access token found');
      return await getPriorityAreasAction(accessToken);
    },
    enabled: !!accessToken, // Only run if token is present
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
}

export const useCounties = () => {
  const accessToken = useAppStore((state) => state.accessToken);

  return useQuery({
    queryKey: ['counties'],
    queryFn: async () => {
      if (!accessToken) throw new Error('No access token found');
      return await getCountiesAction(accessToken);
    },
    enabled: !!accessToken, // Only run if token is present
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
}

export const useOutcomes = (priorityAreaId: string) => {
  const accessToken = useAppStore((state) => state.accessToken);

  return useQuery({
    queryKey: ['outcomes', priorityAreaId],
    queryFn: async () => {
      if (!accessToken) throw new Error('No access token found');
      return await getOutcomesAction(accessToken, priorityAreaId);
    },
    enabled: !!accessToken, // Only run if token is present
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
}

export const useSubCounties = (countyName: string) => {
  const accessToken = useAppStore((state) => state.accessToken);

  return useQuery({
    queryKey: ['subCounties', countyName],
    queryFn: async () => {
      if (!accessToken) throw new Error('No access token found');
      return await getSubCountiesAction(accessToken, countyName);
    },
    enabled: !!accessToken, // Only run if token is present
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
}






