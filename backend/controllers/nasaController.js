const axios = require('axios');
const { recommendSeeds } = require('../services/recommendationService'); // Importamos nuestro servicio de la BD

const getWeatherData = async (req, res) => {
    try {
        const { lat, lon, start, end, parameters } = req.query;

        if (!lat || !lon || !start || !end) {
            return res.status(400).json({ 
                error: 'Faltan parámetros obligatorios: lat, lon, start, end (formato YYYYMMDD)' 
            });
        }

        // Pedimos por defecto temperatura y humedad superficial del suelo (GWETTOP) para cruzar con la BD
        const selectedParameters = parameters || 'T2M,RH2M,PRECTOTCORR,WS2M,GWETTOP';

        const nasaUrl = `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=${selectedParameters}&community=RE&longitude=${lon}&latitude=${lat}&start=${start}&end=${end}&format=JSON`;

        const response = await axios.get(nasaUrl);
        const weatherParameters = response.data.properties.parameter;

        // EJECUTAMOS LA CONSULTA A LA BD USANDO AWAIT
        const recomendacionResult = await recommendSeeds(weatherParameters);

        res.status(200).json({
            success: true,
            ubicacion: { latitude: lat, longitude: lon },
            periodo: { start, end },
            analisisClima: recomendacionResult.climaPromedio,
            semillasRecomendadas: recomendacionResult.semillasRecomendadas,
            datosCrudosNASA: weatherParameters
        });

    } catch (error) {
        console.error('Error al procesar la petición:', error.message);
        res.status(500).json({ 
            success: false, 
            error: 'Error interno al obtener los datos o consultar la base de datos' 
        });
    }
};

module.exports = { getWeatherData };