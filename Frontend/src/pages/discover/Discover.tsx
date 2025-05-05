import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import TinderCard from 'react-tinder-card';
import { X, Heart, Star, MessageCircle, Flag } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/shared/Button';
import ProfileDetail from './ProfileDetail';
import SwipeButtons from './SwipeButtons';
import { UserProfile } from '../../types/user';
import MatchDialog from './MatchDialog';
import { toast } from 'react-toastify';

// Demo users data
const demoUsers: UserProfile[] = [
  {
    id: '101',
    name: 'Emma Wilson',
    email: 'emma@example.com',
    bio: 'Coffee addict, book lover, and outdoor enthusiast. Looking for someone to explore hiking trails with!',
    age: 27,
    gender: 'female',
    location: 'San Francisco, CA',
    interests: ['Doğa Yürüyüşü', 'Kitap', 'Kahve', 'Fotoğrafçılık'],
    photos: [
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    ],
    preferences: {
      ageRange: [25, 35],
      distance: 25,
      gender: ['male'],
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: '102',
    name: 'Sophia Chen',
    email: 'sophia@example.com',
    bio: 'Foodie, travel blogger, and yoga instructor. Let\'s chat about our favorite restaurants!',
    age: 29,
    gender: 'female',
    location: 'San Francisco, CA',
    interests: ['Yoga', 'Yemek', 'Seyahat', 'Fotoğrafçılık'],
    photos: [
      'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    ],
    preferences: {
      ageRange: [25, 40],
      distance: 15,
      gender: ['male'],
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: '103',
    name: 'Olivia Taylor',
    email: 'olivia@example.com',
    bio: 'Artist, musician, and dog lover. Looking for someone to join me at art galleries and concerts.',
    age: 26,
    gender: 'female',
    location: 'San Francisco, CA',
    interests: ['Sanat', 'Müzik', 'Köpekler', 'Konserler'],
    photos: [
      'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    ],
    preferences: {
      ageRange: [23, 33],
      distance: 20,
      gender: ['male', 'non-binary'],
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: '104',
    name: 'Mia Johnson',
    email: 'mia@example.com',
    bio: 'Software engineer by day, amateur chef by night. Let\'s code together or cook a meal!',
    age: 28,
    gender: 'female',
    location: 'San Francisco, CA',
    interests: ['Kodlama', 'Yemek', 'Koşu', 'Filmler'],
    photos: [
      'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    ],
    preferences: {
      ageRange: [26, 36],
      distance: 30,
      gender: ['male'],
    },
    createdAt: new Date().toISOString(),
  },
];

type SwipeDirection = 'left' | 'right' | 'up';

const Discover = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastDirection, setLastDirection] = useState<SwipeDirection | ''>('');
  const [isViewingProfile, setIsViewingProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [matchedUser, setMatchedUser] = useState<UserProfile | null>(null);
  const [isReporting, setIsReporting] = useState(false);
  const [reportReason, setReportReason] = useState('');
  
  // References for card actions
  const currentIndexRef = useRef(currentIndex);
  const childRefs = useRef<any[]>([]);

  // Update ref when currentIndex changes
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  // Initialize the cards
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setUsers(demoUsers);
      setCurrentIndex(demoUsers.length - 1);
      childRefs.current = Array(demoUsers.length)
        .fill(0)
        .map((_, i) => childRefs.current[i] || createRef());
      setIsLoading(false);
    }, 1500);
  }, []);

  const createRef = () => {
    return {
      swipe: (dir: SwipeDirection) => {
        console.log('swiping', dir);
      },
    };
  };

  const swiped = (direction: SwipeDirection, index: number, userId: string) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (idx: number) => {
    console.log(`Card ${idx} left the screen`);
  };

  const updateCurrentIndex = (idx: number) => {
    setCurrentIndex(idx);
  };

  const swipe = async (dir: SwipeDirection) => {
    if (currentIndex < 0) return;
    await childRefs.current[currentIndex]?.swipe(dir);
  };

  const handleSwipeLeft = () => swipe('left');
  const handleSwipeRight = () => swipe('right');
  const openReportModal = () => setIsReporting(true);

  const viewProfile = () => {
    setIsViewingProfile(true);
  };

  const closeProfileView = () => {
    setIsViewingProfile(false);
  };

  const handleLike = async () => {
    setIsLoading(true);
    try {
      // API çağrısı burada yapılacak
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simüle edilmiş eşleşme
      if (Math.random() > 0.7) {
        setMatchedUser(users[currentIndex]);
      } else {
        setCurrentIndex(prev => prev + 1);
      }
    } catch (error) {
      toast.error('Bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDislike = () => {
    setCurrentIndex(prev => prev + 1);
  };

  const handleReport = async () => {
    if (!reportReason.trim()) {
      toast.error('Lütfen raporlama sebebini belirtin');
      return;
    }

    setIsLoading(true);
    try {
      // API çağrısı burada yapılacak
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Kullanıcı başarıyla raporlandı');
      setIsReporting(false);
      setReportReason('');
      // Raporlanan kullanıcıyı otomatik olarak geç
      await swipe('left');
    } catch (error) {
      toast.error('Raporlama sırasında bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const currentUser = users[currentIndex];

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-12rem)] flex flex-col items-center justify-center text-gray-500">
        <div className="animate-pulse">
          <Heart size={48} className="text-primary-300" />
        </div>
        <p className="mt-4 text-lg">Yakınındaki kişiler bulunuyor...</p>
      </div>
    );
  }

  if (users.length === 0 || currentIndex < 0) {
    return (
      <div className="h-[calc(100vh-12rem)] flex flex-col items-center justify-center text-center">
        <div className="bg-gray-100 p-6 rounded-full mb-6">
          <X size={48} className="text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Profil Kalmadı</h3>
        <p className="text-gray-500 mb-6 max-w-md">
          Bölgenizde gösterilecek profil kalmadı. Tercihlerinizi genişletin veya daha sonra tekrar kontrol edin!
        </p>
        <Button onClick={() => navigate('/settings')}>Tercihleri Düzenle</Button>
      </div>
    );
  }

  return (
    <div className="relative min-h-[calc(100vh-12rem)]">
      {/* Card Container */}
      <div className="max-w-md mx-auto">
        {!isViewingProfile ? (
          <div className="relative h-[calc(70vh-2rem)] max-h-[650px]">
            {users.map((user, index) => (
              <TinderCard
                ref={(el) => (childRefs.current[index] = el)}
                key={user.id}
                onSwipe={(dir) => swiped(dir as SwipeDirection, index, user.id)}
                onCardLeftScreen={() => outOfFrame(index)}
                preventSwipe={['down']}
                className={`absolute w-full ${index === currentIndex ? 'z-10' : ''}`}
              >
                <div 
                  className="card-swipe relative flex flex-col justify-end w-full"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 60%, rgba(0,0,0,0.9)), url(${user.photos[0]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="p-5 text-white">
                    <h3 className="text-3xl font-bold mb-1">{user.name}, {user.age}</h3>
                    <p className="text-gray-200 mb-2">{user.location}</p>
                    <p className="line-clamp-2 text-sm">{user.bio}</p>
                    
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {user.interests.map((interest, i) => (
                        <span key={i} className="text-xs bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      viewProfile();
                    }}
                    className="absolute bottom-24 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition-colors"
                  >
                    <MessageCircle size={20} />
                  </button>
                </div>
              </TinderCard>
            ))}
          </div>
        ) : (
          <ProfileDetail user={currentUser} onClose={closeProfileView} />
        )}

        {/* Swipe buttons */}
        <SwipeButtons 
          onSwipeLeft={handleSwipeLeft}
          onSwipeRight={handleSwipeRight}
          onReport={openReportModal}
        />
      </div>

      {/* Report Modal */}
      {isReporting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Kullanıcıyı Raporla</h3>
            <p className="text-gray-600 mb-4">
              Lütfen raporlama sebebinizi belirtin. Raporunuz incelenecek ve gerekli işlemler yapılacaktır.
            </p>
            <textarea
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              placeholder="Raporlama sebebinizi yazın..."
              className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all mb-4"
            />
            <div className="flex justify-end space-x-2">
              <Button
                variant="secondary"
                onClick={() => {
                  setIsReporting(false);
                  setReportReason('');
                }}
              >
                İptal
              </Button>
              <Button
                variant="danger"
                onClick={handleReport}
                isLoading={isLoading}
              >
                Raporla
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Match Dialog */}
      {matchedUser && (
        <MatchDialog
          matchedUser={matchedUser}
          onClose={() => setMatchedUser(null)}
        />
      )}
    </div>
  );
};

export default Discover;