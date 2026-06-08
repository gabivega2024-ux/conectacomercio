import {
  useState,
  useEffect
} from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import {
  loginUser
} from "../services/authService";

function Login() {

  const [usuario, setUsuario] =
    useState("");

  const [password, setPassword] =
    useState("");

  const navigate =
    useNavigate();

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

  const iniciarSesion =
    async (e) => {

      e.preventDefault();

      try {

        console.log(
          "Intentando login..."
        );

        const response =
          await loginUser(
            usuario,
            password
          );

        console.log(
          "Respuesta backend:",
          response.data
        );

        localStorage.setItem(
          "sesion",
          "activa"
        );

        localStorage.setItem(
          "id",
          response.data.id
        );

        localStorage.setItem(
          "usuario",
          response.data.usuario
        );

        localStorage.setItem(
          "rol",
          response.data.rol
        );

        alert(
          "Autenticación satisfactoria"
        );

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

        } else if (
          response.data.rol ===
          "tendero"
        ) {

          navigate(
            "/dashboard-tendero",
            {
              replace: true
            }
          );

        } else if (
          response.data.rol ===
          "mayorista"
        ) {

          navigate(
            "/dashboard-mayorista",
            {
              replace: true
            }
          );

        } else {

          alert(
            "Rol no reconocido"
          );

        }

      } catch (error) {

        console.error(
          "ERROR LOGIN:",
          error
        );

        console.error(
          "RESPONSE:",
          error.response
        );

        alert(
          error?.response?.data?.mensaje ||
          error.message ||
          "Error en la autenticación"
        );

      }

    };

  return (

    <div className="vh-100 d-flex justify-content-center align-items-center bg-light">

      <div
        className="card shadow-lg border-0"
        style={{
          width: "420px"
        }}
      >

        <div className="card-body p-5">

          <h2 className="text-center mb-4">
            Iniciar Sesión
          </h2>

          <form
            onSubmit={
              iniciarSesion
            }
          >

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

            <button
              type="submit"
              className="btn btn-primary w-100"
            >
              Ingresar
            </button>

          </form>

          <hr />

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

export default Login;