import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import Header from '../components/common/Header.jsx'
import WaiterDashboard from '../components/waiter/WaiterDashborad.jsx'
import KitchenDashboard from '../components/kitchen/KitchenDashboard.jsx'
import AdminPanel from './AdminPanel.jsx'
import ReceptionDashboard from '../components/reception/ReceptionDashboard.jsx'
import { getMesas, getPlatillos } from '../services/api.js'

const Dashboard = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({ mesas: [], platillos: [] })

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [mesasData, platillosData] = await Promise.all([
          getMesas(),
          getPlatillos()
        ])
        setData({
          mesas: mesasData,
          platillos: platillosData
        })
      } catch (error) {
        console.error('Error cargando datos iniciales:', error)
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      loadInitialData()
    }
  }, [user])

  const renderDashboard = () => {
    if (loading) {
      return <div>Cargando datos...</div>
    }

    switch (user.tipo) {
      case 1: // Administrador
        return <AdminPanel data={data} />
      case 2: // Mozo
        return <WaiterDashboard data={data} />
      case 3: // Chef/Cocina
        return <KitchenDashboard data={data} />
      case 4: // Recepción
        return <ReceptionDashboard data={data} />
      default:
        return (
          <div className="role-section">
            <h2>Panel de Usuario</h2>
            <p>Bienvenido al sistema del Restó de la 5</p>
            <p>Mesas en sistema: {data.mesas.length}</p>
            <p>Platillos en menú: {data.platillos.length}</p>
          </div>
        )
    }
  }

  return (
    <div className="dashboard">
      <Header />
      <div className="container">
        {renderDashboard()}
      </div>
    </div>
  )
}

export default Dashboard