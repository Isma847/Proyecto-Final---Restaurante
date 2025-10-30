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

app.get('/usuarios', async function(req, res){
  const sql = 'SELECT * FROM usuario';
  const [result] = await connection.execute(sql);
  console.log(result)
  res.json(result);
});

app.post('/login', express.json(), async function(req, res){
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