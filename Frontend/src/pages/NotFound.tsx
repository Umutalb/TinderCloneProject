import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import Button from '../components/shared/Button';

const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-[calc(100vh-16rem)] flex flex-col items-center justify-center text-center p-4">
      <div className="bg-primary-50 p-6 rounded-full mb-6">
        <span className="text-6xl">🤔</span>
      </div>
      <h1 className="text-3xl font-bold mb-2">Sayfa Bulunamadı</h1>
      <p className="text-gray-600 mb-6 max-w-md">
        Aradığınız sayfa mevcut değil veya taşınmış. Sizi ana sayfaya yönlendirelim.
      </p>
      <Button onClick={() => navigate('/')} leftIcon={<Home size={18} />}>
        Ana Sayfaya Dön
      </Button>
    </div>
  );
};

export default NotFound;