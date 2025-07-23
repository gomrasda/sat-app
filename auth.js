// auth.js
const express = require('express');
const router = express.Router();
const db = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'secreto123';

// Login de usuario
router.post('/login', (req, res) => {
  const { usuario, password } = req.body;
  if (!usuario || !password) return res.status(400).json({ mensaje: 'Faltan datos' });

  db.get('SELECT * FROM usuarios WHERE usuario = ?', [usuario], (err, user) => {
    if (err) return res.status(500).json({ mensaje: 'Error interno' });
    if (!user) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    const passwordCorrecta = bcrypt.compareSync(password, user.password);
    if (!passwordCorrecta) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

    const token = jwt.sign({
      id: user.id,
      usuario: user.usuario,
      nombre: user.nombre,
      rol: user.rol
    }, SECRET, { expiresIn: '2h' });

    res.json({ token, nombre: user.nombre, rol: user.rol });
  });
});

module.exports = router;
