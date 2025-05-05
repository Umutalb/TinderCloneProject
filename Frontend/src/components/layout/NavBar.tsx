import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User, Heart, Settings, Menu, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { twMerge } from 'tailwind-merge';
import Logo from '../shared/Logo';

const NavBar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', icon: <Heart size={24} />, label: 'Keşfet' },
    { path: '/matches', icon: <Heart size={24} />, label: 'Eşleşmeler' },
    { path: '/profile', icon: <User size={24} />, label: 'Profil' },
    { path: '/settings', icon: <Settings size={24} />, label: 'Ayarlar' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo size="md" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={twMerge(
                  "flex flex-col items-center px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive(item.path)
                    ? "text-primary-600"
                    : "text-gray-500 hover:text-primary-500 hover:bg-gray-50"
                )}
              >
                {item.icon}
                <span className="mt-1">{item.label}</span>
              </Link>
            ))}
            
            <button
              onClick={handleLogout}
              className="ml-2 px-4 py-2 text-sm font-medium text-primary-500 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors"
            >
              Çıkış Yap
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-500 hover:text-primary-500 hover:bg-gray-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-slide-down">
          <div className="container mx-auto px-4 py-2">
            <nav className="grid grid-cols-4 gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={twMerge(
                    "flex flex-col items-center px-2 py-3 rounded-md text-xs font-medium transition-colors",
                    isActive(item.path)
                      ? "text-primary-600"
                      : "text-gray-500 hover:text-primary-500 hover:bg-gray-50"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon}
                  <span className="mt-1">{item.label}</span>
                </Link>
              ))}
            </nav>
            <div className="py-2 text-center border-t border-gray-100 mt-2">
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-primary-500 hover:text-primary-600"
              >
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;