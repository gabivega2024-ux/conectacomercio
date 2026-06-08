// Importa el hook useEffect para validaciones
import { useEffect } from "react";

// Importa el hook para la navegación entre rutas
import { useNavigate } from "react-router-dom";

function DashboardMayorista() {

  // Hook para navegar entre páginas
  const navigate =
    useNavigate();

  /**
   * Verifica que exista una sesión activa
   * y que el usuario tenga rol mayorista.
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

    // Si no existe sesión
    if (!sesion) {

      navigate(
        "/",
        {
          replace: true
        }
      );

      return;

    }

    // Si el rol no corresponde a mayorista
    if (rol !== "mayorista") {

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

  return (

    <div className="container mt-5">

      <div className="card shadow border-0">

        <div className="card-body p-5">

          {/* Título principal */}
          <h1>
            Panel Mayorista
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

          {/* Información del rol */}
          <div className="alert alert-warning">

            Acceso para Mayoristas

          </div>

          {/* Información sobre futuras funcionalidades */}
          <div className="alert alert-info">

            Este es el panel inicial del Mayorista.
            En futuras versiones del sistema se incorporarán
            módulos especializados que permitirán gestionar
            productos, pedidos y relaciones comerciales con
            los tenderos registrados en la plataforma
            ConectaComercio.

          </div>

          {/* Módulos previstos */}
          <div className="card bg-light border-0 mb-4">

            <div className="card-body">

              <h5>
                Módulos previstos para futuras versiones
              </h5>

              <ul>

                <li>
                  Publicación y administración de productos.
                </li>

                <li>
                  Gestión de inventario y existencias.
                </li>

                <li>
                  Recepción y aprobación de pedidos.
                </li>

                <li>
                  Seguimiento de entregas.
                </li>

                <li>
                  Administración de clientes tenderos.
                </li>

                <li>
                  Gestión de promociones y descuentos.
                </li>

                <li>
                  Reportes de ventas y rendimiento.
                </li>

                <li>
                  Estadísticas comerciales y análisis de mercado.
                </li>

                <li>
                  Gestión de facturación y pagos.
                </li>

                <li>
                  Historial de pedidos y transacciones.
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

export default DashboardMayorista;