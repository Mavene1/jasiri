'use client';

import { Loader2 } from 'lucide-react';
import React from 'react';

interface LoadingBackdropProps {
  show: boolean;
}

export const LoadingBackdrop: React.FC<LoadingBackdropProps> = ({ show }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="w-10 h-10 text-white animate-spin" />
        <p className="text-white text-sm font-medium">Loading, please wait...</p>
      </div>
    </div>
  );
};
