// Importa los hooks de React
import { useEffect, useState } from "react";

// Importa la función para navegar entre rutas
import { useNavigate } from "react-router-dom";

// Importa los servicios para gestionar usuarios
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser
}
from "../services/userService";

function Users() {

  // Hook para la navegación entre páginas
  const navigate = useNavigate();

  // Estado que almacena la lista de usuarios
  const [usuarios, setUsuarios] = useState([]);

  // Estado para el nombre de usuario
  const [usuario, setUsuario] = useState("");

  // Estado para la contraseña
  const [password, setPassword] = useState("");

  // Estado para el rol seleccionado
  const [rol, setRol] = useState("tendero");

  // Estado que indica si se está editando un usuario
  const [editando, setEditando] = useState(null);

  /**
   * Se ejecuta al cargar el componente.
   * Verifica que exista una sesión activa
   * y que el usuario tenga rol administrador.
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

    // Solo los administradores pueden acceder
    if (rolUsuario !== "admin") {

      alert(
        "Acceso denegado"
      );

      navigate(
        "/",
        {
          replace: true
        }
      );

      return;

    }

    // Carga la lista de usuarios
    cargarUsuarios();

  }, [navigate]);

  /**
   * Obtener usuarios desde la API
   */
  const cargarUsuarios = async () => {

    try {

      const response =
        await getUsers();

      setUsuarios(
        response.data
      );

    } catch (error) {

      console.error(
        error
      );

    }

  };

  /**
   * Crear o actualizar usuario
   */
  const guardar = async (e) => {

    e.preventDefault();

    try {

      if (editando) {

        const response =
          await updateUser(
            editando,
            {
              usuario,
              rol
            }
          );

        alert(
          response.data.mensaje
        );

      } else {

        const response =
          await createUser({
            usuario,
            password,
            rol
          });

        alert(
          response.data.mensaje
        );

      }

      // Limpia el formulario
      setUsuario("");
      setPassword("");
      setRol("tendero");
      setEditando(null);

      // Recarga usuarios
      cargarUsuarios();

    } catch (error) {

      if (
        error.response &&
        error.response.data
      ) {

        alert(
          error.response.data.mensaje
        );

      } else {

        alert(
          "Error al guardar usuario"
        );

      }

    }

  };

  /**
   * Cargar datos para editar
   */
  const editar = (item) => {

    setUsuario(
      item.usuario
    );

    setRol(
      item.rol
    );

    setEditando(
      item.id
    );

  };

  /**
   * Eliminar usuario
   */
  const eliminar = async (id) => {

    const confirmar =
      window.confirm(
        "¿Desea eliminar este usuario?"
      );

    if (!confirmar)
      return;

    try {

      const response =
        await deleteUser(
          id
        );

      alert(
        response.data.mensaje
      );

      cargarUsuarios();

    } catch (error) {

      alert(
        "Error al eliminar usuario"
      );

    }

  };

  /**
   * Regresar al dashboard
   */
  const volverDashboard = () => {

    navigate(
      "/dashboard-admin"
    );

  };

  /**
   * Cerrar sesión
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

      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>
          Gestión de Usuarios
        </h2>

        <div>

          <button
            className="btn btn-secondary me-2"
            onClick={volverDashboard}
          >
            ← Dashboard
          </button>

          <button
            className="btn btn-danger"
            onClick={cerrarSesion}
          >
            Cerrar Sesión
          </button>

        </div>

      </div>

      <div className="row">

        {/* Formulario */}
        <div className="col-md-4">

          <div className="card shadow border-0">

            <div className="card-body">

              <h4 className="mb-4">

                {editando
                  ? "Editar Usuario"
                  : "Nuevo Usuario"}

              </h4>

              <form
                onSubmit={guardar}
              >

                <div className="mb-3">

                  <label className="form-label">
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

                {!editando && (

                  <div className="mb-3">

                    <label className="form-label">
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

                )}

                <div className="mb-4">

                  <label className="form-label">
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

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >

                  {editando
                    ? "Actualizar Usuario"
                    : "Guardar Usuario"}

                </button>

              </form>

            </div>

          </div>

        </div>

        {/* Tabla */}
        <div className="col-md-8">

          <div className="card shadow border-0">

            <div className="card-body">

              <h4 className="mb-4">
                Lista de Usuarios
              </h4>

              <table className="table table-hover">

                <thead className="table-dark">

                  <tr>

                    <th>ID</th>
                    <th>Usuario</th>
                    <th>Rol</th>
                    <th>Fecha Registro</th>
                    <th>Acciones</th>

                  </tr>

                </thead>

                <tbody>

                  {usuarios.length === 0 ? (

                    <tr>

                      <td
                        colSpan="5"
                        className="text-center"
                      >
                        No hay usuarios registrados.
                      </td>

                    </tr>

                  ) : (

                    usuarios.map(
                      (item) => (

                        <tr
                          key={item.id}
                        >

                          <td>{item.id}</td>

                          <td>{item.usuario}</td>

                          <td>

                            <span
                              className={`badge ${
                                item.rol === "admin"
                                  ? "bg-danger"
                                  : item.rol === "mayorista"
                                  ? "bg-warning text-dark"
                                  : "bg-success"
                              }`}
                            >
                              {item.rol}
                            </span>

                          </td>

                          <td>
                            {item.fecha_registro}
                          </td>

                          <td>

                            <button
                              className="btn btn-warning btn-sm me-2"
                              onClick={() =>
                                editar(item)
                              }
                            >
                              Editar
                            </button>

                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                eliminar(item.id)
                              }
                            >
                              Eliminar
                            </button>

                          </td>

                        </tr>

                      )
                    )

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Users;