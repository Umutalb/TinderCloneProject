import Logo from '../shared/Logo';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4 mt-auto">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-sm text-gray-500 mb-2 md:mb-0">
            © {new Date().getFullYear()} Dating App. Tüm hakları saklıdır.
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-sm text-gray-500 hover:text-primary-500 transition-colors">
              Gizlilik
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-primary-500 transition-colors">
              Şartlar
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-primary-500 transition-colors">
              Yardım
            </a>
            <span className="flex items-center text-xs text-gray-400">
              <Logo size="sm" /> ile 2025'te yapıldı
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;