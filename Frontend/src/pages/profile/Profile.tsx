import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Edit2, Camera, MapPin, Heart, Calendar } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/shared/Button';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('about');
  
  if (!user) {
    return null;
  }
  
  return (
    <div>
      {/* Profile header */}
      <div className="relative rounded-xl overflow-hidden bg-white shadow-sm">
        {/* Cover photo */}
        <div className="h-40 bg-gradient-primary"></div>
        
        {/* Profile photo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-16">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden">
              {user.photos && user.photos.length > 0 ? (
                <img 
                  src={user.photos[0]} 
                  alt={user.name}
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <Camera size={32} className="text-gray-400" />
                </div>
              )}
            </div>
            <button className="absolute bottom-0 right-0 p-1.5 bg-primary-500 text-white rounded-full border-2 border-white">
              <Camera size={16} />
            </button>
          </div>
        </div>
        
        {/* Actions */}
        <div className="absolute top-3 right-3 flex space-x-2">
          <Button 
            variant="secondary"
            size="sm"
            onClick={() => navigate('/settings')}
            leftIcon={<Settings size={16} />}
          >
            Ayarlar
          </Button>
          <Button 
            size="sm"
            onClick={() => navigate('/profile/edit')}
            leftIcon={<Edit2 size={16} />}
          >
            Profili Düzenle
          </Button>
        </div>
      </div>
      
      {/* Profile details */}
      <div className="mt-20 text-center">
        <h1 className="text-2xl font-bold">{user.name}, {user.age}</h1>
        {user.location && (
          <div className="flex items-center justify-center text-gray-500 mt-1">
            <MapPin size={16} className="mr-1" />
            <span>{user.location}</span>
          </div>
        )}
      </div>
      
      {/* Tabs */}
      <div className="mt-6 border-b border-gray-200">
        <div className="flex justify-center">
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'about'
                ? 'tab-active'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('about')}
          >
            Hakkımda
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'photos'
                ? 'tab-active'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('photos')}
          >
            Fotoğraflar
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'preferences'
                ? 'tab-active'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('preferences')}
          >
            Tercihler
          </button>
        </div>
      </div>
      
      {/* Tab content */}
      <div className="mt-6">
        {activeTab === 'about' && (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Hakkımda</h3>
              <p className="text-gray-700">
                {user.bio || 'Henüz bir biyografi eklenmemiş. Profilinizi düzenleyerek biyografi ekleyebilirsiniz.'}
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">İlgi Alanları</h3>
              {user.interests && user.interests.length > 0 ? (
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
              ) : (
                <p className="text-gray-500">Henüz ilgi alanı eklenmemiş.</p>
              )}
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Hesap Bilgileri</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center text-gray-700">
                  <Calendar size={18} className="mr-2 text-gray-500" />
                  <div>
                    <span className="block text-sm text-gray-500">Katılım</span>
                    <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center text-gray-700">
                  <Heart size={18} className="mr-2 text-gray-500" />
                  <div>
                    <span className="block text-sm text-gray-500">Aradığım</span>
                    <span>
                      {user.preferences?.gender.map(g => g === 'male' ? 'Erkek' : 'Kadın').join(', ') || 'Belirtilmemiş'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'photos' && (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Fotoğraflar</h3>
              <Button 
                size="sm"
                variant="secondary"
                leftIcon={<Camera size={16} />}
                onClick={() => navigate('/profile/edit')}
              >
                Fotoğraf Ekle
              </Button>
            </div>
            
            {user.photos && user.photos.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {user.photos.map((photo, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                    <img 
                      src={photo} 
                      alt={`Fotoğraf ${index + 1}`}
                      className="w-full h-full object-cover" 
                    />
                    {index === 0 && (
                      <div className="absolute top-2 left-2 bg-primary-500 text-white text-xs px-2 py-0.5 rounded-full">
                        Ana Fotoğraf
                      </div>
                    )}
                  </div>
                ))}
                
                {Array.from({ length: Math.max(0, 6 - (user.photos?.length || 0)) }).map((_, index) => (
                  <div 
                    key={`empty-${index}`}
                    className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50"
                  >
                    <Camera size={24} className="text-gray-400" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center p-3 bg-gray-100 rounded-full mb-3">
                  <Camera size={24} className="text-gray-500" />
                </div>
                <h4 className="font-medium mb-1">Henüz Fotoğraf Yok</h4>
                <p className="text-gray-500 text-sm mb-4">Profilinizi tamamlamak için fotoğraf ekleyin</p>
                <Button
                  onClick={() => navigate('/profile/edit')}
                  leftIcon={<Camera size={16} />}
                >
                  Fotoğraf Ekle
                </Button>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'preferences' && (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Keşfetme Tercihleri</h3>
              <Button 
                size="sm"
                variant="secondary"
                leftIcon={<Edit2 size={16} />}
                onClick={() => navigate('/settings')}
              >
                Düzenle
              </Button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-medium mb-2">İlgilendiğim</h4>
                <div className="flex flex-wrap gap-2">
                  {user.preferences?.gender.map((gender, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full text-sm"
                    >
                      {gender === 'male' ? 'Erkek' : 'Kadın'}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-base font-medium mb-2">Yaş Aralığı</h4>
                <div className="flex items-center">
                  <span className="px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full text-sm">
                    {user.preferences?.ageRange[0]} - {user.preferences?.ageRange[1]} yaş
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;