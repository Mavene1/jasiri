import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="w-10 h-10 text-white animate-spin" />
        <p className="text-white text-sm">Loading, please wait...</p>
      </div>
    </div>
  );
}
