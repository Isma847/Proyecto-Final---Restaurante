import React from 'react'
import { useAuth } from '../../context/AuthContext.jsx'

const Header = () => {
  const { user, logout } = useAuth()

  const getRoleName = (tipo) => {
    const roles = {
      1: 'Administrador',
      2: 'Mozo',
      3: 'Chef/Cocina',
      4: 'Recepción'
    }
    return roles[tipo] || 'Usuario'
  }

  return (
    <header style={{ 
      background: 'white', 
      padding: '1.5rem 2rem', 
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
      marginBottom: '2rem' 
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#333' }}>
            Restó de la 5
          </h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>
            Bienvenido, {user?.nombre} - {getRoleName(user?.tipo)}
          </p>
        </div>
        <button onClick={logout} style={{ background: '#e74c3c' }}>
          Cerrar Sesión
        </button>
      </div>
    </header>
  )
}

export default Header