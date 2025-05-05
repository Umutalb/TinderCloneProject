import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const api = {
  getInterests: async () => {
    try {
      console.log('API URL:', `${API_URL}/interests`);
      const response = await axios.get(`${API_URL}/interests`);
      console.log('API Response:', response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('API Error:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data
        });
      } else {
        console.error('Unknown Error:', error);
      }
      // API çağrısı başarısız olursa varsayılan ilgi alanlarını döndür
      return [
        'Spor',
        'Müzik',
        'Seyahat',
        'Yemek',
        'Sanat',
        'Teknoloji',
        'Doğa',
        'Kitap',
        'Film',
        'Dans',
        'Fotoğrafçılık',
        'Yoga'
      ];
    }
  }
}; 