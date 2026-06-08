// Importa el componente Navigate de React Router
// para redireccionar usuarios a otras rutas
import { Navigate } from "react-router-dom";

/**
 * Componente ProtectedRoute
 *
 * Función:
 * Verifica si existe una sesión activa y,
 * opcionalmente, valida el rol permitido
 * para acceder a una ruta específica.
 *
 * Parámetros:
 * - children: componente que se desea proteger.
 * - rolPermitido: rol requerido para acceder.
 */
function ProtectedRoute({

  children,
  rolPermitido

}) {

  // Obtiene la información almacenada
  // en el navegador después del login
  const sesion =
    localStorage.getItem(
      "sesion"
    );

  const rol =
    localStorage.getItem(
      "rol"
    );

  /**
   * Validación 1:
   * Verifica si existe una sesión activa.
   *
   * Si no existe, el usuario será
   * redireccionado al Login.
   */
  if (!sesion) {

    return (

      <Navigate
        to="/"
        replace
      />

    );

  }

  /**
   * Validación 2:
   * Verifica si la ruta requiere
   * un rol específico.
   *
   * Si el rol del usuario no coincide,
   * se redirecciona al Login.
   */
  if (

    rolPermitido &&
    rol !== rolPermitido

  ) {

    return (

      <Navigate
        to="/"
        replace
      />

    );

  }

  /**
   * Si todas las validaciones son correctas,
   * permite mostrar el componente solicitado.
   */
  return children;

}

// Exporta el componente para utilizarlo
// en App.jsx
export default ProtectedRoute;