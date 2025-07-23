
const express = require('express');
const router = express.Router();
const db = require('./db');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
  const { nombre_completo, usuario, email, password, rol } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  db.run(`INSERT INTO usuarios (nombre, usuario, email, password, rol) VALUES (?, ?, ?, ?, ?)`,
    [nombre_completo, usuario, email, hashed, rol],
    function(err) {
      if (err) return res.status(500).json({ mensaje: 'Error al registrar' });
      res.json({ id: this.lastID });
    });
});

module.exports = router;
