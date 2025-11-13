import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MainPage() {
  const [id, setId] = useState(0);
  const [tipo, setTipo] = useState(0);
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const i = localStorage.getItem('id');
    const t = localStorage.getItem('tipo');
    if (!i || !t) {
      window.location.href = "/";
      return;
    }
    setId(i);
    setTipo(Number(t));
    cargarPedidos();
  }, []);

  function cargarPedidos()
  {
    fetch('http://localhost:3000/pedidos/activos')
      .then(res => res.json())
      .then(data => setPedidos(data))
      .catch(err => console.error('Error al obtener pedidos:', err));
  };

  async function procesarPedido(pedidoId)
  {
    if (!window.confirm('¿Marcar este pedido como en proceso?')) return;
    await fetch('http://localhost:3000/procesarpedido', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: pedidoId })
    });
    cargarPedidos();
  };

  async function terminarPedido(pedidoId)
  {
    if (!window.confirm('¿Marcar este pedido como terminado?')) return;
    await fetch('http://localhost:3000/terminarpedido', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: pedidoId })
    });
    cargarPedidos();
  };

  async function completarPedido(pedidoId)
  {
    if (!window.confirm('¿Marcar este pedido como entregado?')) return;
    await fetch('http://localhost:3000/completepedido', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: pedidoId })
    });
    cargarPedidos();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Pedidos activos</h2>

      {tipo === 1 || tipo === 4 && (
        <Link to="/nuevo-pedido" style={{ display: 'inline-block', marginBottom: 10 }}>
          Crear nuevo pedido
        </Link>
      )}

      {pedidos.length === 0 ? (
        <p>No hay pedidos activos</p>
      ) : (
        pedidos.map(p => (
          <div key={p.id} style={{ border: '1px solid #ccc', marginBottom: 10, padding: 10 }}>
            <h3>Mesa {p.mesa}</h3>
            <p><strong>Estado: </strong>
              {p.enproceso === false && p.terminado === false ? 
                'Sin preparar' 
              : 
                (p.enproceso === true && p.terminado === false ?
                'Cocinando'
              :
                (p.enproceso === true && p.terminado === true ?
                'Listo para Entregar' : '...'
              ))}
            </p>
            <p><strong>Prioridad:</strong> {p.prioridad}</p>
            <p><strong>Total:</strong> ${p.total}</p>
            <h4>Items:</h4>
            <ul>
              {p.items.map((i, idx) => (
                <li key={idx}>
                  {i.nombre} - {i.cantidad} × ${i.precioplatillo} = ${i.total}
                </li>
              ))}
            </ul>
            {tipo === 2 || tipo === 4 && p.enproceso === false && (
              <button onClick={() => procesarPedido(p.id)}>Marcar como Procesando</button>
            )}
            {tipo === 2 || tipo === 4 && p.terminado === false && p.enproceso === true && (
              <button onClick={() => terminarPedido(p.id)}>Marcar como Terminado</button>
            )}
            {tipo === 1 || tipo === 4 && p.terminado == true && (
              <button onClick={() => completarPedido(p.id)}>Marcar como Entregado</button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default MainPage;
