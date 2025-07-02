
import React from 'react';
import Skeleton from 'react-loading-skeleton';

export const ActivitySkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-3">
          <Skeleton className="w-20 h-6 rounded-full" />
          <div className="flex items-center space-x-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="w-4 h-4 rounded" />
            ))}
            <Skeleton className="w-8 h-4 ml-2" />
          </div>
        </div>

        <Skeleton className="w-full h-6 mb-2" />
        <Skeleton className="w-3/4 h-6 mb-4" />
        
        <div className="space-y-2 mb-4">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-2/3 h-4" />
        </div>

        {/* Metadata */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center">
            <Skeleton className="w-4 h-4 mr-2" />
            <Skeleton className="w-32 h-4" />
          </div>
          
          <div className="flex items-center">
            <Skeleton className="w-4 h-4 mr-2" />
            <Skeleton className="w-40 h-4" />
          </div>
          
          <div className="flex items-center">
            <Skeleton className="w-4 h-4 mr-2" />
            <Skeleton className="w-36 h-4" />
          </div>
          
          <div className="flex items-center">
            <Skeleton className="w-4 h-4 mr-2" />
            <Skeleton className="w-28 h-4" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Skeleton className="w-16 h-8 rounded-full" />
            <Skeleton className="w-16 h-8 rounded-full" />
          </div>
          <div className="flex items-center space-x-1">
            <Skeleton className="w-4 h-4" />
            <Skeleton className="w-8 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
