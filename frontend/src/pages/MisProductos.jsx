import { useState, useEffect } from "react";
import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  crearProducto,
  obtenerProductos,
  actualizarProducto,
  eliminarProducto
} from "../services/productService";

function MisProductos() {

  const navigate = useNavigate();

  const [productos, setProductos] =
    useState([]);

  const [formulario, setFormulario] =
    useState({
      nombre: "",
      descripcion: "",
      precio: "",
      stock: ""
    });

  const [editando, setEditando] =
    useState(false);

  const [idProducto, setIdProducto] =
    useState(null);

  useEffect(() => {

    cargarProductos();

  }, []);

  const cerrarSesion = () => {

    localStorage.clear();

    navigate("/", {
      replace: true
    });

  };

  const cargarProductos = async () => {

    try {

      const respuesta =
        await obtenerProductos();

      const lista =
        Array.isArray(
          respuesta.data
        )
          ? respuesta.data
          : [];

      const idMayorista =
        Number(
          localStorage.getItem("id")
        );

      const misProductos =
        lista.filter(
          (item) =>
            Number(
              item.mayorista_id
            ) === idMayorista
        );

      setProductos(
        misProductos
      );

    } catch (error) {

      console.error(
        "Error cargando productos:",
        error
      );

      setProductos([]);

    }

  };

  const handleChange = (e) => {

    setFormulario({

      ...formulario,

      [e.target.name]:
        e.target.value

    });

  };

  const guardarProducto =
    async (e) => {

      e.preventDefault();

      try {

        if (editando) {

          await actualizarProducto(
            idProducto,
            formulario
          );

          alert(
            "Producto actualizado correctamente"
          );

        } else {

          await crearProducto({

            ...formulario,

            categoria_id:
              null,

            mayorista_id:
              Number(
                localStorage.getItem(
                  "id"
                )
              )

          });

          alert(
            "Producto registrado correctamente"
          );

        }

        limpiarFormulario();

        await cargarProductos();

      } catch (error) {

        console.error(error);

        alert(
          "Error al guardar producto"
        );

      }

    };

  const editarProducto =
    (item) => {

      setEditando(true);

      setIdProducto(
        item.id
      );

      setFormulario({

        nombre:
          item.nombre || "",

        descripcion:
          item.descripcion || "",

        precio:
          item.precio || "",

        stock:
          item.stock || ""

      });

    };

  const eliminar =
    async (id) => {

      const confirmar =
        window.confirm(
          "¿Desea eliminar este producto?"
        );

      if (!confirmar) return;

      try {

        await eliminarProducto(
          id
        );

        alert(
          "Producto eliminado correctamente"
        );

        await cargarProductos();

      } catch (error) {

        console.error(error);

        alert(
          "Error al eliminar producto"
        );

      }

    };

  const limpiarFormulario =
    () => {

      setFormulario({

        nombre: "",
        descripcion: "",
        precio: "",
        stock: ""

      });

      setEditando(false);

      setIdProducto(null);

    };

  return (

    <div className="container mt-4">

      <div className="d-flex justify-content-between mb-4">

        <Link
          to="/dashboard-mayorista"
          className="btn btn-primary"
        >
          ← Dashboard
        </Link>

        <button
          className="btn btn-danger"
          onClick={
            cerrarSesion
          }
        >
          Cerrar Sesión
        </button>

      </div>

      <div className="card shadow">

        <div className="card-body">

          <h2 className="mb-4">
            Gestión de Productos
          </h2>

          <form
            onSubmit={
              guardarProducto
            }
          >

            <div className="mb-3">

              <label className="form-label">
                Nombre
              </label>

              <input
                type="text"
                name="nombre"
                className="form-control"
                value={
                  formulario.nombre
                }
                onChange={
                  handleChange
                }
                required
              />

            </div>

            <div className="mb-3">

              <label className="form-label">
                Descripción
              </label>

              <textarea
                name="descripcion"
                className="form-control"
                value={
                  formulario.descripcion
                }
                onChange={
                  handleChange
                }
              />

            </div>

            <div className="mb-3">

              <label className="form-label">
                Precio
              </label>

              <input
                type="number"
                name="precio"
                className="form-control"
                value={
                  formulario.precio
                }
                onChange={
                  handleChange
                }
                required
              />

            </div>

            <div className="mb-3">

              <label className="form-label">
                Stock
              </label>

              <input
                type="number"
                name="stock"
                className="form-control"
                value={
                  formulario.stock
                }
                onChange={
                  handleChange
                }
                required
              />

            </div>

            <button
              type="submit"
              className="btn btn-success me-2"
            >
              {editando
                ? "Actualizar Producto"
                : "Guardar Producto"}
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={
                limpiarFormulario
              }
            >
              Cancelar
            </button>

          </form>

        </div>

      </div>

      <div className="card mt-4 shadow">

        <div className="card-body">

          <h3 className="mb-3">
            Mis Productos
          </h3>

          <table className="table table-striped table-bordered">

            <thead>

              <tr>

                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>

              </tr>

            </thead>

            <tbody>

              {productos.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center"
                  >
                    No hay productos registrados
                  </td>

                </tr>

              ) : (

                productos.map(
                  (item) => (

                    <tr
                      key={item.id}
                    >

                      <td>
                        {item.id}
                      </td>

                      <td>
                        {item.nombre}
                      </td>

                      <td>
                        {item.descripcion}
                      </td>

                      <td>
                        $
                        {item.precio}
                      </td>

                      <td>
                        {item.stock}
                      </td>

                      <td>

                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() =>
                            editarProducto(
                              item
                            )
                          }
                        >
                          Editar
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            eliminar(
                              item.id
                            )
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

  );

}

export default MisProductos;