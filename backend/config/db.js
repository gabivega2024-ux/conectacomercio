const mysql = require("mysql2/promise");

const conexion = mysql.createPool({

    host: "localhost",

    user: "root",

    password: "",

    database: "conectacomercio_api"

});

console.log("MySQL conectado");

module.exports = conexion;