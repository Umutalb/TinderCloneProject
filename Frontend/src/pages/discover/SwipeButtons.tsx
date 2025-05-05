import { X, Heart, Flag } from 'lucide-react';

interface SwipeButtonsProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onReport: () => void;
}

const SwipeButtons = ({ onSwipeLeft, onSwipeRight, onReport }: SwipeButtonsProps) => {
  return (
    <div className="flex items-center justify-center space-x-4 mt-4">
      <button
        onClick={onSwipeLeft}
        className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
      >
        <X size={24} />
      </button>
      
      <button
        onClick={onReport}
        className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
      >
        <Flag size={24} />
      </button>
      
      <button
        onClick={onSwipeRight}
        className="w-16 h-16 rounded-full bg-primary-500 shadow-lg flex items-center justify-center text-white hover:bg-primary-600 transition-colors"
      >
        <Heart size={28} />
      </button>
    </div>
  );
};

export default SwipeButtons;