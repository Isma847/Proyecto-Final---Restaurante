import { useAuth } from './context/AuthContext.jsx'
import './App.css'  // ← Ahora está en la raíz
import { Routes, Route, Navigate } from 'react-router-dom'
import MainPage from './pages/MainPage.jsx'
import Login from './pages/Login.jsx'

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Cargando...</div>
  }

  return (
    <div className="app">
      <Routes>
        <Route 
          path="/" 
          element={user ? <Navigate to="/Inicio" /> : <Login />} 
        />
        <Route 
          path="/Inicio" 
          element={user ? <MainPage /> : <Navigate to="/" />} 
        />
      </Routes>
    </div>
  )
}

export default App