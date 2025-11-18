import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NuevoPedidoPage() {
  const [mesa, setMesa] = useState('');
  const [prioridad, setPrioridad] = useState(1);
  const [items, setItems] = useState([]);
  const [platillos, setPlatillos] = useState([]);
  const [cantidad, setCantidad] = useState(1);
  const [idPlatillo, setIdPlatillo] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/platillos')
      .then(res => res.json())
      .then(data => setPlatillos(data))
      .catch(err => console.error('Error al obtener platillos:', err));
  }, []);

  const agregarItem = () => {
    if (!idPlatillo) return alert('Selecciona un platillo');
    const plat = platillos.find(p => p.id == idPlatillo);
    if (!plat) return;
    setItems(prev => [
      ...prev,
      { cantidad, idplatillo: plat.id, precioplatillo: plat.precio, nombre: plat.nombre }
    ]);
    setIdPlatillo('');
    setCantidad(1);
  };

  const eliminarItem = (index) => {
    setItems(prev => prev.filter((_, idx) => idx !== index));
  };

  const total = items.reduce((sum, i) => sum + i.precioplatillo * i.cantidad, 0);

  const enviarPedido = async () => {
    if (!mesa || items.length === 0) {
      alert('Completa los datos del pedido');
      return;
    }

    const res = await fetch('http://localhost:3000/addpedido', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mesa, prioridad, items })
    });

    const data = await res.json();
    if(data.ok) 
    {
      navigate('/inicio');
    }
  };

  return (
    <div className="main-content">
      <div className="content-wrapper">
        <div className="nuevo-pedido-container">
          <div className="form-card">
            <h2>Tomar pedido</h2>

            <h3>Información del Pedido</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="mesa">Mesa:</label>
                <input
                  id="mesa"
                  type="number"
                  value={mesa}
                  onChange={e => setMesa(e.target.value)}
                  placeholder="N° de mesa"
                  min="1"
                />
              </div>

              <div className="form-group">
                <label htmlFor="prioridad">Prioridad:</label>
                <select 
                  id="prioridad"
                  value={prioridad} 
                  onChange={e => setPrioridad(Number(e.target.value))}
                >
                  <option value={1}>Normal</option>
                  <option value={2}>Alta</option>
                </select>
              </div>
            </div>

            <h3>Agregar Productos</h3>
            
            <div className="agregar-item">
              <select 
                value={idPlatillo} 
                onChange={e => setIdPlatillo(e.target.value)}
              >
                <option value="">Seleccionar platillo</option>
                {platillos.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.nombre} - ${p.precio}
                  </option>
                ))}
              </select>

              <input
                type="number"
                min={1}
                value={cantidad}
                onChange={e => setCantidad(Number(e.target.value))}
              />

              <button onClick={agregarItem}>Agregar</button>
            </div>

            {items.length > 0 && (
              <div className="items-agregados">
                <h4>Productos agregados</h4>
                <ul>
                  {items.map((i, idx) => (
                    <li key={idx}>
                      <span>
                        <span>{i.nombre}</span>
                        <span style={{fontSize: '0.9em', color: 'var(--dark-gray)', marginLeft: '0.5rem'}}>
                          {i.cantidad}x ${i.precioplatillo}
                        </span>
                      </span>
                      <div>
                        <span>${i.cantidad * i.precioplatillo}</span>
                        <button 
                          onClick={() => eliminarItem(idx)}
                          className="item-delete"
                        >
                          Eliminar
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="resumen-pedido">
            <h3>Total: ${total}</h3>
            <button onClick={enviarPedido}>
              Subir pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NuevoPedidoPage;
