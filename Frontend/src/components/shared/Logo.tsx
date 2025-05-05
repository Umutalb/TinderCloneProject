import { Heart, Sparkles } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo = ({ className = '', size = 'md' }: LogoProps) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative">
        <Heart 
          size={size === 'sm' ? 24 : size === 'md' ? 28 : 32} 
          className="text-primary-500"
        />
        <Sparkles 
          size={size === 'sm' ? 12 : size === 'md' ? 14 : 16} 
          className="absolute -top-1 -right-1 text-yellow-400"
        />
      </div>
      <span className={`font-bold ml-2 bg-gradient-to-r from-primary-500 to-pink-500 bg-clip-text text-transparent ${sizeClasses[size]}`}>
        Dating App
      </span>
    </div>
  );
};

export default Logo; 