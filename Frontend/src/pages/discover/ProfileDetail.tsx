import { useState } from 'react';
import { ArrowLeft, MapPin, Info } from 'lucide-react';
import { UserProfile } from '../../types/user';
import Button from '../../components/shared/Button';

interface ProfileDetailProps {
  user: UserProfile;
  onClose: () => void;
}

const ProfileDetail = ({ user, onClose }: ProfileDetailProps) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentPhotoIndex((prev) => (prev + 1) % user.photos.length);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentPhotoIndex((prev) => (prev === 0 ? user.photos.length - 1 : prev - 1));
  };

  return (
    <div className="card-swipe flex flex-col overflow-auto">
      {/* Header with back button */}
      <button 
        onClick={onClose}
        className="absolute top-4 left-4 z-20 bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition-colors"
      >
        <ArrowLeft size={20} />
      </button>
      
      {/* Photos carousel */}
      <div className="relative h-[350px] bg-gray-100">
        <img 
          src={user.photos[currentPhotoIndex]} 
          alt={`${user.name}'s photo`}
          className="w-full h-full object-cover"
        />
        
        {/* Photo navigation dots */}
        <div className="absolute bottom-4 inset-x-0 flex justify-center gap-1">
          {user.photos.map((_, index) => (
            <div 
              key={index}
              className={`w-2 h-2 rounded-full ${
                currentPhotoIndex === index ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
        
        {/* Photo navigation arrows */}
        {user.photos.length > 1 && (
          <>
            <button 
              onClick={prevPhoto}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <button 
              onClick={nextPhoto}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition-colors rotate-180"
            >
              <ArrowLeft size={20} />
            </button>
          </>
        )}
      </div>
      
      {/* Profile content */}
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold">{user.name}, {user.age}</h2>
          {user.location && (
            <div className="flex items-center text-gray-500 text-sm">
              <MapPin size={14} className="mr-1" />
              <span>{user.location}</span>
            </div>
          )}
        </div>
        
        {/* Bio */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-1 flex items-center">
            <Info size={16} className="mr-1.5" />
            About
          </h3>
          <p className="text-gray-700">{user.bio}</p>
        </div>
        
        {/* Interests */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Interests</h3>
          <div className="flex flex-wrap gap-2">
            {user.interests.map((interest, i) => (
              <span 
                key={i} 
                className="px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full text-sm"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="border-t border-gray-200 p-4">
        <div className="grid grid-cols-2 gap-3">
          <Button variant="secondary" onClick={onClose}>
            Back
          </Button>
          <Button>Like Profile</Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;