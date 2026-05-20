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

  // VERIFICAR SI EL EMAIL YA EXISTE
  db.query(
    'SELECT * FROM clientes WHERE email = ?',
    [email],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Error al verificar email' });

      if (result.length > 0) {
        return res.status(400).json({ error: 'Este correo ya está registrado' });
      }

      // SI NO EXISTE, REGISTRAR
      db.query(
        'INSERT INTO clientes (nombre, email, contrasena) VALUES (?, ?, ?)',
        [nombre, email, contrasena],
        (err, result) => {
          if (err) return res.status(500).json({ error: 'Error al registrar cliente' });
          res.status(201).json({ mensaje: 'Cliente registrado correctamente' });
        }
      );
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
            const cliente = resultCliente[0];
            return res.json({
              id: cliente.id,
              nombre: cliente.nombre,
              email: cliente.email,
              rol: 'cliente'
            });
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

// GUARDAR MENSAJE
app.post('/api/mensajes', (req, res) => {
  const { nombre, correo, asunto, mensaje } = req.body;

  db.query(
    'INSERT INTO mensajes (nombre, correo, asunto, mensaje) VALUES (?, ?, ?, ?)',
    [nombre, correo, asunto, mensaje],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Error al guardar mensaje' });
      }
      res.status(201).json({ mensaje: 'Mensaje guardado correctamente' });
    }
  );
});

// OBTENER MENSAJES
app.get('/api/mensajes', (req, res) => {
  db.query('SELECT * FROM mensajes', (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al obtener mensajes' });
    res.json(result);
  });
});

// ===============================
// OBTENER CARRITO DE UN CLIENTE
// ===============================
app.get('/api/carrito/:clienteId', (req, res) => {

  const clienteId = req.params.clienteId;

  db.query(`
    SELECT 
      carrito.id,
      carrito.cantidad,
      productos.id AS producto_id,
      productos.nombre,
      productos.precio,
      productos.imagen,
      productos.stock
    FROM carrito
    INNER JOIN productos 
      ON carrito.producto_id = productos.id
    WHERE carrito.cliente_id = ?
  `,
  [clienteId],
  (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Error al obtener carrito'
      });
    }

    // FORMATEAMOS LOS DATOS
    const carritoFormateado = result.map(item => ({
      producto: {
        id: item.producto_id,
        nombre: item.nombre,
        precio: item.precio,
        imagen: item.imagen,
        stock: item.stock
      },
      cantidad: item.cantidad
    }));

    res.json(carritoFormateado);

  });

});


// ===============================
// AGREGAR PRODUCTO AL CARRITO
// ===============================
app.post('/api/carrito', (req, res) => {

  const {
    cliente_id,
    producto_id,
    cantidad
  } = req.body;

  // VERIFICAMOS SI YA EXISTE
  db.query(
    'SELECT * FROM carrito WHERE cliente_id = ? AND producto_id = ?',
    [cliente_id, producto_id],
    (err, result) => {

      if (err) {
        console.log(err);
        return res.status(500).json({
          error: 'Error al verificar carrito'
        });
      }

      // SI YA EXISTE → ACTUALIZAMOS CANTIDAD
      if (result.length > 0) {

        db.query(
          'UPDATE carrito SET cantidad = cantidad + ? WHERE cliente_id = ? AND producto_id = ?',
          [cantidad, cliente_id, producto_id],
          (err2) => {

            if (err2) {
              console.log(err2);
              return res.status(500).json({
                error: 'Error al actualizar carrito'
              });
            }

            res.json({
              mensaje: 'Cantidad actualizada'
            });

          }
        );

      } else {

        // SI NO EXISTE → INSERTAMOS
        db.query(
          'INSERT INTO carrito (cliente_id, producto_id, cantidad) VALUES (?, ?, ?)',
          [cliente_id, producto_id, cantidad],
          (err3) => {

            if (err3) {
              console.log(err3);
              return res.status(500).json({
                error: 'Error al agregar producto'
              });
            }

            res.status(201).json({
              mensaje: 'Producto agregado al carrito'
            });

          }
        );

      }

    }
  );

});


// ===============================
// ACTUALIZAR CANTIDAD
// ===============================
app.put('/api/carrito', (req, res) => {

  const {
    cliente_id,
    producto_id,
    cantidad
  } = req.body;

  db.query(
    'UPDATE carrito SET cantidad = ? WHERE cliente_id = ? AND producto_id = ?',
    [cantidad, cliente_id, producto_id],
    (err, result) => {

      if (err) {
        console.log(err);
        return res.status(500).json({
          error: 'Error al actualizar cantidad'
        });
      }

      res.json({
        mensaje: 'Cantidad actualizada correctamente'
      });

    }
  );

});


// ===============================
// ELIMINAR PRODUCTO DEL CARRITO
// ===============================
app.delete('/api/carrito', (req, res) => {

  const {
    cliente_id,
    producto_id
  } = req.body;

  db.query(
    'DELETE FROM carrito WHERE cliente_id = ? AND producto_id = ?',
    [cliente_id, producto_id],
    (err, result) => {

      if (err) {
        console.log(err);
        return res.status(500).json({
          error: 'Error al eliminar producto'
        });
      }

      res.json({
        mensaje: 'Producto eliminado correctamente'
      });

    }
  );

});


// ===============================
// VACIAR CARRITO COMPLETO
// ===============================
app.delete('/api/carrito/vaciar/:clienteId', (req, res) => {

  const clienteId = req.params.clienteId;

  db.query(
    'DELETE FROM carrito WHERE cliente_id = ?',
    [clienteId],
    (err, result) => {

      if (err) {
        console.log(err);
        return res.status(500).json({
          error: 'Error al vaciar carrito'
        });
      }

      res.json({
        mensaje: 'Carrito vaciado correctamente'
      });

    }
  );

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor backend en puerto ${PORT}`);
});