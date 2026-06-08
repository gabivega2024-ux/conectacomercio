// Importa los hooks de React
import { useEffect } from "react";

// Importa el hook para la navegación entre rutas
import { useNavigate } from "react-router-dom";

function DashboardAdmin() {

  // Hook para navegar entre páginas
  const navigate =
    useNavigate();

  /**
   * Verifica que exista una sesión activa
   * y que el usuario tenga rol administrador.
   */
  useEffect(() => {

    const sesion =
      localStorage.getItem(
        "sesion"
      );

    const rol =
      localStorage.getItem(
        "rol"
      );

    // Si no existe sesión activa
    if (!sesion) {

      navigate(
        "/",
        {
          replace: true
        }
      );

      return;

    }

    // Si el usuario no es administrador
    if (rol !== "admin") {

      alert(
        "Acceso denegado"
      );

      navigate(
        "/",
        {
          replace: true
        }
      );

    }

  }, [navigate]);

  /**
   * Función para cerrar sesión
   */
  const cerrarSesion = () => {

    // Elimina toda la información almacenada
    localStorage.clear();

    // Redirecciona al Login eliminando
    // la página actual del historial
    navigate(
      "/",
      {
        replace: true
      }
    );

  };

  // Obtiene el nombre del usuario autenticado
  const usuario =
    localStorage.getItem(
      "usuario"
    );

  return (

    <div className="container mt-5">

      <div className="card shadow border-0">

        <div className="card-body p-5">

          {/* Título principal */}
          <h1>
            Panel Administrador
          </h1>

          {/* Mensaje de bienvenida */}
          <p className="text-muted">

            Bienvenido:

            <strong>
              {" "}
              {usuario}
            </strong>

          </p>

          <hr />

          {/* Módulo actualmente implementado */}
          <button
            className="btn btn-primary me-3"
            onClick={() =>
              navigate("/users")
            }
          >
            Gestionar Usuarios
          </button>

          {/* Botón para cerrar sesión */}
          <button
            className="btn btn-danger"
            onClick={cerrarSesion}
          >
            Cerrar Sesión
          </button>

          {/* Información sobre futuras funcionalidades */}
          <div className="alert alert-info mt-4">

            Este es el panel principal del Administrador.
            Actualmente se encuentra disponible el módulo
            de gestión de usuarios. En futuras versiones
            del sistema se incorporarán nuevas funcionalidades
            para la administración integral de la plataforma
            ConectaComercio.

          </div>

          {/* Módulos previstos */}
          <div className="card bg-light border-0 mt-3">

            <div className="card-body">

              <h5>
                Módulos previstos para futuras versiones
              </h5>

              <ul>

                <li>
                  Gestión de usuarios y roles.
                </li>

                <li>
                  Administración de tenderos y mayoristas.
                </li>

                <li>
                  Gestión de productos y categorías.
                </li>

                <li>
                  Supervisión de pedidos y transacciones.
                </li>

                <li>
                  Configuración general del sistema.
                </li>

                <li>
                  Gestión de promociones y campañas comerciales.
                </li>

                <li>
                  Reportes administrativos y financieros.
                </li>

                <li>
                  Estadísticas e indicadores de uso de la plataforma.
                </li>

                <li>
                  Auditoría y monitoreo de actividades.
                </li>

                <li>
                  Gestión de soporte y atención a usuarios.
                </li>

              </ul>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default DashboardAdmin;