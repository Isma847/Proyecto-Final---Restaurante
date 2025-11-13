import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Menu() 
{
  const [platillos, setPlatillos] = useState([]);
  const [cargando, setCargando] = useState(true);
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

  if (cargando) {
    return <p style={{ textAlign: 'center' }}>Cargando platillos...</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Menu</h2>

      {platillos.length === 0 ? (
        <p>No hay platillos disponibles.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
          {platillos.map(p => (
            <div
              key={p.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '10px',
                padding: '15px',
                backgroundColor: '#f8f8f8',
                boxShadow: '2px 2px 5px rgba(0,0,0,0.1)',
              }}
            >
              <h3 style={{ marginBottom: '10px' }}>{p.nombre}</h3>
              <p><strong>Precio:</strong> ${p.precio}</p>
              <p style={{ fontStyle: 'italic', color: '#555' }}>{p.descripcion}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Menu;