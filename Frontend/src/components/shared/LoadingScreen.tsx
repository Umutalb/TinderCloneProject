import { Flame } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="animate-pulse">
        <Flame size={64} className="text-primary-500 animate-float" />
      </div>
      <h2 className="mt-4 text-xl font-semibold text-gray-700">Loading</h2>
      <div className="mt-2 flex space-x-1">
        <div className="w-2 h-2 rounded-full bg-primary-300 animate-pulse"></div>
        <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse delay-150"></div>
        <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse delay-300"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;