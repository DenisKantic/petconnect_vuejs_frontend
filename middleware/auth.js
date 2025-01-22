import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';
import axios from 'axios';
import { ref } from 'vue';

const BACKGROUND_VALIDATION_INTERVAL = 5 * 60 * 1000; // 5 minutes

const isLoggedIn = ref(false);

export {isLoggedIn}

export default function auth() {
  return new Promise((resolve, reject) => {
    const token = Cookies.get('auth_token');

    if (!token) {
      isLoggedIn.value = false;
      reject(new Error('No token found'));
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        Cookies.remove('auth_token');
        isLoggedIn.value = false;
        reject(new Error('Token expired'));
        return;
      }

      // If token is valid, proceed and set up background validation
      setupBackgroundValidation(token);
      isLoggedIn.value = true;
      resolve();
    } catch (error) {
      console.error('Error decoding token:', error);
      Cookies.remove('auth_token');
      isLoggedIn.value = false;
      reject(error);
    }
  });
}

function setupBackgroundValidation(token) {
  setInterval(async () => {
    try {
      const response = await axios.get('http://localhost:8080/validate-token', {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
      });

      if (!response.data.valid) {
        Cookies.remove('auth_token');
        this.$router.push('/prijava')
      }
    } catch (error) {
      console.error('Background validation error:', error);
      Cookies.remove('auth_token');
      this.$router.push('/prijava')      // Redirect to login page
    }
  }, BACKGROUND_VALIDATION_INTERVAL);
}