require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host:     process.env.DB_HOST,
        port:     parseInt(process.env.DB_PORT), // Convert string to number
        dialect:  process.env.DB_DIALECT,
        dialectOptions: {
            options: {
                encrypt: process.env.DB_ENCRYPT === 'true', // Convert string to boolean
                trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true',
                useUTC: true  // Використовувати UTC для дати
            }
        }
    }
};