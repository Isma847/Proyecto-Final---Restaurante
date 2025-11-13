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

  const getEstadoBadge = (enproceso, terminado) => {
    if (enproceso === false && terminado === false) {
      return <span className="estado-badge ocupada">Ocupada</span>;
    } else if (enproceso === true && terminado === false) {
      return <span className="estado-badge desocupada">Cocinando</span>;
    } else if (enproceso === true && terminado === true) {
      return <span className="estado-badge desocupada">Listo</span>;
    }
  };

  return (
    <div className="main-content inicio-page">
      <div className="content-wrapper">
        <div className="page-header">
          <h1>El Resto de la 5</h1>
          <p className="subtitle">Pedidos Activos</p>
        </div>

        <div className="action-bar">
          {(tipo === 1 || tipo === 4) && (
            <Link to="/nuevo-pedido" className="btn">
              Crear nuevo pedido
            </Link>
          )}
        </div>

        {pedidos.length === 0 ? (
          <div className="empty-state">
            <p>No hay pedidos activos</p>
          </div>
        ) : (
          <div className="pedidos-grid">
            {pedidos.map(p => (
              <div key={p.id} className="pedido-card">
                <div className="pedido-header">
                  <h3>Mesa {p.mesa}</h3>
                  {getEstadoBadge(p.enproceso, p.terminado)}
                </div>
                
                <div className="pedido-info">
                  <p>
                    <strong>Prioridad:</strong>
                    <span>{p.prioridad === 1 ? 'Normal' : 'Alta'}</span>
                  </p>
                </div>

                {p.items && p.items.length > 0 && (
                  <div className="pedido-items">
                    <ul>
                      {p.items.map((i, idx) => (
                        <li key={idx}>
                          {i.nombre} x{i.cantidad} - ${i.total}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pedido-total">Total: ${p.total}</div>

                <div className="pedido-actions">
                  {(tipo === 2 || tipo === 4) && p.enproceso === false && (
                    <button onClick={() => procesarPedido(p.id)}>Procesando</button>
                  )}
                  {(tipo === 2 || tipo === 4) && p.terminado === false && p.enproceso === true && (
                    <button onClick={() => terminarPedido(p.id)}>Terminado</button>
                  )}
                  {(tipo === 1 || tipo === 4) && p.terminado === true && (
                    <button onClick={() => completarPedido(p.id)}>Entregado</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MainPage;
