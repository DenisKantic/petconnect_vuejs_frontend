// auth.js
import axios from "axios";

let validationTimer;

export const startTokenValidation = (callback) => {
  // Validate token immediately on start
  validateToken(callback);
  
  // Set up interval to check token every 5 minutes (300,000 milliseconds)
  validationTimer = setInterval(() => {
    validateToken(callback);
  }, 300000);
};

export const stopTokenValidation = () => {
  clearInterval(validationTimer);
};

const validateToken = async (callback) => {
  try {
    const response = await axios.get("http://localhost:8080/validate-token", null, {
      withCredentials: true, // Ensure cookies are sent
    });
    if (response.status === 200) {
      callback(true); // Call the callback with true if the token is valid
    } else {
      callback(false); // Call the callback with false if the token is not valid
    }
  } catch (error) {
    console.error("Token validation failed:", error);
    callback(false); // Call the callback with false in case of error
  }
};