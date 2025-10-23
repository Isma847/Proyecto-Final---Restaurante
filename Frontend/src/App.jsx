import { useState } from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import MainPage from './pages/mainpage';
import InicioSesion from './pages/iniciosesion';

function App() 
{

  return (
    <div> 
       <Routes>
        <Route path="/" element={<InicioSesion />} />
        <Route path="/Inicio" element={<MainPage />} />
      </Routes>
    </div>
  )
}

export default App
