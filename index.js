const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares necesarios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir frontend desde /public
app.use(express.static(path.join(__dirname, 'public')));

// Rutas a archivos frontend
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));
app.get('/avisos', (req, res) => res.sendFile(path.join(__dirname, 'public', 'avisos.html')));
app.get('/clientes', (req, res) => res.sendFile(path.join(__dirname, 'public', 'clientes.html')));
app.get('/usuarios', (req, res) => res.sendFile(path.join(__dirname, 'public', 'usuarios.html')));
app.get('/tickets', (req, res) => res.sendFile(path.join(__dirname, 'public', 'tickets.html')));
app.get('/ticket', (req, res) => res.sendFile(path.join(__dirname, 'public', 'ticket.html')));

// Rutas backend
app.use('/avisos', require('./avisos'));
app.use('/clientes', require('./clientes'));
app.use('/usuarios', require('./usuarios'));
app.use('/tickets', require('./tickets'));
app.use('/auth', require('./auth'));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

require('./crearAdmin')();
app.use('/auth', require('./auth'));
app.use('/avisos', require('./avisos'));
app.use('/usuarios', require('./usuarios'));

<script>
  const token = localStorage.getItem('token');
  if (!token) {
    // Si no hay token, redirige al login
    location.href = 'login.html';
  }
</script>

