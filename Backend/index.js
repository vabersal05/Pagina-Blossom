const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

// RUTA DE PRUEBA
app.get('/', (req, res) => {
  res.send('Api Blossom funcionando correctamente');
});

// REGISTRO DE CLIENTES
app.post('/api/registrarse', (req, res) => {
  const { nombre, email, contrasena } = req.body;

  console.log('Datos recibidos:', { nombre, email, contrasena });

  db.query(
    'INSERT INTO clientes (nombre, email, contrasena) VALUES (?, ?, ?)',
    [nombre, email, contrasena],
    (err, result) => {
      if (err) {
        console.log('Error SQL:', err);
        return res.status(500).json({ error: 'Error al registrar cliente' });
      }
      res.status(201).json({ mensaje: 'Cliente registrado correctamente' });
    }
  );
});

// INICIO DE SESION
app.post('/api/iniciar-sesion', (req, res) => {
  const { usuario, contrasena } = req.body;

  // ANALIZAMOS PRIMERO SI ES EL ADMINISTRADOR
  db.query(
    'SELECT * FROM admin WHERE Usuario = ? AND Password = ?',
    [usuario, contrasena],
    (err, resultAdmin) => {
      if (resultAdmin.length > 0) {
        return res.json({ rol: 'admin' });
      }

      //SI NO ES EL ADMINISTRADOR, ENTONCES ES EL CLIENTE   
      db.query(
        'SELECT * FROM clientes WHERE email = ? AND contrasena = ?',
        [usuario, contrasena],
        (err, resultCliente) => {
          if (resultCliente.length > 0) {
            return res.json({ rol: 'cliente' });
          }
          return res.status(401).json({ error: 'Credenciales incorrectas' });
        }
      );
    }
  );
});

// OBTENER TODOS LOS PRODUCTOS
app.get('/api/productos', (req, res) => {
  db.query('SELECT * FROM productos', (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al obtener productos' });
    res.json(result);
  });
});

// OBTENER PRODUCTO POR ID
app.get('/api/productos/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM productos WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al obtener producto' });
    if (result.length === 0) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(result[0]);
  });
});

// CREAR PRODUCTO
app.post('/api/productos', (req, res) => {
  const { nombre, categoria, marca, precio, stock, imagen, descripcion } = req.body;
  db.query(
    'INSERT INTO productos (nombre, categoria, marca, precio, stock, imagen, descripcion) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [nombre, categoria, marca, precio, stock, imagen, descripcion],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Error al crear producto' });
      res.status(201).json({ mensaje: 'Producto creado correctamente' });
    }
  );
});

// ACTUALIZAR PRODUCTO
app.put('/api/productos/:id', (req, res) => {
  const id = req.params.id;
  const { nombre, categoria, marca, precio, stock, imagen, descripcion } = req.body;
  db.query(
    'UPDATE productos SET nombre=?, categoria=?, marca=?, precio=?, stock=?, imagen=?, descripcion=? WHERE id=?',
    [nombre, categoria, marca, precio, stock, imagen, descripcion, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Error al actualizar producto' });
      res.json({ mensaje: 'Producto actualizado correctamente' });
    }
  );
});

// ELIMINAR PRODUCTO
app.delete('/api/productos/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM productos WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar producto' });
    res.json({ mensaje: 'Producto eliminado correctamente' });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend en puerto ${PORT}`);
});