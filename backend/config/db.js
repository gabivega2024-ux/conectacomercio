// Importa la librería mysql2 para conectar Node.js con MySQL
const mysql = require("mysql2");

// Crea la configuración de conexión a la base de datos
const conexion = mysql.createConnection({

    // Dirección del servidor MySQL
    host: "localhost",

    // Usuario de la base de datos
    user: "root",

    // Contraseña del usuario (vacía en este caso)
    password: "",

    // Nombre de la base de datos a utilizar
    database: "conectacomercio_api"
});

// Intenta establecer la conexión con la base de datos
conexion.connect((error) => {

    // Verifica si ocurrió algún error durante la conexión
    if (error) {

        // Muestra el error en la consola
        console.log(error);

    } else {

        // Mensaje de éxito si la conexión fue establecida
        console.log("MySQL conectado");

    }

});

// Exporta la conexión para poder utilizarla en otros archivos del proyecto
module.exports = conexion;