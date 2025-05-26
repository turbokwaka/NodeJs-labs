module.exports = {
    development: {
        username: "sa",
        password: "superCool556677",
        database: "Kino",
        host:     "31.43.170.177",
        port:     1433,
        dialect:  "mssql",
        dialectOptions: {
            options: {
                encrypt: false,
                trustServerCertificate: true
            }
        }
    }
};
