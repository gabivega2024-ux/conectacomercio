// Importa la librería Axios para realizar solicitudes HTTP
import axios from "axios";

// URL base de la API del backend
const API =
"http://127.0.0.1:3001/api";


/**
 * Función para autenticar un usuario
 * Envía una solicitud POST al endpoint /login
 */
export const loginUser =
(usuario, password) =>

axios.post(
 `${API}/login`,
 {
  usuario,
  password
 }
);

/**
 * Función para registrar un nuevo usuario
 * Envía una solicitud POST al endpoint /register
 */
export const registerUser =
(usuario, password, rol) =>

axios.post(
 `${API}/register`,
 {
  usuario,
  password,
  rol
 }
);