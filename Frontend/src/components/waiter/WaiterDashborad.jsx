import React, { useState } from 'react'

const WaiterDashboard = () => {
  const [activeTab, setActiveTab] = useState('mesas')

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
        Panel de Mozo
      </h2>
      
      <nav style={{ 
        display: 'flex', 
        gap: '1rem', 
        marginBottom: '2rem', 
        borderBottom: '1px solid #ddd', 
        paddingBottom: '1rem' 
      }}>
        <button 
          style={{ 
            background: activeTab === 'mesas' ? '#667eea' : 'none',
            color: activeTab === 'mesas' ? 'white' : '#666',
            border: 'none',
            padding: '0.8rem 1.5rem',
            borderRadius: '6px'
          }}
          onClick={() => setActiveTab('mesas')}
        >
          Mis Mesas
        </button>
        <button 
          style={{ 
            background: activeTab === 'pedidos' ? '#667eea' : 'none',
            color: activeTab === 'pedidos' ? 'white' : '#666',
            border: 'none',
            padding: '0.8rem 1.5rem',
            borderRadius: '6px'
          }}
          onClick={() => setActiveTab('pedidos')}
        >
          Tomar Pedido
        </button>
      </nav>

      <div>
        {activeTab === 'mesas' && (
          <div>
            <h3>Mis Mesas Asignadas</h3>
            <p>Funcionalidad en desarrollo...</p>
          </div>
        )}
        {activeTab === 'pedidos' && (
          <div>
            <h3>Tomar Pedido</h3>
            <p>Funcionalidad en desarrollo...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default WaiterDashboard