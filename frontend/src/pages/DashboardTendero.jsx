// Importa el hook useEffect para validaciones
import { useEffect } from "react";

// Importa el hook para la navegación entre rutas
import { useNavigate } from "react-router-dom";

function DashboardTendero() {

  // Hook para redireccionar usuarios
  const navigate =
    useNavigate();

  /**
   * Verifica que exista una sesión activa
   * y que el usuario tenga rol tendero.
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

    // Si el usuario no es tendero
    if (rol !== "tendero") {

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

  // Obtiene el nombre del usuario almacenado en la sesión
  const usuario =
    localStorage.getItem(
      "usuario"
    );

  /**
   * Función para cerrar sesión
   */
  const cerrarSesion = () => {

    // Elimina toda la información de la sesión
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

  return (

    <div className="container mt-5">

      <div className="card shadow border-0">

        <div className="card-body p-5">

          {/* Título principal */}
          <h1>
            Panel Tendero
          </h1>

          {/* Mensaje de bienvenida */}
          <p>

            Bienvenido

            <strong>
              {" "}
              {usuario}
            </strong>

          </p>

          <hr />

          {/* Información del módulo */}
          <div className="alert alert-success">

            Acceso para Tenderos

          </div>

          {/* Información sobre futuras funcionalidades */}
          <div className="alert alert-info">

            Este es el panel inicial del Tendero.
            En futuras versiones del sistema se integrarán
            módulos especializados para la gestión comercial,
            permitiendo optimizar la relación entre tenderos
            y mayoristas dentro de la plataforma ConectaComercio.

          </div>

          {/* Posibles módulos futuros */}
          <div className="card bg-light border-0 mb-4">

            <div className="card-body">

              <h5>
                Módulos previstos para futuras versiones
              </h5>

              <ul>

                <li>
                  Consulta de productos disponibles.
                </li>

                <li>
                  Solicitud y gestión de pedidos.
                </li>

                <li>
                  Historial de compras realizadas.
                </li>

                <li>
                  Comparación de precios entre proveedores.
                </li>

                <li>
                  Seguimiento de entregas.
                </li>

                <li>
                  Gestión de inventario de la tienda.
                </li>

                <li>
                  Notificaciones y promociones de mayoristas.
                </li>

                <li>
                  Reportes y estadísticas de compras.
                </li>

                <li>
                  Control de productos más vendidos.
                </li>

                <li>
                  Gestión de proveedores favoritos.
                </li>

              </ul>

            </div>

          </div>

          {/* Botón para cerrar sesión */}
          <button
            className="btn btn-danger"
            onClick={cerrarSesion}
          >
            Cerrar Sesión
          </button>

        </div>

      </div>

    </div>

  );

}

export default DashboardTendero;