const express = require('express');
const db = require('./db');
const router = express.Router();

// Obtener todos los usuarios
router.get('/', (req, res) => {
  db.all('SELECT id, nombre, usuario, email, rol FROM usuarios', [], (err, rows) => {
    if (err) return res.status(500).json({ mensaje: 'Error al obtener usuarios' });
    res.json(rows);
  });
});

// Crear un nuevo usuario
router.post('/', (req, res) => {
  const { nombre, usuario, email, rol } = req.body;
  if (!nombre || !usuario || !email || !rol) {
    return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
  }

  db.run(
    'INSERT INTO usuarios (nombre, usuario, email, rol) VALUES (?, ?, ?, ?)',
    [nombre, usuario, email, rol],
    function (err) {
      if (err) return res.status(500).json({ mensaje: 'Error al crear usuario' });
      res.json({ id: this.lastID, mensaje: 'Usuario creado' });
    }
  );
});

// Editar un usuario
router.put('/:id', (req, res) => {
  const { nombre, usuario, email, rol } = req.body;
  if (!nombre || !usuario || !email || !rol) {
    return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
  }

  db.run(
    'UPDATE usuarios SET nombre=?, usuario=?, email=?, rol=? WHERE id=?',
    [nombre, usuario, email, rol, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ mensaje: 'Error al actualizar usuario' });
      res.json({ mensaje: 'Usuario actualizado' });
    }
  );
});

// Eliminar un usuario
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM usuarios WHERE id=?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ mensaje: 'Error al eliminar usuario' });
    res.json({ mensaje: 'Usuario eliminado' });
  });
});

module.exports = router;
