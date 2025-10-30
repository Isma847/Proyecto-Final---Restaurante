import React from 'react';
import { useAuth } from '../context/AuthContext';
import Dashboard from './Dashboard';

function MainPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div>
        <p>No has iniciado sesión</p>
      </div>
    );
  }

  return <Dashboard />;
}

export default MainPage;