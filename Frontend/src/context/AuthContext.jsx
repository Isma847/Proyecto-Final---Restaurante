import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('id');
    const userType = localStorage.getItem('tipo');
    
    if (userId && userType) {
      setUser({
        id: userId,
        tipo: parseInt(userType)
      });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      console.log('🔐 Enviando login...');
      
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password }),
      });
      
      console.log('📡 Respuesta recibida:', response.status);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('📊 Datos recibidos:', data);
      
      if (data.length > 0) {
        const userData = data[0];
        setUser({
          id: userData.id,
          nombre: userData.nombre,
          tipo: userData.tipo
        });
        localStorage.setItem('id', userData.id);
        localStorage.setItem('tipo', userData.tipo);
        localStorage.setItem('nombre', userData.nombre);
        return { success: true };
      } else {
        return { success: false, error: 'Credenciales incorrectas' };
      }
    } catch (error) {
      console.error('💥 Error en login:', error);
      return { success: false, error: 'No se pudo conectar al servidor' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('id');
    localStorage.removeItem('tipo');
    localStorage.removeItem('nombre');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 