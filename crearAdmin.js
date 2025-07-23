// crearAdmin.js
const db = require('./db');
const bcrypt = require('bcrypt');

function crearAdmin() {
  const passwordHash = bcrypt.hashSync('admin', 12);

  db.get("SELECT * FROM usuarios WHERE usuario = 'admin'", (err, row) => {
    if (row) {
      console.log("✅ Usuario 'admin' ya existe.");
    } else {
      db.run(
        'INSERT INTO usuarios (nombre, usuario, email, rol, password) VALUES (?, ?, ?, ?, ?)',
        ['David Gómez Rascón', 'admin', 'dgomez@idacas.es', 'Gestor', passwordHash],
        function (err) {
          if (err) {
            console.error("❌ Error al insertar admin:", err.message);
          } else {
            console.log("✅ Usuario 'admin' insertado correctamente.");
          }
        }
      );
    }
  });
}

module.exports = crearAdmin;
