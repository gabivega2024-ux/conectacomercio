import axios from "axios";

const API =
"http://localhost:3001/api/productos";

/**
 * Obtener productos
 */
export const obtenerProductos =
() => axios.get(API);

/**
 * Crear producto
 */
export const crearProducto =
(datos) =>
axios.post(
  API,
  datos
);

/**
 * Actualizar producto
 */
export const actualizarProducto =
(id, datos) =>
axios.put(
  `${API}/${id}`,
  datos
);

/**
 * Eliminar producto
 */
export const eliminarProducto =
(id) =>
axios.delete(
  `${API}/${id}`
);