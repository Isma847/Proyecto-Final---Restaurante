import mysql from 'mysql2/promise';
import cors from 'cors';
import express from 'express';

const app = express();
app.use(cors());

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

app.get('/usuarios', (req, res) => {
  connection.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      res.status(500).send('Error al obtener usuarios');
      return;
    }
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log('Servidor activo en http://localhost:3000');
});