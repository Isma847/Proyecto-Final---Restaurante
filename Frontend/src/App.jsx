import { useState } from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import MainPage from './pages/mainpage';
import InicioSesion from './pages/iniciosesion';
import NuevoPedidoPage from './pages/NuevoPedidoPage';
import Menu from './pages/Menu';

function App() 
{

  return (
    <div> 
       <Routes>
        <Route path="/" element={<InicioSesion />} />
        <Route path="/inicio" element={<MainPage />} />
        <Route path="/nuevo-pedido" element={<NuevoPedidoPage />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </div>
  )
}

export default App
