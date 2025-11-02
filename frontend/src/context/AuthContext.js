import React, { createContext, useState, useContext, useEffect } from 'react';

// Skapa context
const AuthContext = createContext();

// Custom hook för att använda auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Kolla om användare är inloggad när appen startar
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('userData');
      
      if (token && userData) {
        setUser(JSON.parse(userData));
        
        // Validera token med backend (valfritt)
        try {
          const response = await fetch('http://localhost:8080/auth/verify', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (!response.ok) {
            throw new Error('Token invalid');
          }
        } catch (err) {
          // Token är ogiltig, logga ut
          logout();
        }
      }
    } catch (err) {
      console.error('Auth check error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Google Login funktion
const login = async (idToken) => {
  try {
    setError('');
    setLoading(true);

    const response = await fetch('http://localhost:8080/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    });

    const data = await response.json(); // 👈 Detta kommer fungera nu
    
    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }

    // Spara i localStorage
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('userData', JSON.stringify(data.user));
    
    setUser(data.user);
    return data;
  } catch (err) {
    setError(err.message);
    console.error('Login error:', err);
    throw err;
  } finally {
    setLoading(false);
  }
};

  // Logout funktion
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
    setError('');
  };

  // Uppdatera användardata
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('userData', JSON.stringify(updatedUser));
  };

  // Context value
  const value = {
    user,
    login,
    logout,
    loading,
    error,
    setError,
    updateUser,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};