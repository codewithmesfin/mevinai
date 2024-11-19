import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";


// Helper function to retrieve the access token from cookies
export const getToken = (): string | undefined => {
  const token = Cookies.get('accessToken');
  return token;
};

// Function to check if the token is expired
export const isTokenExpired = (token: string): boolean => {
  if (!token) return true;
  const [, payload] = token.split('.');
  try {
    const { exp, iat } = JSON.parse(atob(payload)); // Decode and parse the JWT
    const isExpired = Date.now() >= Math.min(exp * 1000, iat * 1000 + 48 * 60 * 60 * 1000); // Check expiration
    return isExpired;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true; // Return true if there's an error decoding the token
  }
};

// Function to set the token in cookies
export const setToken = (token: string): void => {
  Cookies.set('accessToken', token, {
    path: '/',
    secure: false, // Set to true in production; false for localhost
    sameSite: 'Strict',
    expires: 2, // Token expires in 48 hours
  });
};

// Function to check if the user is authenticated
export const isAuthenticated = (): boolean => {
  const token = getToken();
  const authenticated = token && !isTokenExpired(token);
  return authenticated ? true : false;
};

// Function to remove the token
export const removeToken = (): void => {
  Cookies.remove('accessToken', { path: '/' }); // Specify path when removing
};

export const getUserId = (): string | undefined => {
  const token = getToken()
  if (token) {
    const decoded = jwtDecode(token);
    return decoded.sub
  }

  else
    return undefined
};

