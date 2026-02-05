import { useMutation, useQuery } from '@tanstack/react-query';
import { downloadReportAction, fetchActivityReportsAction, getCountiesAction, getOutcomesAction, getPriorityAreasAction, getRoleActivitiesAction, getSubCountiesAction } from '../actions/activities';
import toast from 'react-hot-toast';
import { createActivityAction } from '../actions/activities';

export const useCreateActivity = (accessToken: string) => {
  return useMutation({
    mutationFn: async (activityData: any) => {
      return await createActivityAction(accessToken, activityData);
    },
    onSuccess: () => {
      toast.success('Activity created successfully');
    },
    onError: () => {
      toast.error('Failed to create activity');
    },
  });
}

export const useRoleActivities = (accessToken: string) => {
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

export const usePriorityAreas = (accessToken: string) => {
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

export const useCounties = (accessToken: string) => {
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

export const useOutcomes = (accessToken: string, priorityAreaId: string) => {
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

export const useSubCounties = (accessToken: string, countyName: string) => {
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

export const useActivityReports = (accessToken: string, activityId: string) => {
  return useQuery({
    queryKey: ['activityReports', activityId],
    queryFn: async () => {
      if (!accessToken) throw new Error('No access token found');
      return await fetchActivityReportsAction(accessToken, activityId);
    },
    enabled: !!accessToken, // Only run if token is present
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
}

export const useDownloadReport = (accessToken: string, reportId: string) => {
  return useQuery({
    queryKey: ['downloadReport', reportId],
    queryFn: async () => {
      if (!accessToken) throw new Error('No access token found');
      return await downloadReportAction(accessToken, reportId);
    },
    enabled: !!accessToken, // Only run if token is present
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
}

