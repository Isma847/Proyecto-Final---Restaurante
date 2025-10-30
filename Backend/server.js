import mysql from 'mysql2/promise';
import cors from 'cors';
import express from 'express';

const app = express();
app.use(cors());
app.use(express.json()); // ← YA ESTÁ ACÁ, QUITÁ EL DE ABAJO

async function connectBD() {
    try {
        const c = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'restaurante'
        });
        console.log('✅ Conexión a MySQL establecida');
        return c;
    } catch(err) {
        console.log('❌ Error de conexión: ', err);
    }
}

const connection = await connectBD();

app.get('/', (req, res) => {
    res.json({ message: 'Backend funcionando' });
});

app.get('/usuarios', async function(req, res){
  const sql = 'SELECT * FROM usuario';
  const [result] = await connection.execute(sql);
  res.json(result);
});

// ¡CORREGÍ ESTA RUTA! QUITÁ express.json()
app.post('/login', async function(req, res){ // ← QUITÁ express.json() de aquí
  const { email, password } = req.body; 
  console.log('Login attempt:', email);
  
  const sql = 'SELECT id, nombre, tipo FROM usuario WHERE email = ? AND contraseña = ?';
  const [result] = await connection.execute(sql, [email, password]);
  
  console.log('Result:', result);
  res.json(result);
});

app.listen(3000, () => {
  console.log('✅ Servidor en http://localhost:3000');
  console.log('✅ Ruta /login DISPONIBLE');
});