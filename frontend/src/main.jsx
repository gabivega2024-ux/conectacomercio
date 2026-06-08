// Importa la librería React
import React from "react";

// Importa ReactDOM para renderizar la aplicación en el navegador
import ReactDOM from "react-dom/client";

// Importa el componente principal de la aplicación
import App from "./App";

// Importa los estilos de Bootstrap para el diseño visual
import
"bootstrap/dist/css/bootstrap.min.css";

// Crea la raíz de React en el elemento HTML con id "root"
// y renderiza el componente principal App
ReactDOM.createRoot(
 document.getElementById("root")
).render(
 <App />
);