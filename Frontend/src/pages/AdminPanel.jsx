import React, { useState } from 'react'

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('usuarios')

  return (
    <div style={{ 
      background: 'white', 
      borderRadius: '12px', 
      padding: '2rem', 
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)' 
    }}>
      <h2 style={{ 
        color: '#333', 
        marginBottom: '1.5rem', 
        borderBottom: '2px solid #667eea', 
        paddingBottom: '0.5rem' 
      }}>
        Panel de Administración
      </h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1rem', 
        marginBottom: '2rem' 
      }}>
        <button 
          style={{ 
            background: activeTab === 'usuarios' ? '#667eea' : '#ecf0f1',
            color: activeTab === 'usuarios' ? 'white' : '#666',
            border: 'none',
            padding: '1rem',
            fontSize: '1rem'
          }}
          onClick={() => setActiveTab('usuarios')}
        >
          👥 Gestión de Usuarios
        </button>
        <button 
          style={{ 
            background: activeTab === 'menu' ? '#667eea' : '#ecf0f1',
            color: activeTab === 'menu' ? 'white' : '#666',
            border: 'none',
            padding: '1rem',
            fontSize: '1rem'
          }}
          onClick={() => setActiveTab('menu')}
        >
          📋 Gestión de Menú
        </button>
      </div>

      <div style={{ 
        background: 'white', 
        borderRadius: '8px', 
        padding: '2rem' 
      }}>
        <h3>Gestión de {activeTab === 'usuarios' ? 'Usuarios' : 'Menú'}</h3>
        <p>Funcionalidad en desarrollo...</p>
      </div>
    </div>
  )
}

export default AdminPanel