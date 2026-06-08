import axios from "axios";

const API =
"http://localhost:3001/api/pedidos";

export const crearPedido =
(datos) =>
axios.post(
    API,
    datos
);