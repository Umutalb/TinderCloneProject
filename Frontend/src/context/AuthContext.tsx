import { createContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile } from '../types/user';
import { toast } from 'react-toastify';

interface AuthContextType {
  user: UserProfile | null;
  isInitializing: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<UserProfile>, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isInitializing: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateProfile: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  // Load user data from localStorage on mount
  useEffect(() => {
    console.log('AuthProvider mounted');
    try {
      const storedUser = localStorage.getItem('user');
      console.log('Stored user:', storedUser);
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        console.log('Parsed user:', parsedUser);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
      localStorage.removeItem('user'); // Clear invalid data
    } finally {
      setIsInitializing(false);
    }
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      console.log('Attempting login...');
      // Simulate API call with delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // In a real app, this would be an API call to validate credentials
      if (email === 'demo@example.com' && password === 'password') {
        const mockUser: UserProfile = {
          id: '1',
          name: 'Alex Johnson',
          email: 'demo@example.com',
          bio: 'Software developer',
          age: 28,
          gender: 'male',
          location: 'San Francisco, CA',
          interests: [],
          photos: [
            'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          ],
          preferences: {
            ageRange: [21, 35],
            distance: 25,
            gender: ['female'],
          },
          createdAt: new Date().toISOString(),
        };
        
        console.log('Login successful, setting user:', mockUser);
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        toast.success('Tekrar hoş geldin!');
      } else {
        throw new Error('Geçersiz e-posta veya şifre');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error((error as Error).message || 'Giriş başarısız');
      throw error;
    }
  };

  // Update profile
  const updateProfile = async (data: Partial<UserProfile>) => {
    try {
      console.log('Updating profile with data:', data);
      // Simulate API call with delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      if (user) {
        const updatedUser = { ...user, ...data };
        console.log('Updated user:', updatedUser);
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        toast.success('Profil başarıyla güncellendi');
      } else {
        throw new Error('Kullanıcı bulunamadı');
      }
    } catch (error) {
      console.error('Update profile error:', error);
      toast.error((error as Error).message || 'Profil güncellenirken bir hata oluştu');
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    console.log('Logging out...');
    setUser(null);
    localStorage.removeItem('user');
    toast.info('Çıkış yapıldı');
  };

  const value = {
    user,
    isInitializing,
    login,
    register: async (userData: Partial<UserProfile>, password: string) => {
      try {
        console.log('Registering new user...');
        // Simulate API call with delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        if (!userData.email || !password) {
          throw new Error('E-posta ve şifre gereklidir');
        }
        
        const newUser: UserProfile = {
          id: Math.random().toString(36).substring(2, 9),
          name: userData.name || 'Yeni Kullanıcı',
          email: userData.email,
          bio: '',
          age: userData.age || 25,
          gender: userData.gender || 'not-specified',
          location: '',
          interests: [],
          photos: [],
          preferences: {
            ageRange: [18, 45],
            distance: 50,
            gender: ['female', 'male'],
          },
          createdAt: new Date().toISOString(),
        };
        
        console.log('Registration successful, setting user:', newUser);
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        toast.success('Hesap başarıyla oluşturuldu!');
      } catch (error) {
        console.error('Registration error:', error);
        toast.error((error as Error).message || 'Kayıt başarısız');
        throw error;
      }
    },
    logout,
    updateProfile,
  };

  console.log('AuthProvider rendering with state:', { user, isInitializing });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};