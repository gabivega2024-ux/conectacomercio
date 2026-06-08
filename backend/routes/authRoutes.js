// Importa el framework Express
const express =
require("express");

// Crea una instancia del enrutador de Express
const router =
express.Router();

// Importa las funciones del controlador de autenticación
const {
 register,
 login
} =
require("../controllers/authController");

// Ruta para registrar un nuevo usuario
// Método HTTP: POST
// URL: /register
router.post(
 "/register",
 register
);

// Ruta para iniciar sesión
// Método HTTP: POST
// URL: /login
router.post(
 "/login",
 login
);

// Exporta el enrutador para utilizarlo en la aplicación principal
module.exports =
router;