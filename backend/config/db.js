const mysql = require('mysql2/promise');
require('dotenv').config();

// Creamos un pool de conexiones (la forma más eficiente y recomendada)
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Verificamos que la conexión sea exitosa al arrancar
pool.getConnection()
    .then(connection => {
        console.log('¡Conexión exitosa a la Base de Datos en MySQL/DBeaver!');
        connection.release(); // Liberamos la conexión
    })
    .catch(err => {
        console.error('Error al conectar a la Base de Datos:', err.message);
    });

module.exports = pool;