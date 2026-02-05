'use client'

import React, { useEffect, useState, useTransition } from 'react';
import { ActivitySkeleton } from './ActivitySkeleton';
import { ActivityCard } from './ActivityCard';
import { useAppStore } from '@/lib/store/useAppStore';
import { useForumActivities } from '@/lib/hooks/forum';

interface Activity {
  id: number;
  title: string;
  description: string;
  scheduledDate: string;
  location: string;
  likes: number;
  dislikes: number;
  rating: number;
  totalRatings: number;
  isLiked: boolean;
  isDisliked: boolean;
  userRating: number;
  author: string;
  priorityArea: string;
  county: string;
  subcounty: string;
}

// Mock data - replace with actual API calls
const mockActivities: Activity[] = [
  {
    id: 1,
    title: "Community Awareness Campaign on VE Prevention",
    description: "Engaging local communities through educational workshops and awareness sessions to build resilience against violent extremism.",
    scheduledDate: "2024-01-15T10:00:00",
    location: "Mombasa Community Center",
    likes: 24,
    dislikes: 2,
    rating: 4.5,
    totalRatings: 18,
    isLiked: false,
    isDisliked: false,
    userRating: 0,
    author: "Peace Foundation Kenya",
    priorityArea: "Awareness",
    county: "Mombasa",
    subcounty: "Changamwe"
  },
  {
    id: 2,
    title: "Youth Leadership Training Program",
    description: "Empowering young people with leadership skills and alternative narratives to counter extremist messaging.",
    scheduledDate: "2024-01-20T14:00:00",
    location: "Kilifi Youth Center",
    likes: 32,
    dislikes: 1,
    rating: 4.8,
    totalRatings: 25,
    isLiked: true,
    isDisliked: false,
    userRating: 5,
    author: "Coastal Youth Network",
    priorityArea: "Prevention",
    county: "Kilifi",
    subcounty: "Kilifi North"
  },
  {
    id: 3,
    title: "Inter-faith Dialogue Sessions",
    description: "Promoting understanding and cooperation between different religious communities to strengthen social cohesion.",
    scheduledDate: "2024-01-25T16:00:00",
    location: "Garissa Interfaith Center",
    likes: 18,
    dislikes: 3,
    rating: 4.2,
    totalRatings: 12,
    isLiked: false,
    isDisliked: false,
    userRating: 0,
    author: "Interfaith Council",
    priorityArea: "Prevention",
    county: "Garissa",
    subcounty: "Garissa Township"
  },{
    id: 4,
    title: "Community Awareness Campaign on VE Prevention",
    description: "Engaging local communities through educational workshops and awareness sessions to build resilience against violent extremism.",
    scheduledDate: "2024-01-15T10:00:00",
    location: "Mombasa Community Center",
    likes: 24,
    dislikes: 2,
    rating: 4.5,
    totalRatings: 18,
    isLiked: false,
    isDisliked: false,
    userRating: 0,
    author: "Peace Foundation Kenya",
    priorityArea: "Awareness",
    county: "Mombasa",
    subcounty: "Changamwe"
  },
  {
    id: 5,
    title: "Youth Leadership Training Program",
    description: "Empowering young people with leadership skills and alternative narratives to counter extremist messaging.",
    scheduledDate: "2024-01-20T14:00:00",
    location: "Kilifi Youth Center",
    likes: 32,
    dislikes: 1,
    rating: 4.8,
    totalRatings: 25,
    isLiked: true,
    isDisliked: false,
    userRating: 5,
    author: "Coastal Youth Network",
    priorityArea: "Prevention",
    county: "Kilifi",
    subcounty: "Kilifi North"
  },
  {
    id: 6,
    title: "Inter-faith Dialogue Sessions",
    description: "Promoting understanding and cooperation between different religious communities to strengthen social cohesion.",
    scheduledDate: "2024-01-25T16:00:00",
    location: "Garissa Interfaith Center",
    likes: 18,
    dislikes: 3,
    rating: 4.2,
    totalRatings: 12,
    isLiked: false,
    isDisliked: false,
    userRating: 0,
    author: "Interfaith Council",
    priorityArea: "Prevention",
    county: "Garissa",
    subcounty: "Garissa Township"
  }, {
    id: 7,
    title: "Community Awareness Campaign on VE Prevention",
    description: "Engaging local communities through educational workshops and awareness sessions to build resilience against violent extremism.",
    scheduledDate: "2024-01-15T10:00:00",
    location: "Mombasa Community Center",
    likes: 24,
    dislikes: 2,
    rating: 4.5,
    totalRatings: 18,
    isLiked: false,
    isDisliked: false,
    userRating: 0,
    author: "Peace Foundation Kenya",
    priorityArea: "Awareness",
    county: "Mombasa",
    subcounty: "Changamwe"
  },
  {
    id: 8,
    title: "Youth Leadership Training Program",
    description: "Empowering young people with leadership skills and alternative narratives to counter extremist messaging.",
    scheduledDate: "2024-01-20T14:00:00",
    location: "Kilifi Youth Center",
    likes: 32,
    dislikes: 1,
    rating: 4.8,
    totalRatings: 25,
    isLiked: true,
    isDisliked: false,
    userRating: 5,
    author: "Coastal Youth Network",
    priorityArea: "Prevention",
    county: "Kilifi",
    subcounty: "Kilifi North"
  },
  {
    id: 9,
    title: "Inter-faith Dialogue Sessions",
    description: "Promoting understanding and cooperation between different religious communities to strengthen social cohesion.",
    scheduledDate: "2024-01-25T16:00:00",
    location: "Garissa Interfaith Center",
    likes: 18,
    dislikes: 3,
    rating: 4.2,
    totalRatings: 12,
    isLiked: false,
    isDisliked: false,
    userRating: 0,
    author: "Interfaith Council",
    priorityArea: "Prevention",
    county: "Garissa",
    subcounty: "Garissa Township"
  }, {
    id: 10,
    title: "Community Awareness Campaign on VE Prevention",
    description: "Engaging local communities through educational workshops and awareness sessions to build resilience against violent extremism.",
    scheduledDate: "2024-01-15T10:00:00",
    location: "Mombasa Community Center",
    likes: 24,
    dislikes: 2,
    rating: 4.5,
    totalRatings: 18,
    isLiked: false,
    isDisliked: false,
    userRating: 0,
    author: "Peace Foundation Kenya",
    priorityArea: "Awareness",
    county: "Mombasa",
    subcounty: "Changamwe"
  },
  {
    id: 11,
    title: "Youth Leadership Training Program",
    description: "Empowering young people with leadership skills and alternative narratives to counter extremist messaging.",
    scheduledDate: "2024-01-20T14:00:00",
    location: "Kilifi Youth Center",
    likes: 32,
    dislikes: 1,
    rating: 4.8,
    totalRatings: 25,
    isLiked: true,
    isDisliked: false,
    userRating: 5,
    author: "Coastal Youth Network",
    priorityArea: "Prevention",
    county: "Kilifi",
    subcounty: "Kilifi North"
  },
  {
    id: 12,
    title: "Inter-faith Dialogue Sessions",
    description: "Promoting understanding and cooperation between different religious communities to strengthen social cohesion.",
    scheduledDate: "2024-01-25T16:00:00",
    location: "Garissa Interfaith Center",
    likes: 18,
    dislikes: 3,
    rating: 4.2,
    totalRatings: 12,
    isLiked: false,
    isDisliked: false,
    userRating: 0,
    author: "Interfaith Council",
    priorityArea: "Prevention",
    county: "Garissa",
    subcounty: "Garissa Township"
  }, {
    id: 13,
    title: "Community Awareness Campaign on VE Prevention",
    description: "Engaging local communities through educational workshops and awareness sessions to build resilience against violent extremism.",
    scheduledDate: "2024-01-15T10:00:00",
    location: "Mombasa Community Center",
    likes: 24,
    dislikes: 2,
    rating: 4.5,
    totalRatings: 18,
    isLiked: false,
    isDisliked: false,
    userRating: 0,
    author: "Peace Foundation Kenya",
    priorityArea: "Awareness",
    county: "Mombasa",
    subcounty: "Changamwe"
  },
  {
    id: 14,
    title: "Youth Leadership Training Program",
    description: "Empowering young people with leadership skills and alternative narratives to counter extremist messaging.",
    scheduledDate: "2024-01-20T14:00:00",
    location: "Kilifi Youth Center",
    likes: 32,
    dislikes: 1,
    rating: 4.8,
    totalRatings: 25,
    isLiked: true,
    isDisliked: false,
    userRating: 5,
    author: "Coastal Youth Network",
    priorityArea: "Prevention",
    county: "Kilifi",
    subcounty: "Kilifi North"
  },
  {
    id: 15,
    title: "Inter-faith Dialogue Sessions",
    description: "Promoting understanding and cooperation between different religious communities to strengthen social cohesion.",
    scheduledDate: "2024-01-25T16:00:00",
    location: "Garissa Interfaith Center",
    likes: 18,
    dislikes: 3,
    rating: 4.2,
    totalRatings: 12,
    isLiked: false,
    isDisliked: false,
    userRating: 0,
    author: "Interfaith Council",
    priorityArea: "Prevention",
    county: "Garissa",
    subcounty: "Garissa Township"
  }, {
    id: 16,
    title: "Community Awareness Campaign on VE Prevention",
    description: "Engaging local communities through educational workshops and awareness sessions to build resilience against violent extremism.",
    scheduledDate: "2024-01-15T10:00:00",
    location: "Mombasa Community Center",
    likes: 24,
    dislikes: 2,
    rating: 4.5,
    totalRatings: 18,
    isLiked: false,
    isDisliked: false,
    userRating: 0,
    author: "Peace Foundation Kenya",
    priorityArea: "Awareness",
    county: "Mombasa",
    subcounty: "Changamwe"
  },
  {
    id: 17,
    title: "Youth Leadership Training Program",
    description: "Empowering young people with leadership skills and alternative narratives to counter extremist messaging.",
    scheduledDate: "2024-01-20T14:00:00",
    location: "Kilifi Youth Center",
    likes: 32,
    dislikes: 1,
    rating: 4.8,
    totalRatings: 25,
    isLiked: true,
    isDisliked: false,
    userRating: 5,
    author: "Coastal Youth Network",
    priorityArea: "Prevention",
    county: "Kilifi",
    subcounty: "Kilifi North"
  },
  {
    id: 18,
    title: "Inter-faith Dialogue Sessions",
    description: "Promoting understanding and cooperation between different religious communities to strengthen social cohesion.",
    scheduledDate: "2024-01-25T16:00:00",
    location: "Garissa Interfaith Center",
    likes: 18,
    dislikes: 3,
    rating: 4.2,
    totalRatings: 12,
    isLiked: false,
    isDisliked: false,
    userRating: 0,
    author: "Interfaith Council",
    priorityArea: "Prevention",
    county: "Garissa",
    subcounty: "Garissa Township"
  }
];

const Forum = () => {
  const [activities, setActivities] = useState<Activity[]>(mockActivities);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const accessToken = useAppStore((state) => state.accessToken?? '');

  const { data, isLoading: forumActivitiesLoading, isError: forumActivitiesError } = useForumActivities(accessToken);

  useEffect(() => {
    console.log("Forum Activities: ", data)
  }, [data]);

  const handleLike = async (activityId: number) => {
    // Optimistic update
    startTransition(() => {
      setActivities(prev => prev.map(activity => {
        if (activity.id !== activityId) return activity;
        
        if (activity.isLiked) {
          return { ...activity, likes: activity.likes - 1, isLiked: false };
        } else {
          return { 
            ...activity, 
            likes: activity.likes + 1, 
            isLiked: true,
            dislikes: activity.isDisliked ? activity.dislikes - 1 : activity.dislikes,
            isDisliked: false
          };
        }
      }));
    });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('Like updated successfully');
    } catch (error) {
      console.error('Error updating like:', error);
      // Revert optimistic update on error
      startTransition(() => {
        setActivities(prev => prev.map(activity => {
          if (activity.id !== activityId) return activity;
          
          if (!activity.isLiked) {
            return { ...activity, likes: activity.likes + 1, isLiked: true };
          } else {
            return { 
              ...activity, 
              likes: activity.likes - 1, 
              isLiked: false,
              dislikes: !activity.isDisliked ? activity.dislikes + 1 : activity.dislikes,
              isDisliked: true
            };
          }
        }));
      });
    }
  };

  const handleDislike = async (activityId: number) => {
    // Optimistic update
    startTransition(() => {
      setActivities(prev => prev.map(activity => {
        if (activity.id !== activityId) return activity;
        
        if (activity.isDisliked) {
          return { ...activity, dislikes: activity.dislikes - 1, isDisliked: false };
        } else {
          return { 
            ...activity, 
            dislikes: activity.dislikes + 1, 
            isDisliked: true,
            likes: activity.isLiked ? activity.likes - 1 : activity.likes,
            isLiked: false
          };
        }
      }));
    });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('Dislike updated successfully');
    } catch (error) {
      console.error('Error updating dislike:', error);
      // Revert optimistic update on error
      startTransition(() => {
        setActivities(prev => prev.map(activity => {
          if (activity.id !== activityId) return activity;
          
          if (!activity.isDisliked) {
            return { ...activity, dislikes: activity.dislikes + 1, isDisliked: true };
          } else {
            return { 
              ...activity, 
              dislikes: activity.dislikes - 1, 
              isDisliked: false,
              likes: !activity.isLiked ? activity.likes + 1 : activity.likes,
              isLiked: true
            };
          }
        }));
      });
    }
  };

  const handleRate = async (activityId: number, rating: number) => {
    const oldActivity = activities.find(a => a.id === activityId);
    if (!oldActivity) return;

    // Optimistic update
    startTransition(() => {
      setActivities(prev => prev.map(activity => {
        if (activity.id !== activityId) return activity;
        
        const wasRated = activity.userRating > 0;
        const newTotalRatings = wasRated ? activity.totalRatings : activity.totalRatings + 1;
        const currentSum = activity.rating * activity.totalRatings;
        const newSum = wasRated ? currentSum - activity.userRating + rating : currentSum + rating;
        const newAvgRating = newSum / newTotalRatings;
        
        return {
          ...activity,
          userRating: rating,
          rating: newAvgRating,
          totalRatings: newTotalRatings
        };
      }));
    });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('Rating updated successfully');
    } catch (error) {
      console.error('Error updating rating:', error);
      // Revert optimistic update on error
      startTransition(() => {
        setActivities(prev => prev.map(activity => {
          if (activity.id !== activityId) return oldActivity;
          return activity;
        }));
      });
    }
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen text-gray-500">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">PCVE Activities Forum</h1>
          <p className="text-gray-600">Discover and engage with Preventing and Countering Violent Extremism activities in your community</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            // Show skeletons while loading
            Array.from({ length: 6 }).map((_, index) => (
              <ActivitySkeleton key={index} />
            ))
          ) : (
            activities.map(activity => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                onLike={() => handleLike(activity.id)}
                onDislike={() => handleDislike(activity.id)}
                onRate={(rating) => handleRate(activity.id, rating)}
              />
            ))
          )}
        </div>
    </div>
  );
};

export default Forum;
