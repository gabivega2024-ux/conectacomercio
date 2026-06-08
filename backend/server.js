// Importa el framework Express para crear el servidor
const express =
require("express");

// Importa CORS para permitir solicitudes desde otros dominios
const cors =
require("cors");

// Importa las rutas de autenticación
const authRoutes =
require("./routes/authRoutes");

// Importa las rutas de gestión de usuarios
const userRoutes =
require("./routes/userRoutes");

// Crea una instancia de la aplicación Express
const app =
express();

// Habilita CORS para permitir la comunicación
// entre el frontend y el backend
app.use(cors());

// Permite recibir y procesar datos en formato JSON
app.use(express.json());

// Registra las rutas de autenticación
// Todas estarán precedidas por /api
app.use(
 "/api",
 authRoutes
);

// Registra las rutas de usuarios
// Todas estarán precedidas por /api
app.use(
 "/api",
 userRoutes
);

// Inicia el servidor en el puerto 3001
app.listen(
 3001,
 () => {

  // Mensaje que confirma que el servidor está funcionando
  console.log(
   "Servidor puerto 3001"
  );

 }
);