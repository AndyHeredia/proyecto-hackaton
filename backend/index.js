const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Ruta de prueba para verificar conexión con React
app.get('/api/ping', (req, res) => {
  res.json({ mensaje: '¡Conexión exitosa con el Backend de Node.js!' });
});

const nasaRoutes = require('./routes/nasaRoutes');
// Usar las rutas
app.use('/api/nasa', nasaRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
