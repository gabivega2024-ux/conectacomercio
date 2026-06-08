# ConectaComercio — API REST + Frontend React

Aplicación web fullstack que conecta **mayoristas** y **tenderos** a través de una plataforma de gestión de productos y pedidos, con control de acceso basado en roles (admin, mayorista, tendero).

---


## Descripción general

ConectaComercio permite a los **mayoristas** publicar y administrar sus productos, 
mientras que los **tenderos** pueden explorar el catálogo y realizar pedidos. 
Un **administrador** gestiona los usuarios de la plataforma. La sesión se maneja mediante 
`localStorage` y las rutas protegidas validan rol y autenticación antes de renderizar cada vista.

---

## Tecnologías utilizadas

### Backend
| Paquete | Versión | Función |
|---|---|---|
| Node.js | — | Entorno de ejecución |
| Express | ^5.2.1 | Framework HTTP |
| mysql2 | ^3.22.5 | Driver MySQL con soporte async/await |
| bcryptjs | ^3.0.3 | Hash de contraseñas |
| cors | ^2.8.6 | Habilitar peticiones cross-origin |

### Frontend
| Paquete | Versión | Función |
|---|---|---|
| React | ^19.2.6 | Librería de UI |
| React Router DOM | ^7.17.0 | Enrutamiento SPA |
| Axios | ^1.17.0 | Peticiones HTTP al backend |
| Bootstrap | ^5.3.8 | Estilos y componentes CSS |
| Vite | ^8.0.12 | Bundler y servidor de desarrollo |

---

## Estructura del proyecto

```
Gabriela_Vega_AA5_EV03/
├── backend/
│   ├── config/
│   │   └── db.js                  # Pool de conexión MySQL
│   ├── controllers/
│   │   ├── authController.js      # Registro y login
│   │   ├── userController.js      # CRUD de usuarios
│   │   ├── productController.js   # CRUD de productos
│   │   └── pedidoController.js    # Creación de pedidos
│   ├── routes/
│   │   ├── authRoutes.js          # POST /api/register, POST /api/login
│   │   ├── userRoutes.js          # CRUD /api/users
│   │   ├── productRoutes.js       # CRUD /api/productos
│   │   └── pedidoRoutes.js        # POST /api/pedidos
│   ├── server.js                  # Punto de entrada del servidor
│   └── package.json
│
└── frontend/
    ├── public/
    │   └── favicon.svg
    ├── src/
    │   ├── assets/                # Imágenes estáticas
    │   ├── components/
    │   │   └── ProtectedRoute.jsx # Guard de rutas por rol y sesión
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── DashboardAdmin.jsx
    │   │   ├── DashboardMayorista.jsx
    │   │   ├── DashboardTendero.jsx
    │   │   ├── MisProductos.jsx   # Gestión de productos (mayorista)
    │   │   ├── VerProductos.jsx   # Catálogo + pedidos (tendero)
    │   │   └── Users.jsx          # Gestión de usuarios (admin)
    │   ├── services/
    │   │   ├── authService.js
    │   │   ├── userService.js
    │   │   ├── productService.js
    │   │   └── pedidoService.js
    │   ├── App.jsx                # Enrutador principal
    │   └── main.jsx
    └── package.json
```

---

## Base de datos

> **⚠️ El proyecto incluye un archivo de base de datos (`.sql`) que debe importarse antes de 
ejecutar la aplicación.**

### Nombre de la base de datos

```
conectacomercio_api
```

### Cómo instalar la base de datos

1. Abrir **phpMyAdmin**, **MySQL Workbench** o la consola de MySQL.
2. Crear la base de datos si no existe:
   ```sql
   CREATE DATABASE conectacomercio_api;
   ```
3. Seleccionar la base de datos:
   ```sql
   USE conectacomercio_api;
   ```
4. Importar el archivo `.sql` incluido en el proyecto:
   - **Desde phpMyAdmin:** pestaña *Importar* → seleccionar el archivo `.sql` → clic en *Continuar*.
   - **Desde consola:**
     ```bash
     mysql -u root -p conectacomercio_api < conectacomercio_api.sql
     ```

### Tablas requeridas

| Tabla | Campos principales |
|---|---|
| `usuarios` | `id`, `usuario`, `password` (hash bcrypt), `rol` |
| `productos` | `id`, `nombre`, `descripcion`, `precio`, `stock`, `categoria_id`, `mayorista_id` |
| `categorias` | `id`, `nombre` |
| `pedidos` | `id`, `tendero_id`, `total`, `fecha` |
| `pedido_detalle` | `id`, `pedido_id`, `producto_id`, `cantidad`, `precio` |

---

## Instalación y configuración

### Prerrequisitos

- Node.js >= 18
- MySQL corriendo localmente
- npm

### 1. Clonar o descomprimir el proyecto

```bash
unzip Gabriela_Vega_AA5_EV03.zip
cd Gabriela_Vega_AA5_EV03
```

### 2. Configurar la conexión a la base de datos

Editar `backend/config/db.js` con tus credenciales:

```js
const conexion = mysql.createPool({
  host: "localhost",
  user: "root",       // ← tu usuario MySQL
  password: "",       // ← tu contraseña MySQL
  database: "conectacomercio_api"
});
```

### 3. Instalar dependencias e iniciar el backend

```bash
cd backend
npm install
node server.js
```

El servidor quedará disponible en: `http://localhost:3001`

### 4. Instalar dependencias e iniciar el frontend

```bash
cd ../frontend
npm install
npm run dev
```

El frontend quedará disponible en: `http://localhost:5173`

---

## Endpoints de la API

Base URL: `http://localhost:3001/api`

### Autenticación

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/register` | Registrar nuevo usuario |
| POST | `/login` | Iniciar sesión |

**Body de `/register`:**
```json
{ "usuario": "nombre", "password": "clave", "rol": "admin|mayorista|tendero" }
```

**Body de `/login`:**
```json
{ "usuario": "nombre", "password": "clave" }
```

**Respuesta de `/login` exitosa:**
```json
{ "mensaje": "Autenticación satisfactoria", "id": 1, "usuario": "nombre", "rol": "tendero" }
```

---

### Usuarios

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/users` | Listar todos los usuarios |
| POST | `/users` | Crear usuario |
| PUT | `/users/:id` | Actualizar usuario |
| DELETE | `/users/:id` | Eliminar usuario |

---

### Productos

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/productos` | Listar productos con categoría |
| POST | `/productos` | Crear producto |
| PUT | `/productos/:id` | Actualizar producto |
| DELETE | `/productos/:id` | Eliminar producto |

**Body de POST `/productos`:**
```json
{
  "nombre": "Arroz",
  "descripcion": "Arroz blanco 1kg",
  "precio": 3500,
  "stock": 100,
  "categoria_id": 1,
  "mayorista_id": 2
}
```

---

### Pedidos

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/pedidos` | Crear un pedido con validación de stock |

**Body de POST `/pedidos`:**
```json
{
  "tendero_id": 3,
  "productos": [
    { "producto_id": 1, "cantidad": 5 },
    { "producto_id": 4, "cantidad": 2 }
  ]
}
```

El sistema verifica stock disponible, calcula el total automáticamente, registra el detalle del pedido
 y descuenta el stock de cada producto.

---

## Rutas del frontend

| Ruta | Componente | Acceso |
|---|---|---|
| `/` | Login | Público |
| `/register` | Register | Público |
| `/dashboard-admin` | DashboardAdmin | Solo `admin` |
| `/users` | Users | Solo `admin` |
| `/dashboard-mayorista` | DashboardMayorista | Solo `mayorista` |
| `/mis-productos` | MisProductos | Solo `mayorista` |
| `/dashboard-tendero` | DashboardTendero | Solo `tendero` |
| `/ver-productos` | VerProductos | Solo `tendero` |

Las rutas protegidas están envueltas en el componente `ProtectedRoute`, que valida la existencia de 
sesión y el rol almacenado en `localStorage`. Si la validación falla, el usuario es redireccionado 
al Login.

---

## Roles y permisos

| Rol | Capacidades |
|---|---|
| **admin** | Gestión completa de usuarios (ver, crear, editar, eliminar) |
| **mayorista** | Publicar, editar y eliminar sus propios productos |
| **tendero** | Ver catálogo de productos y realizar pedidos |

---

## Autor

**Gabriela Vega**  
Actividad de Aprendizaje 5 — Evidencia 03
