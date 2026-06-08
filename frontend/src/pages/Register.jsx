// Importa los hooks de React
import {
  useState,
  useEffect
} from "react";

// Importa las herramientas de navegación de React Router
import {
  useNavigate,
  Link
} from "react-router-dom";

// Importa el servicio encargado de registrar usuarios
import { registerUser } from "../services/authService";

function Register() {

  // Estado para almacenar el nombre de usuario
  const [usuario, setUsuario] =
    useState("");

  // Estado para almacenar la contraseña
  const [password, setPassword] =
    useState("");

  // Estado para almacenar el rol seleccionado
  const [rol, setRol] =
    useState("tendero");

  // Hook para navegar entre páginas
  const navigate =
    useNavigate();

  /**
   * Verifica si existe una sesión activa.
   * Si existe, redirecciona al dashboard
   * correspondiente según el rol.
   */
  useEffect(() => {

    const sesion =
      localStorage.getItem(
        "sesion"
      );

    const rolUsuario =
      localStorage.getItem(
        "rol"
      );

    if (sesion) {

      if (rolUsuario === "admin") {

        navigate(
          "/dashboard-admin",
          {
            replace: true
          }
        );

      }

      if (rolUsuario === "tendero") {

        navigate(
          "/dashboard-tendero",
          {
            replace: true
          }
        );

      }

      if (rolUsuario === "mayorista") {

        navigate(
          "/dashboard-mayorista",
          {
            replace: true
          }
        );

      }

    }

  }, [navigate]);

  /**
   * Función encargada de registrar usuarios
   */
  const registrar =
    async (e) => {

      // Evita la recarga automática del formulario
      e.preventDefault();

      try {

        // Envía los datos al backend
        const response =
          await registerUser(
            usuario,
            password,
            rol
          );

        // Muestra mensaje de éxito
        alert(
          response.data.mensaje
        );

        // Redirecciona al login
        navigate(
          "/",
          {
            replace: true
          }
        );

      } catch (error) {

        // Verifica si existe un mensaje de error enviado por la API
        if (
          error.response &&
          error.response.data
        ) {

          alert(
            error.response.data.mensaje
          );

        } else {

          // Mensaje genérico en caso de error
          alert(
            "Error al registrar"
          );

        }

      }

    };

  return (

    // Contenedor principal centrado vertical y horizontalmente
    <div className="vh-100 d-flex justify-content-center align-items-center bg-light">

      {/* Tarjeta principal */}
      <div
        className="card shadow-lg border-0"
        style={{ width: "450px" }}
      >

        <div className="card-body p-5">

          {/* Título */}
          <h2 className="text-center mb-4">
            Registro
          </h2>

          {/* Formulario de registro */}
          <form
            onSubmit={registrar}
          >

            {/* Campo usuario */}
            <div className="mb-3">

              <label>
                Usuario
              </label>

              <input
                type="text"
                className="form-control"
                value={usuario}
                onChange={(e) =>
                  setUsuario(
                    e.target.value
                  )
                }
                required
              />

            </div>

            {/* Campo contraseña */}
            <div className="mb-3">

              <label>
                Contraseña
              </label>

              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                required
              />

            </div>

            {/* Selector de rol */}
            <div className="mb-4">

              <label>
                Rol
              </label>

              <select
                className="form-select"
                value={rol}
                onChange={(e) =>
                  setRol(
                    e.target.value
                  )
                }
              >

                <option value="admin">
                  Administrador
                </option>

                <option value="tendero">
                  Tendero
                </option>

                <option value="mayorista">
                  Mayorista
                </option>

              </select>

            </div>

            {/* Botón para registrar */}
            <button
              className="btn btn-success w-100"
            >
              Registrar
            </button>

          </form>

          <hr />

          {/* Botón para regresar al login */}
          <Link
            to="/"
            className="btn btn-secondary w-100"
          >
            Volver al Login
          </Link>

        </div>

      </div>

    </div>

  );

}

// Exporta el componente para utilizarlo en las rutas
export default Register;