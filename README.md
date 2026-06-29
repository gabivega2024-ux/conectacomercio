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

---

# Arquitectura del proyecto

El sistema fue desarrollado siguiendo una arquitectura por capas (MVC), separando las responsabilidades de la aplicación para facilitar el mantenimiento y la escalabilidad.

```
                Frontend React
                      │
                Axios (HTTP)
                      │
              Express Router
                      │
               Controllers
                      │
                MySQL (mysql2)
```

Cada módulo del backend se encuentra organizado de la siguiente manera:

- **Routes:** reciben las solicitudes HTTP.
- **Controllers:** contienen la lógica del negocio.
- **Config:** configuración de la base de datos.
- **Tests:** pruebas unitarias del sistema.

---

# Seguridad implementada

El proyecto implementa diferentes mecanismos de seguridad:

- Contraseñas encriptadas mediante **bcryptjs**.
- Validación de credenciales durante el inicio de sesión.
- Protección de rutas en el frontend mediante `ProtectedRoute`.
- Control de acceso basado en roles:
  - Administrador
  - Mayorista
  - Tendero
- Validación de sesión utilizando `localStorage`.
- Validación de existencia de productos antes de registrar pedidos.
- Validación de stock disponible antes de confirmar un pedido.
- Manejo de errores mediante bloques `try/catch`.

---

# Pruebas unitarias

Como parte del desarrollo del proyecto se implementaron pruebas unitarias utilizando **Jest** y **Supertest**, verificando el funcionamiento de todos los módulos principales del backend.

## Estructura de pruebas

```
backend/
└── tests/
    ├── auth.test.js
    ├── users.test.js
    ├── productos.test.js
    └── pedidos.test.js
```

## Casos evaluados

### Autenticación

- Registro correcto.
- Usuario duplicado.
- Validación de campos.
- Inicio de sesión.
- Usuario inexistente.
- Contraseña incorrecta.
- Error interno del servidor.

### Usuarios

- Obtener usuarios.
- Crear usuario.
- Actualizar usuario.
- Eliminar usuario.
- Validaciones.
- Manejo de errores.

### Productos

- Obtener productos.
- Crear producto.
- Actualizar producto.
- Eliminar producto.
- Manejo de errores.

### Pedidos

- Crear pedido.
- Validar existencia del producto.
- Validar stock.
- Manejo de errores.

---

# Cobertura de pruebas

Las pruebas fueron ejecutadas mediante:

```bash
npm test -- --coverage
```

## Resultados

| Métrica | Resultado |
|---------|----------:|
| Suites ejecutadas | 4 |
| Suites exitosas | 4 |
| Pruebas ejecutadas | 29 |
| Pruebas aprobadas | 29 |
| Pruebas fallidas | 0 |

## Cobertura obtenida

| Archivo | Cobertura |
|---------|----------:|
| authController.js | 92.85 % |
| userController.js | 100 % |
| productController.js | 100 % |
| pedidoController.js | 100 % |

### Cobertura general

- Statements: **98.33 %**
- Branch: **100 %**
- Functions: **100 %**
- Lines: **98.33 %**

---

# Scripts disponibles

## Backend

Instalar dependencias

```bash
npm install
```

Iniciar servidor

```bash
node server.js
```

Ejecutar pruebas

```bash
npm test
```

Ejecutar pruebas con cobertura

```bash
npm test -- --coverage
```

---

## Frontend

Instalar dependencias

```bash
npm install
```

Modo desarrollo

```bash
npm run dev
```

Compilar producción

```bash
npm run build
```

Vista previa

```bash
npm run preview
```

---

# Variables de configuración

La conexión a la base de datos se configura en:

```
backend/config/db.js
```

Parámetros:

```js
host
user
password
database
```

---

# Buenas prácticas implementadas

Durante el desarrollo del proyecto se aplicaron las siguientes buenas prácticas:

- Arquitectura por capas.
- Código modular.
- Separación de responsabilidades.
- Uso de async/await.
- Manejo centralizado de errores.
- Organización por controladores.
- Reutilización de componentes React.
- Servicios independientes para consumo de API.
- Validación de datos antes de registrar información.
- Pruebas unitarias automatizadas.

---

# Posibles mejoras futuras

- Implementación de JWT para autenticación.
- Recuperación de contraseña.
- Subida de imágenes para productos.
- Dashboard con estadísticas.
- Reportes en PDF y Excel.
- Historial de pedidos.
- Notificaciones en tiempo real.
- Despliegue mediante Docker.
- Integración con CI/CD utilizando GitHub Actions.

---

# Estado del proyecto

**Versión:** 1.0

El proyecto se encuentra completamente funcional e integra los módulos de:

- Autenticación
- Gestión de usuarios
- Gestión de productos
- Gestión de pedidos
- Control de acceso por roles
- Pruebas unitarias automatizadas

Cumpliendo con los requisitos de la evidencia **Evidencia GA8-220501096-AA1-EV01**.

## Autor

**Gabriela Vega**  
Actividad de Aprendizaje 5 — Evidencia 03