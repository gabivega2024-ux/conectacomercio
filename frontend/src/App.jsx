// Importa los componentes necesarios para el enrutamiento
import {
 BrowserRouter,
 Routes,
 Route
}
from "react-router-dom";

// Importa las páginas de autenticación
import Login from "./pages/Login";
import Register from "./pages/Register";


// Importa los dashboards según el rol del usuario
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardTendero from "./pages/DashboardTendero";
import DashboardMayorista from "./pages/DashboardMayorista";
import MisProductos from "./pages/MisProductos";

// Importa la página de gestión de usuarios
import Users from "./pages/Users";

// Importa el componente encargado de proteger rutas
import ProtectedRoute from "./components/ProtectedRoute";
import VerProductos from "./pages/VerProductos";

// Componente principal de la aplicación
function App() {

 return (

  // Habilita la navegación mediante URL
  <BrowserRouter>

   {/* Contenedor de todas las rutas */}
   <Routes>

    {/* Ruta principal: pantalla de inicio de sesión */}
    <Route
      path="/"
      element={<Login />}
    />

    {/* Ruta para registrar nuevos usuarios */}
    <Route
      path="/register"
      element={<Register />}
    />

    {/* 
      Ruta protegida para Administradores.
      Solo podrán acceder usuarios con:
      rol = "admin"
    */}
    <Route
      path="/dashboard-admin"
      element={
        <ProtectedRoute
          rolPermitido="admin"
        >
          <DashboardAdmin />
        </ProtectedRoute>
      }
    />

    {/*
      Ruta protegida para Tenderos.
      Solo podrán acceder usuarios con:
      rol = "tendero"
    */}
    <Route
      path="/dashboard-tendero"
      element={
        <ProtectedRoute
          rolPermitido="tendero"
        >
          <DashboardTendero />
        </ProtectedRoute>
      }
    />
    <Route
  path="/ver-productos"
  element={
    <ProtectedRoute
      rolPermitido="tendero"
    >
      <VerProductos />
    </ProtectedRoute>
  }
/>

    {/*
      Ruta protegida para Mayoristas.
      Solo podrán acceder usuarios con:
      rol = "mayorista"
    */}
    <Route
      path="/dashboard-mayorista"
      element={
        <ProtectedRoute
          rolPermitido="mayorista"
        >
          <DashboardMayorista />
        </ProtectedRoute>
      }
    />

    <Route
  path="/mis-productos"
  element={
    <ProtectedRoute
      rolPermitido="mayorista"
    >
      <MisProductos />
    </ProtectedRoute>
  }
/>

    {/*
      Ruta protegida para la gestión de usuarios.
      Únicamente los administradores
      pueden acceder a este módulo.
    */}
    <Route
      path="/users"
      element={
        <ProtectedRoute
          rolPermitido="admin"
        >
          <Users />
        </ProtectedRoute>
      }
    />

   </Routes>

  </BrowserRouter>

 );

}

// Exporta el componente principal para ser utilizado en main.jsx
export default App;