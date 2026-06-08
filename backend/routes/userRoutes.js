// Importa el framework Express
const express =
require("express");

// Crea una instancia del enrutador de Express
const router =
express.Router();

// Importa las funciones del controlador de usuarios
const {

 getUsers,
 createUser,
 updateUser,
 deleteUser

} = require(
 "../controllers/userController"
);

// Ruta para obtener la lista de usuarios
// Método HTTP: GET
// URL: /users
router.get(
 "/users",
 getUsers
);

// Ruta para crear un nuevo usuario
// Método HTTP: POST
// URL: /users
router.post(
 "/users",
 createUser
);

// Ruta para actualizar un usuario existente
// Método HTTP: PUT
// URL: /users/:id
// :id representa el identificador del usuario a modificar
router.put(
 "/users/:id",
 updateUser
);

// Ruta para eliminar un usuario
// Método HTTP: DELETE
// URL: /users/:id
// :id representa el identificador del usuario a eliminar
router.delete(
 "/users/:id",
 deleteUser
);

// Exporta el enrutador para ser utilizado en la aplicación principal
module.exports =
router;