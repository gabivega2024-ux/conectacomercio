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

// Importa el servicio de autenticación
import { loginUser } from "../services/authService";

function Login() {

  // Estado para almacenar el nombre de usuario
  const [usuario, setUsuario] =
    useState("");

  // Estado para almacenar la contraseña
  const [password, setPassword] =
    useState("");

  // Hook para navegar entre páginas
  const navigate =
    useNavigate();

  /**
   * Verifica si existe una sesión activa.
   *
   * Si el usuario ya inició sesión,
   * se redirecciona automáticamente
   * al dashboard correspondiente.
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

    if (sesion) {

      if (rol === "admin") {

        navigate(
          "/dashboard-admin",
          {
            replace: true
          }
        );

      }

      if (rol === "tendero") {

        navigate(
          "/dashboard-tendero",
          {
            replace: true
          }
        );

      }

      if (rol === "mayorista") {

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
   * Función encargada de autenticar al usuario
   */
  const iniciarSesion =
    async (e) => {

      // Evita la recarga automática del formulario
      e.preventDefault();

      try {

        // Envía las credenciales al backend
        const response =
          await loginUser(
            usuario,
            password
          );

        // Guarda información de la sesión en el navegador
        localStorage.setItem(
          "sesion",
          "activa"
        );

        localStorage.setItem(
          "usuario",
          response.data.usuario
        );

        localStorage.setItem(
          "rol",
          response.data.rol
        );

        // Mensaje de autenticación exitosa
        alert(
          "Autenticación satisfactoria"
        );

        // Redirecciona según el rol del usuario
        if (
          response.data.rol ===
          "admin"
        ) {

          navigate(
            "/dashboard-admin",
            {
              replace: true
            }
          );

        }

        if (
          response.data.rol ===
          "tendero"
        ) {

          navigate(
            "/dashboard-tendero",
            {
              replace: true
            }
          );

        }

        if (
          response.data.rol ===
          "mayorista"
        ) {

          navigate(
            "/dashboard-mayorista",
            {
              replace: true
            }
          );

        }

      } catch {

        // Mensaje de error en caso de credenciales incorrectas
        alert(
          "Error en la autenticación"
        );

      }

    };

  return (

    // Contenedor principal centrado en pantalla
    <div className="vh-100 d-flex justify-content-center align-items-center bg-light">

      {/* Tarjeta del formulario */}
      <div
        className="card shadow-lg border-0"
        style={{ width: "420px" }}
      >

        <div className="card-body p-5">

          {/* Título */}
          <h2 className="text-center mb-4">
            Iniciar Sesión
          </h2>

          {/* Formulario de autenticación */}
          <form
            onSubmit={iniciarSesion}
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
            <div className="mb-4">

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

            {/* Botón de ingreso */}
            <button
              className="btn btn-primary w-100"
            >
              Ingresar
            </button>

          </form>

          <hr />

          {/* Enlace al formulario de registro */}
          <Link
            to="/register"
            className="btn btn-success w-100"
          >
            Registrarse
          </Link>

        </div>

      </div>

    </div>

  );

}

// Exporta el componente para utilizarlo en las rutas
export default Login;