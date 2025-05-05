import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Heart, Flag } from 'lucide-react';
import { UserProfile } from '../../types/user';
import Button from '../../components/shared/Button';
import { toast } from 'react-toastify';

interface MatchDialogProps {
  matchedUser: UserProfile;
  onClose: () => void;
}

const MatchDialog = ({ matchedUser, onClose }: MatchDialogProps) => {
  const navigate = useNavigate();
  const [hearts, setHearts] = useState<{ left: number; top: number; size: number; speed: number }[]>([]);
  const [isReporting, setIsReporting] = useState(false);
  const [reportReason, setReportReason] = useState('');

  useEffect(() => {
    // Create falling hearts animation
    const count = 30;
    const newHearts = [];
    
    for (let i = 0; i < count; i++) {
      newHearts.push({
        left: Math.random() * 100,
        top: Math.random() * -100,
        size: Math.random() * 20 + 10,
        speed: Math.random() * 5 + 3,
      });
    }
    
    setHearts(newHearts);
    
    // Auto close after 10 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 10000);
    
    return () => clearTimeout(timer);
  }, [onClose]);

  const handleSendMessage = () => {
    navigate(`/chat/${matchedUser.id}`);
    onClose();
  };

  const handleReport = async () => {
    if (!reportReason.trim()) {
      toast.error('Lütfen raporlama sebebini belirtin');
      return;
    }

    setIsReporting(true);
    try {
      // API çağrısı burada yapılacak
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simüle edilmiş API çağrısı
      toast.success('Kullanıcı başarıyla raporlandı');
      onClose();
    } catch (error) {
      toast.error('Raporlama sırasında bir hata oluştu');
    } finally {
      setIsReporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      {/* Falling hearts animation */}
      {hearts.map((heart, index) => (
        <div
          key={index}
          className="falling-heart text-primary-500"
          style={{
            left: `${heart.left}%`,
            top: `-${heart.top}%`,
            animationDuration: `${heart.speed}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        >
          <Heart size={heart.size} fill="currentColor" />
        </div>
      ))}
      
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 m-4 max-w-md w-full animate-float">
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            <div className="absolute -left-8 top-4 w-24 h-24 rounded-full overflow-hidden border-4 border-white">
              <img 
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
                alt="Your profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -right-8 top-4 w-24 h-24 rounded-full overflow-hidden border-4 border-white">
              <img 
                src={matchedUser.photos[0]} 
                alt={matchedUser.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-primary-500">
              <Heart size={36} fill="currentColor" className="animate-pulse" />
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <h2 className="text-gradient text-3xl font-bold mb-1">Eşleşme!</h2>
          <p className="text-gray-600 mb-6">Sen ve {matchedUser.name} birbirinizi beğendiniz</p>
          
          <div className="space-y-3">
            <Button 
              onClick={handleSendMessage}
              fullWidth
              leftIcon={<MessageCircle size={18} />}
            >
              Mesaj Gönder
            </Button>
            <Button 
              onClick={() => setIsReporting(true)}
              variant="secondary"
              fullWidth
              leftIcon={<Flag size={18} />}
            >
              Kullanıcıyı Raporla
            </Button>
            <Button 
              onClick={onClose}
              variant="secondary"
              fullWidth
            >
              Kaydırmaya Devam Et
            </Button>
          </div>
        </div>
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
                onClick={() => setIsReporting(false)}
              >
                İptal
              </Button>
              <Button
                variant="danger"
                onClick={handleReport}
                isLoading={isReporting}
              >
                Raporla
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchDialog;