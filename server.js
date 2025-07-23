const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));
app.get('/avisos', (req, res) => res.sendFile(path.join(__dirname, 'public', 'avisos.html')));
app.get('/clientes', (req, res) => res.sendFile(path.join(__dirname, 'public', 'clientes.html')));
app.get('/usuarios', (req, res) => res.sendFile(path.join(__dirname, 'public', 'usuarios.html')));
app.get('/tickets', (req, res) => res.sendFile(path.join(__dirname, 'public', 'tickets.html')));
app.get('/ticket', (req, res) => res.sendFile(path.join(__dirname, 'public', 'ticket.html')));

app.use('/avisos', require('./avisos'));
app.use('/clientes', require('./clientes'));
app.use('/usuarios', require('./usuarios'));
app.use('/tickets', require('./tickets'));
app.use('/auth', require('./auth'));

require('./crearAdmin')();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
