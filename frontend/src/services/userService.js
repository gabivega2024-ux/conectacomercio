// Importa la librería Axios para realizar solicitudes HTTP
import axios from "axios";

// URL base de la API del backend
const API =
  "http://localhost:3001/api";

/**
 * Obtener todos los usuarios
 */
export const getUsers = () => {

  // Realiza una solicitud GET para consultar
  // todos los usuarios registrados
  return axios.get(
    `${API}/users`
  );

};

/**
 * Crear usuario
 */
export const createUser = (
  userData
) => {

  // Realiza una solicitud POST para crear
  // un nuevo usuario en la base de datos
  return axios.post(
    `${API}/users`,
    userData
  );

};

/**
 * Actualizar usuario
 */
export const updateUser = (
  id,
  userData
) => {

  // Realiza una solicitud PUT para actualizar
  // la información de un usuario específico
  return axios.put(
    `${API}/users/${id}`,
    userData
  );

};

/**
 * Eliminar usuario
 */
export const deleteUser = (
  id
) => {

  // Realiza una solicitud DELETE para eliminar
  // un usuario mediante su identificador
  return axios.delete(
    `${API}/users/${id}`
  );

};