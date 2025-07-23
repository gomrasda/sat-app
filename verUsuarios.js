const db = require('./db');

db.all('SELECT id, nombre, usuario, email, rol FROM usuarios', [], (err, rows) => {
  if (err) {
    console.error('❌ Error al obtener usuarios:', err.message);
  } else {
    console.table(rows);
  }
});
