import { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      fetchUser();
    } else {
      localStorage.removeItem('token');
      setUser(null);
      setLoading(false);
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const res = await api.get('/auth/profile');
      setUser(res.data.user);
    } catch (error) {
      console.error('Error fetching user profile', error);
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const login = (newToken) => {
    setToken(newToken);
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error', error);
    }
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, setToken, fetchUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
