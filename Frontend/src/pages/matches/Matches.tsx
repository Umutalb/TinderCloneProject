import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Calendar, Bell } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Match } from '../../types/user';
import { formatDistanceToNow } from '../../utils/dateUtils';

// Demo matches data
const demoMatches: Match[] = [
  {
    id: 'm1',
    userId: '1',
    matchedUserId: '101',
    matchedUser: {
      id: '101',
      name: 'Emma Wilson',
      email: 'emma@example.com',
      bio: 'Coffee addict, book lover, and outdoor enthusiast.',
      age: 27,
      gender: 'female',
      location: 'San Francisco, CA',
      interests: ['Doğa Yürüyüşü', 'Kitap', 'Kahve'],
      photos: [
        'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      ],
      preferences: {
        ageRange: [25, 35],
        distance: 25,
        gender: ['male'],
      },
      createdAt: new Date().toISOString(),
    },
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    lastMessage: {
      text: 'Hey, how are you doing?',
      timestamp: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString(),
      isRead: true,
    },
  },
  {
    id: 'm2',
    userId: '1',
    matchedUserId: '102',
    matchedUser: {
      id: '102',
      name: 'Sophia Chen',
      email: 'sophia@example.com',
      bio: 'Foodie, travel blogger, and yoga instructor.',
      age: 29,
      gender: 'female',
      location: 'San Francisco, CA',
      interests: ['Yoga', 'Yemek', 'Seyahat'],
      photos: [
        'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      ],
      preferences: {
        ageRange: [25, 40],
        distance: 15,
        gender: ['male'],
      },
      createdAt: new Date().toISOString(),
    },
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    lastMessage: {
      text: 'Would you like to grab coffee this weekend?',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      isRead: false,
    },
  },
  {
    id: 'm3',
    userId: '1',
    matchedUserId: '103',
    matchedUser: {
      id: '103',
      name: 'Olivia Taylor',
      email: 'olivia@example.com',
      bio: 'Artist, musician, and dog lover.',
      age: 26,
      gender: 'female',
      location: 'San Francisco, CA',
      interests: ['Sanat', 'Müzik', 'Köpekler'],
      photos: [
        'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      ],
      preferences: {
        ageRange: [23, 33],
        distance: 20,
        gender: ['male', 'non-binary'],
      },
      createdAt: new Date().toISOString(),
    },
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const Matches = () => {
  const { user } = useAuth();
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMatches(demoMatches);
      setIsLoading(false);
    }, 1000);
  }, []);

  const newMatches = matches.filter(match => !match.lastMessage);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="py-12 text-center">
          <div className="animate-pulse">
            <Bell size={32} className="text-gray-300 inline-block mb-2" />
          </div>
          <p className="text-gray-500">Eşleşmeler yükleniyor...</p>
        </div>
      );
    }

    if (newMatches.length === 0) {
      return (
        <div className="py-12 text-center">
          <Bell size={32} className="text-gray-300 inline-block mb-2" />
          <h3 className="text-lg font-semibold mb-1">Yeni eşleşme yok</h3>
          <p className="text-gray-500">Yeni insanlarla tanışmak için keşfetmeye devam et</p>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {newMatches.map(match => (
          <div 
            key={match.id} 
            className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <img 
              src={match.matchedUser.photos[0]} 
              alt={match.matchedUser.name}
              className="w-14 h-14 rounded-full object-cover" 
            />
            <div className="ml-3">
              <h3 className="font-semibold">{match.matchedUser.name}</h3>
              <p className="text-sm text-gray-500">{match.matchedUser.age} yaşında</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Eşleşmelerin</h1>
      {renderContent()}
    </div>
  );
};

export default Matches;