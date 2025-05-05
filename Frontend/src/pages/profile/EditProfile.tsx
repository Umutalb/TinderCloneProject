import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus, MapPin, User, Calendar, Info, Trash2, Camera, Check } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/shared/Button';
import { toast } from 'react-toastify';
import { api } from '../../services/api';

interface FormData {
  name: string;
  age: number;
  gender: string;
  bio: string;
  location: string;
  interests: string[];
  photos: string[];
}

const EditProfile = () => {
  const navigate = useNavigate();
  const { user, isInitializing, updateProfile } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: 18,
    gender: '',
    bio: '',
    location: '',
    interests: [],
    photos: [],
  });
  const [interests, setInterests] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Debug logs
  useEffect(() => {
    console.log('EditProfile mounted');
    console.log('User:', user);
    console.log('IsInitializing:', isInitializing);
  }, []);

  // Initialize form data when user data is available
  useEffect(() => {
    console.log('User effect triggered:', user);
    if (user) {
      setFormData({
        name: user.name || '',
        age: user.age || 18,
        gender: user.gender || '',
        bio: user.bio || '',
        location: user.location || '',
        interests: user.interests || [],
        photos: user.photos || [],
      });
    }
  }, [user]);

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log('Fetching interests...');
        const data = await api.getInterests();
        console.log('Interests fetched:', data);
        setInterests(data);
      } catch (error) {
        console.error('Error fetching interests:', error);
        setError('İlgi alanları yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInterests();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      console.log('Submitting form data:', formData);
      await updateProfile(formData);
      toast.success('Profil başarıyla güncellendi');
      navigate('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Profil güncellenirken bir hata oluştu');
    }
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          photos: [...prev.photos, reader.result as string]
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  // Early return for loading state
  if (isInitializing) {
    console.log('Rendering loading state');
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  // Early return for no user
  if (!user) {
    console.log('No user found, redirecting to login');
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
          Profil düzenlemek için giriş yapmanız gerekiyor.
        </div>
        <div className="mt-4">
          <Button onClick={() => navigate('/login')}>
            Giriş Yap
          </Button>
        </div>
      </div>
    );
  }

  console.log('Rendering main form');
  return (
    <div className="max-w-2xl mx-auto">
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}
      
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Profili Düzenle</h1>
        <Button 
          variant="secondary"
          size="sm"
          onClick={() => navigate('/profile')}
        >
          İptal
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Photos Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Fotoğraflar</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {formData.photos.map((photo, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                <img 
                  src={photo} 
                  alt={"Fotoğraf " + (index + 1)}
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleRemovePhoto(index)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
                {index === 0 && (
                  <div className="absolute top-2 left-2 bg-primary-500 text-white text-xs px-2 py-0.5 rounded-full">
                    Ana Fotoğraf
                  </div>
                )}
              </div>
            ))}
            
            {formData.photos.length < 6 && (
              <label className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
                <div className="text-center">
                  <Camera size={24} className="mx-auto mb-2 text-gray-400" />
                  <span className="text-sm text-gray-500">Fotoğraf Ekle</span>
                </div>
              </label>
            )}
          </div>
        </div>

        {/* Basic Info Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Temel Bilgiler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Ad Soyad
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ahmet Yılmaz"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all"
              />
            </div>
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                Yaş
              </label>
              <input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                min="18"
                max="100"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all"
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Konum
              </label>
              <input
                id="location"
                type="text"
                value={formData.location}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Şehir, İlçe"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all"
              />
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                Cinsiyet
              </label>
              <select
                id="gender"
                value={formData.gender}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all"
              >
                <option value="">Cinsiyet seçin</option>
                <option value="male">Erkek</option>
                <option value="female">Kadın</option>
                <option value="non-binary">Non-binary</option>
                <option value="prefer-not-to-say">Belirtmek istemiyorum</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Hakkımda</h2>
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
              Kendiniz hakkında
            </label>
            <textarea
              id="bio"
              value={formData.bio}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Kendiniz hakkında bilgi verin..."
              maxLength={500}
              className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all"
            />
            <div className="text-right text-sm text-gray-500 mt-1">
              {formData.bio.length}/500 karakter
            </div>
          </div>
        </div>

        {/* Interests Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">İlgi Alanları</h2>
          <div>
            <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-1">
              İlgi alanlarınızı seçin
            </label>
            {isLoading ? (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                {interests.map((interest) => (
                  <label
                    key={interest}
                    className={`flex items-center space-x-2 p-2 rounded-lg border cursor-pointer transition-colors ${
                      formData.interests.includes(interest)
                        ? 'bg-primary-50 border-primary-200'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.interests.includes(interest)}
                      onChange={() => handleInterestToggle(interest)}
                      className="hidden"
                    />
                    <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                      formData.interests.includes(interest)
                        ? 'bg-primary-500 border-primary-500'
                        : 'border-gray-300'
                    }`}>
                      {formData.interests.includes(interest) && (
                        <Check size={12} className="text-white" />
                      )}
                    </div>
                    <span className="text-sm">{interest}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="submit" size="lg">
            Değişiklikleri Kaydet
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;