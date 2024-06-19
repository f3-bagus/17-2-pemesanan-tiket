import axios from 'axios';

const checkLoginStatus = async () => {
  // Cek apakah token tersimpan di session storage
  const token = sessionStorage.getItem('token');
  if (!token) {
    return false; // Token tidak ada, pengguna belum login
  }

  // Jika token ada, coba lakukan GET request ke endpoint profile
  try {
    const response = await axios.get('http://localhost:3000/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return true; // Jika berhasil, pengguna sudah login
  } catch (error) {
    return false; // Jika ada error, pengguna belum login
  }
};

export default checkLoginStatus;
