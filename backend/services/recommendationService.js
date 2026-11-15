const pool = require('../config/db');

const recommendSeeds = async (weatherParameters) => {
    try {
        const t2mData = weatherParameters.T2M || {};
        const soilData = weatherParameters.GWETTOP || {};

        // 1. Calculamos el promedio de temperatura del periodo
        const temperatures = Object.values(t2mData).filter(t => t !== -999);
        if (temperatures.length === 0) return { climaPromedio: {}, semillasRecomendadas: [] };
        const avgTemp = temperatures.reduce((acc, val) => acc + val, 0) / temperatures.length;

        // 2. Calculamos el promedio de humedad del suelo
        const soilValues = Object.values(soilData).filter(s => s !== -999);
        const avgSoil = soilValues.length > 0 
            ? soilValues.reduce((acc, val) => acc + val, 0) / soilValues.length 
            : null;

        // 3. Consultamos TODAS las semillas de tu base de datos en DBeaver
        const [rows] = await pool.query('SELECT * FROM semilla');

        // 4. Filtramos las semillas según los rangos de tu tabla y el clima real
        const recommended = rows.filter(seed => {
            // Evaluamos temperatura mínima y máxima
            const minTemp = seed.temp_min_c !== null ? Number(seed.temp_min_c) : -999;
            const maxTemp = seed.temp_max_c !== null ? Number(seed.temp_max_c) : 999;
            const matchesTemp = avgTemp >= minTemp && avgTemp <= maxTemp;

            // Evaluamos humedad del suelo (Mínima y Máxima)
            let matchesSoil = true;
            if (avgSoil !== null) {
                const minSoil = seed.humedad_suelo_min_p !== null ? Number(seed.humedad_suelo_min_p) : 0;
                const maxSoil = seed.humedad_suelo_max_p !== null ? Number(seed.humedad_suelo_max_p) : 1;
                
                // Verificamos que el promedio de la NASA esté entre el mínimo y el máximo de la semilla
                matchesSoil = avgSoil >= minSoil && avgSoil <= maxSoil;
            }


            return matchesTemp && matchesSoil;
        });

        return {
            climaPromedio: {
                temperaturaC: Number(avgTemp.toISOString ? avgTemp : avgTemp.toFixed(1)),
                humedadSueloPromedio: avgSoil !== null ? Number(avgSoil.toFixed(2)) : "No disponible"
            },
            semillasRecomendadas: recommended
        };

    } catch (error) {
        console.error('Error al consultar las semillas en la BD:', error.message);
        throw error;
    }
};

module.exports = { recommendSeeds };