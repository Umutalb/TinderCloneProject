import { Outlet } from 'react-router-dom';
import { Heart } from 'lucide-react';
import Logo from '../shared/Logo';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-500 to-purple-600 relative overflow-hidden">
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          >
            <Heart
              size={Math.random() * 20 + 10}
              className="text-white/20"
            />
          </div>
        ))}
      </div>

      <div className="flex-grow flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden">
          <div className="text-center p-6 bg-white">
            <div className="inline-flex items-center justify-center mb-4">
              <Logo size="lg" />
            </div>
            <p className="text-gray-500">Mükemmel eşleşmeni bul</p>
          </div>
          <div className="p-6 bg-white rounded-xl">
            <Outlet />
          </div>
        </div>
      </div>
      <footer className="text-center py-4 text-white text-sm relative z-10">
        © {new Date().getFullYear()} Dating App. Tüm hakları saklıdır.
      </footer>
    </div>
  );
};

export default AuthLayout;