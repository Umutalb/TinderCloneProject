import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import { Heart } from 'lucide-react';

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 relative overflow-hidden">
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
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
              className="text-pink-200"
            />
          </div>
        ))}
      </div>

      <NavBar />
      <main className="flex-grow relative z-10">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;