import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DashboardTendero() {

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

    if (!sesion) {

      navigate(
        "/",
        {
          replace: true
        }
      );

      return;

    }

    if (
      rol !== "tendero"
    ) {

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

  const usuario =
    localStorage.getItem(
      "usuario"
    );

  const cerrarSesion =
    () => {

      localStorage.clear();

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

          <h1>
            Panel Tendero
          </h1>

          <p>
            Bienvenido
            <strong>
              {" "}
              {usuario}
            </strong>
          </p>

          <hr />

          {/* MENÚ DE MÓDULOS */}

          <div className="d-flex flex-wrap gap-2 mb-4">

            <button
              className="btn btn-success"
              onClick={() =>
                navigate(
                  "/ver-productos"
                )
              }
            >
              🛒 Ver Productos
            </button>

            <button
              className="btn btn-primary"
              onClick={() =>
                navigate(
                  "/ver-productos"
                )
              }
            >
              📦 Crear Pedido
            </button>

            <button
              className="btn btn-outline-secondary"
              disabled
            >
              📋 Mis Pedidos
            </button>

            <button
              className="btn btn-outline-secondary"
              disabled
            >
              📜 Historial Compras
            </button>

            <button
              className="btn btn-outline-secondary"
              disabled
            >
              🚚 Seguimiento Entregas
            </button>

            <button
              className="btn btn-outline-secondary"
              disabled
            >
              ⭐ Proveedores Favoritos
            </button>

            <button
              className="btn btn-outline-secondary"
              disabled
            >
              📊 Reportes
            </button>

            <button
              className="btn btn-outline-secondary"
              disabled
            >
              🔔 Promociones
            </button>

            <button
              className="btn btn-outline-secondary"
              disabled
            >
              📈 Estadísticas
            </button>

            <button
              className="btn btn-danger ms-auto"
              onClick={
                cerrarSesion
              }
            >
              Cerrar Sesión
            </button>

          </div>

          <div className="alert alert-success">

            Acceso para Tenderos

          </div>

          <div className="alert alert-info">

            Desde este panel podrá consultar
            productos publicados por los
            mayoristas, crear pedidos mediante
            carrito de compras y realizar el
            seguimiento de sus compras dentro
            de la plataforma ConectaComercio.

          </div>

          <div className="card bg-light border-0">

            <div className="card-body">

              <h5 className="mb-3">
                Módulos disponibles y futuros
              </h5>

              <ul className="list-group">

                <li className="list-group-item">
                  ✅ Consulta de productos disponibles
                </li>

                <li className="list-group-item">
                  ✅ Carrito de compras
                </li>

                <li className="list-group-item">
                  ✅ Creación de pedidos
                </li>

                <li className="list-group-item">
                  ✅ Envío de pedidos al mayorista
                </li>

                <li className="list-group-item">
                  ⏳ Historial de compras
                </li>

                <li className="list-group-item">
                  ⏳ Consulta de pedidos realizados
                </li>

                <li className="list-group-item">
                  ⏳ Seguimiento de entregas
                </li>

                <li className="list-group-item">
                  ⏳ Gestión de proveedores favoritos
                </li>

                <li className="list-group-item">
                  ⏳ Promociones y descuentos
                </li>

                <li className="list-group-item">
                  ⏳ Reportes y estadísticas de compras
                </li>

              </ul>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default DashboardTendero;