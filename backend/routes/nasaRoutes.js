const express = require('express');
const router = express.Router();
const { getWeatherData } = require('../controllers/nasaController');

// Definimos la ruta GET /api/nasa/clima
router.get('/clima', getWeatherData);

module.exports = router;