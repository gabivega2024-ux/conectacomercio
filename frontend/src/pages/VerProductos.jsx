import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { obtenerProductos }
from "../services/productService";

import { crearPedido }
from "../services/pedidoService";

function VerProductos() {

  const navigate =
    useNavigate();

  const [productos, setProductos] =
    useState([]);

  const [carrito, setCarrito] =
    useState([]);

  useEffect(() => {

    const rol =
      localStorage.getItem("rol");

    if (rol !== "tendero") {

      navigate("/");

      return;

    }

    cargarProductos();

  }, []);

  const cargarProductos =
    async () => {

      try {

        const response =
          await obtenerProductos();

        setProductos(
          response.data
        );

      } catch (error) {

        console.error(error);

        alert(
          "Error cargando productos"
        );

      }

    };

  const volverDashboard =
    () => {

      navigate(
        "/dashboard-tendero"
      );

    };

  const agregarCarrito =
    (producto) => {

      const existe =
        carrito.find(
          item =>
            item.producto_id ===
            producto.id
        );

      if (existe) {

        alert(
          "Este producto ya está en el carrito"
        );

        return;

      }

      setCarrito([

        ...carrito,

        {
          producto_id:
            producto.id,

          nombre:
            producto.nombre,

          precio:
            Number(
              producto.precio
            ),

          cantidad: 1,

          stock:
            producto.stock
        }

      ]);

    };

  const cambiarCantidad =
    (id, cantidad) => {

      setCarrito(

        carrito.map(
          (item) =>

            item.producto_id ===
            id

              ? {
                  ...item,
                  cantidad:
                    Number(
                      cantidad
                    )
                }

              : item
        )

      );

    };

  const eliminarCarrito =
    (id) => {

      setCarrito(

        carrito.filter(
          item =>
            item.producto_id !== id
        )

      );

    };

  const calcularTotal =
    () => {

      return carrito.reduce(

        (total, item) =>

          total +
          (
            item.precio *
            item.cantidad
          ),

        0

      );

    };

  const enviarPedido =
    async () => {

      if (
        carrito.length === 0
      ) {

        alert(
          "El carrito está vacío"
        );

        return;

      }

      try {

        await crearPedido({

          tendero_id:
            Number(
              localStorage.getItem(
                "id"
              )
            ),

          productos:
            carrito.map(
              item => ({
                producto_id:
                  item.producto_id,

                cantidad:
                  item.cantidad
              })
            )

        });

        alert(
          "Pedido enviado correctamente"
        );

        setCarrito([]);

        cargarProductos();

      } catch (error) {

        console.error(
          error
        );

        alert(

          error.response?.data
            ?.mensaje ||

          "Error al enviar pedido"

        );

      }

    };

  return (

    <div className="container mt-4">

      <div className="d-flex justify-content-between mb-4">

        <h2>
          Catálogo de Productos
        </h2>

        <button
          className="btn btn-primary"
          onClick={
            volverDashboard
          }
        >
          Dashboard
        </button>

      </div>

      <div className="card shadow">

        <div className="card-body">

          <table className="table table-bordered table-striped">

            <thead>

              <tr>

                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acción</th>

              </tr>

            </thead>

            <tbody>

              {productos.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center"
                  >
                    No hay productos disponibles
                  </td>

                </tr>

              ) : (

                productos.map(
                  (producto) => (

                    <tr
                      key={
                        producto.id
                      }
                    >

                      <td>
                        {
                          producto.id
                        }
                      </td>

                      <td>
                        {
                          producto.nombre
                        }
                      </td>

                      <td>
                        {
                          producto.descripcion
                        }
                      </td>

                      <td>
                        $
                        {
                          producto.precio
                        }
                      </td>

                      <td>
                        {
                          producto.stock
                        }
                      </td>

                      <td>

                        <button
                          className="btn btn-success btn-sm"
                          onClick={() =>
                            agregarCarrito(
                              producto
                            )
                          }
                        >
                          Agregar
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

      <div className="card mt-4 shadow">

        <div className="card-body">

          <h3>
            Carrito de Compras
          </h3>

          {carrito.length === 0 ? (

            <div className="alert alert-warning">

              No hay productos agregados

            </div>

          ) : (

            <>

              <table className="table table-bordered">

                <thead>

                  <tr>

                    <th>
                      Producto
                    </th>

                    <th>
                      Cantidad
                    </th>

                    <th>
                      Precio
                    </th>

                    <th>
                      Subtotal
                    </th>

                    <th>
                      Acción
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {carrito.map(
                    (item) => (

                      <tr
                        key={
                          item.producto_id
                        }
                      >

                        <td>
                          {
                            item.nombre
                          }
                        </td>

                        <td>

                          <input
                            type="number"
                            min="1"
                            max={
                              item.stock
                            }
                            className="form-control"
                            value={
                              item.cantidad
                            }
                            onChange={(e) =>
                              cambiarCantidad(
                                item.producto_id,
                                e.target.value
                              )
                            }
                          />

                        </td>

                        <td>
                          $
                          {
                            item.precio
                          }
                        </td>

                        <td>
                          $
                          {
                            item.precio *
                            item.cantidad
                          }
                        </td>

                        <td>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              eliminarCarrito(
                                item.producto_id
                              )
                            }
                          >
                            Eliminar
                          </button>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

              <div className="alert alert-info">

                <strong>

                  Total Pedido:

                </strong>

                {" "}

                $

                {
                  calcularTotal()
                }

              </div>

              <button
                className="btn btn-success"
                onClick={
                  enviarPedido
                }
              >
                Confirmar Pedido
              </button>

            </>

          )}

        </div>

      </div>

    </div>

  );

}

export default VerProductos;