
const express = require('express');
const db = require('./db');
const router = express.Router();

router.get('/', (req, res) => {
  db.all('SELECT id, nombre, usuario, email, rol FROM usuarios', [], (err, rows) => {
    if (err) return res.status(500).json({ mensaje: 'Error al obtener usuarios' });
    res.json(rows);
  });
});

router.delete('/:id', (req, res) => {
  db.run('DELETE FROM usuarios WHERE id=?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ mensaje: 'Error al eliminar usuario' });
    res.json({ mensaje: 'Usuario eliminado' });
  });
});

module.exports = router;
