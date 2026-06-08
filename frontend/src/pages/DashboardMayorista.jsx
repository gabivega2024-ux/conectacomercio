import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DashboardMayorista() {

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
      rol !== "mayorista"
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
            Panel Mayorista
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
              className="btn btn-primary"
              onClick={() =>
                navigate(
                  "/mis-productos"
                )
              }
            >
              📦 Mis Productos
            </button>

            <button
              className="btn btn-outline-secondary"
              disabled
            >
              📋 Pedidos
            </button>

            <button
              className="btn btn-outline-secondary"
              disabled
            >
              🚚 Entregas
            </button>

            <button
              className="btn btn-outline-secondary"
              disabled
            >
              👥 Clientes
            </button>

            <button
              className="btn btn-outline-secondary"
              disabled
            >
              🎁 Promociones
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
              📈 Estadísticas
            </button>

            <button
              className="btn btn-outline-secondary"
              disabled
            >
              💳 Facturación
            </button>

            <button
              className="btn btn-outline-secondary"
              disabled
            >
              🕒 Historial
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

          <div className="alert alert-warning">

            Acceso para Mayoristas

          </div>

          <div className="alert alert-info">

            Este es el panel principal del
            Mayorista. Desde aquí podrá
            administrar productos,
            inventario, pedidos y demás
            funcionalidades comerciales
            del sistema ConectaComercio.

          </div>

          <div className="card bg-light border-0">

            <div className="card-body">

              <h5 className="mb-3">
                Módulos disponibles y futuros
              </h5>

              <ul className="list-group">

                <li className="list-group-item">
                  ✅ Publicación y administración de productos
                </li>

                <li className="list-group-item">
                  ✅ Gestión de inventario y existencias
                </li>

                <li className="list-group-item">
                  ⏳ Recepción y aprobación de pedidos
                </li>

                <li className="list-group-item">
                  ⏳ Seguimiento de entregas
                </li>

                <li className="list-group-item">
                  ⏳ Administración de clientes tenderos
                </li>

                <li className="list-group-item">
                  ⏳ Gestión de promociones y descuentos
                </li>

                <li className="list-group-item">
                  ⏳ Reportes de ventas y rendimiento
                </li>

                <li className="list-group-item">
                  ⏳ Estadísticas comerciales y análisis de mercado
                </li>

                <li className="list-group-item">
                  ⏳ Gestión de facturación y pagos
                </li>

                <li className="list-group-item">
                  ⏳ Historial de pedidos y transacciones
                </li>

              </ul>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default DashboardMayorista;