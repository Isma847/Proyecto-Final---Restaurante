import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Menu() 
{
  const [platillos, setPlatillos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/platillos')
      .then(res => res.json())
      .then(data => {
        setPlatillos(data);
        setCargando(false);
      })
      .catch(err => {
        console.error('Error al obtener platillos:', err);
        setCargando(false);
      });
  }, []);

  const platillosFiltrados = platillos.filter(p => 
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (cargando) {
    return <div className="sidebar loading"><p>Cargando platillos...</p></div>;
  }

  return (
    <div className="sidebar">
      <h1>EL RESTO DE LA 5</h1>
      
      <div className="search-box">
        <input 
          type="text" 
          placeholder="Buscar platillos"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="sidebar-section">
        <h3>- MENÚ DEL DÍA -</h3>
        {platillosFiltrados.slice(0, 3).map(p => (
          <div key={p.id} className="menu-item">
            <div className="menu-item-content">
              <div className="menu-item-name">{p.nombre}</div>
              <div className="menu-item-price">${p.precio}</div>
              <div className="menu-item-desc">{p.descripcion}</div>
            </div>
            <div className="menu-item-placeholder"></div>
          </div>
        ))}
      </div>

      <div className="sidebar-section">
        <h3>- TRAGOS -</h3>
        {platillosFiltrados.slice(3, 6).map(p => (
          <div key={p.id} className="menu-item">
            <div className="menu-item-content">
              <div className="menu-item-name">{p.nombre}</div>
              <div className="menu-item-price">${p.precio}</div>
              <div className="menu-item-desc">{p.descripcion}</div>
            </div>
            <div className="menu-item-placeholder"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;