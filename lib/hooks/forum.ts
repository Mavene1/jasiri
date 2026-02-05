import { useQuery } from '@tanstack/react-query';
import { getForumActivitiesAction } from '../actions/forum';

export const useForumActivities = (accessToken: string) => {
    return useQuery({
      queryKey: ['forumActivities'],
      queryFn: async () => {
        if (!accessToken) throw new Error('No access token found');
        return await getForumActivitiesAction(accessToken);
      },
      enabled: !!accessToken, // Only run if token is present
      staleTime: 1000 * 60 * 30, // 30 minutes
    });
  }