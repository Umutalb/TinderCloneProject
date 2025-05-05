import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Mail, Sliders } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/shared/Button';
import { toast } from 'react-toastify';

interface Notifications {
  matches: boolean;
  likes: boolean;
}

const Settings = () => {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('discovery');
  
  const [preferences, setPreferences] = useState({
    ageRange: user?.preferences?.ageRange || [18, 45],
    distance: user?.preferences?.distance || 25,
    gender: user?.preferences?.gender || ['female', 'male'],
    showMe: true,
  });
  
  const [notifications, setNotifications] = useState<Notifications>({
    matches: true,
    likes: true,
  });
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await updateProfile({ preferences });
      toast.success('Settings updated successfully');
    } catch (error) {
      toast.error((error as Error).message || 'Failed to update settings');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      toast.success('Account deletion request submitted');
      setTimeout(() => {
        logout();
        navigate('/login');
      }, 1500);
    }
  };
  
  if (!user) {
    return null;
  }
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Ayarlar</h1>
      
      {/* Settings tabs */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            <button
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                activeTab === 'discovery'
                  ? 'tab-active'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('discovery')}
            >
              <Sliders size={16} className="inline-block mr-2" />
              Keşfet
            </button>
            <button
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                activeTab === 'notifications'
                  ? 'tab-active'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('notifications')}
            >
              <Bell size={16} className="inline-block mr-2" />
              Bildirimler
            </button>
            <button
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                activeTab === 'account'
                  ? 'tab-active'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('account')}
            >
              <Mail size={16} className="inline-block mr-2" />
              Hesap
            </button>
          </div>
        </div>
        
        {/* Tab content */}
        <div className="p-6">
          {activeTab === 'discovery' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Keşfetme Ayarları</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Arıyorum
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          id="women"
                          type="checkbox"
                          checked={preferences.gender.includes('female')}
                          onChange={(e) => setPreferences(prev => ({
                            ...prev,
                            gender: e.target.checked 
                              ? [...prev.gender, 'female'] 
                              : prev.gender.filter(g => g !== 'female'),
                          }))}
                          className="h-4 w-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <label htmlFor="women" className="ml-2 block text-sm text-gray-700">
                          Kadınlar
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="men"
                          type="checkbox"
                          checked={preferences.gender.includes('male')}
                          onChange={(e) => setPreferences(prev => ({
                            ...prev,
                            gender: e.target.checked 
                              ? [...prev.gender, 'male'] 
                              : prev.gender.filter(g => g !== 'male'),
                          }))}
                          className="h-4 w-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <label htmlFor="men" className="ml-2 block text-sm text-gray-700">
                          Erkekler
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Yaş Aralığı
                    </label>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <input
                          type="range"
                          min="18"
                          max={preferences.ageRange[1]}
                          value={preferences.ageRange[0]}
                          onChange={(e) => setPreferences(prev => ({ 
                            ...prev, 
                            ageRange: [parseInt(e.target.value), prev.ageRange[1]] 
                          }))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-gray-500">18</span>
                          <span className="text-xs text-gray-500">{preferences.ageRange[0]}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <input
                          type="range"
                          min={preferences.ageRange[0]}
                          max="100"
                          value={preferences.ageRange[1]}
                          onChange={(e) => setPreferences(prev => ({ 
                            ...prev, 
                            ageRange: [prev.ageRange[0], parseInt(e.target.value)] 
                          }))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-gray-500">{preferences.ageRange[1]}</span>
                          <span className="text-xs text-gray-500">100+</span>
                        </div>
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {preferences.ageRange[0]} - {preferences.ageRange[1]} yaş
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Göster</h4>
                        <p className="text-sm text-gray-500">
                          Kapalıyken diğer kişilere gösterilmezsiniz
                        </p>
                      </div>
                      <div className="relative inline-block w-12 h-6">
                        <input
                          type="checkbox"
                          id="show-me"
                          className="sr-only"
                          checked={preferences.showMe}
                          onChange={() => setPreferences(prev => ({ ...prev, showMe: !prev.showMe }))}
                        />
                        <label
                          htmlFor="show-me"
                          className={`block w-12 h-6 rounded-full transition-colors cursor-pointer ${
                            preferences.showMe ? 'bg-primary-500' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                              preferences.showMe ? 'transform translate-x-6' : ''
                            }`}
                          ></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button
                  type="submit"
                  isLoading={isLoading}
                >
                  Değişiklikleri Kaydet
                </Button>
              </div>
            </form>
          )}
          
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold mb-4">Bildirim Tercihleri</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Yeni Eşleşmeler</h4>
                    <p className="text-sm text-gray-500">
                      Yeni eşleşmeler olduğunda bildirim al
                    </p>
                  </div>
                  <div className="relative inline-block w-12 h-6">
                    <input
                      type="checkbox"
                      id="matches"
                      className="sr-only"
                      checked={notifications.matches}
                      onChange={() => setNotifications(prev => ({ ...prev, matches: !prev.matches }))}
                    />
                    <label
                      htmlFor="matches"
                      className={`block w-12 h-6 rounded-full transition-colors cursor-pointer ${
                        notifications.matches ? 'bg-primary-500' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          notifications.matches ? 'transform translate-x-6' : ''
                        }`}
                      ></span>
                    </label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Beğeniler</h4>
                    <p className="text-sm text-gray-500">
                      Profiliniz beğenildiğinde bildirim al
                    </p>
                  </div>
                  <div className="relative inline-block w-12 h-6">
                    <input
                      type="checkbox"
                      id="likes"
                      className="sr-only"
                      checked={notifications.likes}
                      onChange={() => setNotifications(prev => ({ ...prev, likes: !prev.likes }))}
                    />
                    <label
                      htmlFor="likes"
                      className={`block w-12 h-6 rounded-full transition-colors cursor-pointer ${
                        notifications.likes ? 'bg-primary-500' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          notifications.likes ? 'transform translate-x-6' : ''
                        }`}
                      ></span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>
                  Değişiklikleri Kaydet
                </Button>
              </div>
            </div>
          )}
          
          {activeTab === 'account' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold mb-4">Hesap Ayarları</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">E-posta Adresi</h4>
                  <p className="text-sm text-gray-700">{user.email}</p>
                  <Button variant="secondary" size="sm" className="mt-2">
                    E-postayı Değiştir
                  </Button>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Şifre</h4>
                  <p className="text-sm text-gray-500 mb-2">
                    Daha iyi güvenlik için şifrenizi düzenli olarak güncelleyin
                  </p>
                  <Button variant="secondary" size="sm">
                    Şifreyi Değiştir
                  </Button>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Hesap İşlemleri</h4>
                  <div className="space-y-2">
                    <Button variant="secondary" size="sm" fullWidth onClick={handleLogout}>
                      Çıkış Yap
                    </Button>
                    <Button variant="danger" size="sm" fullWidth onClick={handleDeleteAccount}>
                      Hesabı Sil
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;