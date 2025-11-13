import mysql from 'mysql2/promise';
import cors from 'cors';
import express from 'express';
import { Pedido, Item } from './pedidoclass.js';

const app = express();
app.use(cors());
app.use(express.json());

/*
  Tipos de usuario
  1- Mesero
  2- Cocinero
  3- Recepcionista
  4- Admin
*/

var pedidos = [];

async function connectBD() 
{
    try{
        const c = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'restaurante'
        });
        console.log('conexion establecida');
        return c;
    }
    catch(err)
    {
        console.log('error de conexion: ', err);
    }
}

const connection = await connectBD();

connection.connect(err => {
  if (err) {
    console.error('Error al conectar a MySQL:', err);
    return;
  }
  console.log('Conectado a MySQL');
});

app.get('/usuarios', async function(req, res)
{
  const sql = 'SELECT * FROM usuario';
  const [result] = await connection.execute(sql);
  res.json(result);
});

app.get('/platillos', async (req, res) => {
  try {
    const [rows] = await connection.execute('SELECT * FROM platillo');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener platillos' });
  }
});

app.get('/pedidos/cerrados', async function(req, res)
{
  const sql = 'SELECT * FROM pedido';
  const [result] = await connection.execute(sql);
  res.json(result);
});

app.get('/pedidos/activos', async function (req, res) {
  try {
    const allItems = pedidos.flatMap(p => p.items);
    const uniqueIds = [...new Set(allItems.map(i => i.idplatillo))];

    if (uniqueIds.length === 0) 
    {
      return res.json([]);
    }

    const placeholders = uniqueIds.map(() => '?').join(',');
    const [rows] = await connection.execute(
      `SELECT id, nombre FROM platillo WHERE id IN (${placeholders})`,
      uniqueIds
    );

    const nombrePorId = {};
    rows.forEach(r => (nombrePorId[r.id] = r.nombre));

    const pedidosConNombres = pedidos.map(p => ({
      id: p.id,
      mesa: p.mesa,
      prioridad: p.prioridad,
      total: p.total,
      enproceso: p.enproceso,
      terminado: p.terminado,
      items: p.items.map(i => ({
        cantidad: i.cantidad,
        idplatillo: i.idplatillo,
        nombre: nombrePorId[i.idplatillo] || 'Desconocido',
        precioplatillo: i.precioplatillo,
        total: i.total
      }))
    }));

    res.json(pedidosConNombres);
  } catch (err) {
    console.error('Error al obtener pedidos activos:', err);
    res.status(500).json({ error: 'Error al obtener pedidos activos' });
  }
});

app.post('/procesarpedido', async function (req, res) {
  try {
    const { id } = req.body;

    const index = pedidos.findIndex(element => element.id === id);

    if(index === -1) 
    {
      return res.status(404).json({ ok: false, error: 'Pedido no encontrado' });
    }

    pedidos[index].enproceso = true;
    res.json({ ok: true, mensaje: `Pedido ${id} ahora está en proceso`, pedido: pedidos[index] });
  } 
  catch (err) 
  {
    console.error('Error en /procesarpedido:', err);
    res.status(500).json({ ok: false, error: 'Error al procesar pedido' });
  }
});

app.post('/terminarpedido', async function (req, res) {
  try {
    const { id } = req.body;

    const index = pedidos.findIndex(element => element.id === id);

    if(index === -1) 
    {
      return res.status(404).json({ ok: false, error: 'Pedido no encontrado' });
    }

    pedidos[index].terminado = true;
    res.json({ ok: true, mensaje: `Pedido ${id} ahora está terminado`, pedido: pedidos[index] });
  } 
  catch (err) 
  {
    console.error('Error en /procesarpedido:', err);
    res.status(500).json({ ok: false, error: 'Error al procesar pedido' });
  }
});

let nextPedidoId = 1;

app.post('/addpedido', async function (req, res) 
{
  try 
  {
    const { mesa, prioridad, items } = req.body;

    const itemsObj = items.map(i => new Item(i.cantidad, i.idplatillo, i.precioplatillo));
    const pedido = new Pedido(nextPedidoId++, mesa, prioridad, itemsObj);

    pedidos.push(pedido);

    res.json({ ok: true, mensaje: 'Pedido agregado correctamente', pedido });
  } 
  catch (err) 
  {
    res.status(500).json({ ok: false, error: 'Error al agregar pedido' });
  }
});

app.post('/completepedido', async function (req, res) 
{
  try 
  {
    const { id } = req.body;

    const index = pedidos.findIndex(p => p.id === id);
    if(index === -1) 
    {
      return res.status(404).json({ ok: false, error: 'Pedido no encontrado' });
    }

    const pedido = pedidos[index];

    pedidos.splice(index, 1);

    const sql = 'INSERT INTO pedido (idMesa, precioTotal, pedido) VALUES (?, ?, ?)';
    await connection.execute(sql, [pedido.mesa, pedido.total, JSON.stringify(pedido.items)]);
    res.json({ ok: true, mensaje: 'Pedido completado y guardado en la base de datos' });
  } 
  catch (err) 
  {
    res.status(500).json({ ok: false, error: 'Error al completar pedido' });
  }
});

app.post('/login', express.json(), async function(req, res)
{
  const { email, password } = req.body; 
  console.log(email);
  const sql = 'SELECT id, tipo FROM usuario WHERE email=? AND contraseña=?';
  const [result] = await connection.execute(sql, [email, password]);
  console.log(result);
  res.json(result);
});

app.listen(3000, () => {
  console.log('Servidor activo en http://localhost:3000');
});