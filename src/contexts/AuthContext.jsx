import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Ensure we extract userId correctly - adjust based on your JWT claims
        const userId = decoded.userId || decoded.sub || decoded.nameid;
        setUser({ 
          userId,
          token,
          ...decoded 
        });
      } catch (err) {
        console.error('Invalid token', err);
        localStorage.removeItem('authToken');
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const signUp = async (data) => {
    try {
      const response = await axios.post("https://api.teenytechtrek.com/api/auth/register", data, {
        headers: { "Content-Type": "application/json" },
      });

      const token = response.data.Token;
      localStorage.setItem('authToken', token);

      const decoded = jwtDecode(token);
      const userId = decoded.userId || decoded.sub || decoded.nameid;
      
      setUser({ 
        userId,
        token,
        ...decoded 
      });

      return { user: decoded, error: null };
    } catch (err) {
      return {
        user: null,
        error: err.response?.data?.message || "Something went wrong",
      };
    }
  };

  const signIn = async (data) => {
    try {
      const response = await axios.post("https://api.teenytechtrek.com/api/auth/login", data, {
        headers: { "Content-Type": "application/json" },
      });
  
      const token = response.data.Token;
      localStorage.setItem('authToken', token);

      const decoded = jwtDecode(token);
      const userId = decoded.userId || decoded.sub || decoded.nameid;
      
      setUser({ 
        userId,
        token,
        ...decoded 
      });

      return { user: decoded, error: null };
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed";
      return { user: null, error: errorMessage };
    }
  };

  const signOut = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    return { error: null };
  };

  const value = {
    signUp,
    signIn,
    signOut,
    user,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};