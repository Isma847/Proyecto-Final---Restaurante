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
    if (data.ok) {
      alert('Pedido enviado correctamente');
      navigate('/inicio');
    } else {
      alert('Error al enviar el pedido');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Crear nuevo pedido</h2>

      <div>
        <label>Mesa: </label>
        <input
          type="number"
          value={mesa}
          onChange={e => setMesa(e.target.value)}
          placeholder="N° de mesa"
        />
      </div>

      <div>
        <label>Prioridad: </label>
        <select value={prioridad} onChange={e => setPrioridad(Number(e.target.value))}>
          <option value={1}>Normal</option>
          <option value={2}>Alta</option>
        </select>
      </div>

      <h3>Agregar item</h3>
      <div>
        <select value={idPlatillo} onChange={e => setIdPlatillo(e.target.value)}>
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
          style={{ width: '60px', marginLeft: '10px' }}
        />

        <button onClick={agregarItem} style={{ marginLeft: '10px' }}>Agregar</button>
      </div>

      <h4>Items agregados:</h4>
      <ul>
        {items.map((i, idx) => (
          <li key={idx}>
            {i.nombre} — {i.cantidad} × ${i.precioplatillo} = ${i.cantidad * i.precioplatillo}
          </li>
        ))}
      </ul>

      <h3>Total: ${total}</h3>

      <button onClick={enviarPedido} style={{ marginTop: '10px' }}>Enviar pedido</button>
    </div>
  );
}

export default NuevoPedidoPage;
