# Sistema de Autenticación y Gestión de Usuarios

## Evidencia

**GA7-220501096-AA5-EV01**
**Diseño y desarrollo de servicios web - caso**

---

# Descripción del Proyecto

Este proyecto consiste en el diseño y desarrollo de un sistema de autenticación y gestión de usuarios basado en una arquitectura cliente-servidor.

La solución implementa una API REST desarrollada con Node.js, Express y MySQL para la gestión de usuarios, autenticación y control de roles, junto con una interfaz gráfica desarrollada en React y Vite para la interacción con el usuario.

El sistema permite:

- Registro de usuarios.
- Inicio de sesión.
- Gestión de usuarios mediante operaciones CRUD.
- Validación de usuarios duplicados.
- Control de acceso basado en roles.
- Protección de rutas.
- Gestión de sesiones.
- Encriptación de contraseñas.
- Integración con base de datos MySQL.

---

# Objetivo General

Desarrollar servicios web reutilizables que permitan el registro, autenticación y administración de usuarios mediante una arquitectura REST, cumpliendo con los criterios establecidos para la evidencia GA7-220501096-AA5-EV01.

---

# Objetivos Específicos

- Diseñar una API REST para la gestión de usuarios.
- Implementar autenticación mediante credenciales.
- Aplicar encriptación de contraseñas.
- Gestionar roles de usuario.
- Implementar operaciones CRUD.
- Consumir servicios web desde React.
- Restringir el acceso a funcionalidades según el rol.
- Implementar protección de rutas y sesiones.

---

# Tecnologías Utilizadas

## Backend

- Node.js
- Express.js
- MySQL
- XAMPP
- bcryptjs
- cors

## Frontend

- React
- Vite
- Axios
- Bootstrap 5
- React Router DOM

## Control de Versiones

- Git
- GitHub

---

# Arquitectura del Proyecto

## Backend

```text
backend/

├── config/
│   └── db.js

├── controllers/
│   ├── authController.js
│   └── userController.js

├── routes/
│   ├── authRoutes.js
│   └── userRoutes.js

├── server.js

└── package.json
```

---

## Frontend

```text
frontend/

├── src/

│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── DashboardAdmin.jsx
│   │   ├── DashboardTendero.jsx
│   │   ├── DashboardMayorista.jsx
│   │   └── Users.jsx

│   ├── services/
│   │   ├── authService.js
│   │   └── userService.js

│   ├── components/
│   │   └── ProtectedRoute.jsx

│   ├── App.jsx
│   └── main.jsx

└── package.json
```

---

# Base de Datos

## Crear Base de Datos

```sql
CREATE DATABASE conectacomercio_api;
```

## Seleccionar Base de Datos

```sql
USE conectacomercio_api;
```

## Crear Tabla Usuarios

```sql
CREATE TABLE usuarios(

 id INT AUTO_INCREMENT PRIMARY KEY,

 usuario VARCHAR(100) UNIQUE NOT NULL,

 password VARCHAR(255) NOT NULL,

 rol ENUM(
 'admin',
 'tendero',
 'mayorista'
 ) NOT NULL DEFAULT 'tendero',

 fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);
```

---

# Roles del Sistema

## Administrador

Permisos:

- Registrar usuarios.
- Consultar usuarios.
- Actualizar usuarios.
- Eliminar usuarios.
- Acceder al panel administrativo.
- Gestionar la plataforma.

---

## Tendero

Permisos:

- Iniciar sesión.
- Acceder al panel de tendero.

---

## Mayorista

Permisos:

- Iniciar sesión.
- Acceder al panel de mayorista.

---

# Seguridad Implementada

## Protección de Rutas

Se implementó el componente:

```text
ProtectedRoute.jsx
```

Su función es validar:

- Existencia de sesión activa.
- Rol autorizado.
- Restricción de acceso por URL.

Si la validación falla, el sistema redirecciona automáticamente al Login.

---

## Gestión de Sesiones

La información de la sesión se almacena mediante LocalStorage.

Datos almacenados:

```text
sesion
usuario
rol
```

Al cerrar sesión:

- Se eliminan los datos almacenados.
- Se redirecciona al Login.
- Se evita regresar mediante el botón Atrás del navegador.

---

## Encriptación de Contraseñas

Las contraseñas se almacenan utilizando:

```bash
bcryptjs
```

Proceso:

1. El usuario registra una contraseña.
2. Se genera un hash seguro.
3. El hash se almacena en MySQL.
4. Durante el Login se compara mediante bcrypt.compare().

---

# Instalación

## Clonar Proyecto

```bash
git clone https://github.com/usuario/proyecto.git
```

---

# Instalación Backend

```bash
cd backend
npm install
```

Ejecutar servidor:

```bash
node server.js
```

o

```bash
npx nodemon server.js
```

Servidor:

```text
http://localhost:3001
```

---

# Instalación Frontend

```bash
cd frontend
npm install
npm run dev
```

Aplicación:

```text
http://localhost:5173
```

---

# Endpoints de la API

## Registro

### Método

```http
POST
```

### Endpoint

```http
/api/register
```

### Body

```json
{
  "usuario": "admin",
  "password": "123456",
  "rol": "admin"
}
```

### Respuesta

```json
{
  "mensaje": "Usuario registrado correctamente"
}
```

---

## Inicio de Sesión

### Método

```http
POST
```

### Endpoint

```http
/api/login
```

### Body

```json
{
  "usuario": "admin",
  "password": "123456"
}
```

### Respuesta

```json
{
  "mensaje": "Autenticación satisfactoria",
  "usuario": "admin",
  "rol": "admin"
}
```

---

## Obtener Usuarios

### Método

```http
GET
```

### Endpoint

```http
/api/users
```

---

## Crear Usuario

### Método

```http
POST
```

### Endpoint

```http
/api/users
```

---

## Actualizar Usuario

### Método

```http
PUT
```

### Endpoint

```http
/api/users/:id
```

---

## Eliminar Usuario

### Método

```http
DELETE
```

### Endpoint

```http
/api/users/:id
```

---

# Interfaces Implementadas

## Login

Permite autenticar usuarios registrados y redireccionar según su rol.

---

## Registro

Permite registrar nuevos usuarios en la base de datos.

---

## Dashboard Administrador

Módulo actual:

- Gestión de usuarios.

Módulos futuros:

- Gestión de productos.
- Gestión de pedidos.
- Reportes administrativos.
- Configuración general.
- Auditoría del sistema.
- Estadísticas.

---

## Dashboard Tendero

Módulos futuros:

- Consulta de productos.
- Solicitud de pedidos.
- Historial de compras.
- Gestión de inventario.
- Seguimiento de entregas.
- Reportes comerciales.

---

## Dashboard Mayorista

Módulos futuros:

- Administración de productos.
- Gestión de inventario.
- Gestión de pedidos.
- Seguimiento de entregas.
- Promociones.
- Reportes de ventas.

---

# Funcionalidades Implementadas

- Registro de usuarios.
- Inicio de sesión.
- Encriptación de contraseñas.
- Validación de usuarios duplicados.
- CRUD completo de usuarios.
- Gestión de roles.
- Protección de rutas.
- Restricción de acceso por rol.
- Gestión de sesiones.
- Consumo de API REST mediante Axios.
- Integración con MySQL.
- Arquitectura cliente-servidor.
- Navegación protegida mediante React Router DOM.

---

# Pruebas Realizadas

## Registro de Usuario

Resultado esperado:

- Registro exitoso.

Resultado obtenido:

- Cumplido.

---

## Inicio de Sesión

Resultado esperado:

- Autenticación correcta.

Resultado obtenido:

- Cumplido.

---

## Validación de Usuario Duplicado

Resultado esperado:

- Impedir registros repetidos.

Resultado obtenido:

- Cumplido.

---

## Gestión de Usuarios

Resultado esperado:

- Crear, consultar, actualizar y eliminar usuarios.

Resultado obtenido:

- Cumplido.

---

## Protección de Rutas

Resultado esperado:

- Restringir acceso sin autenticación.

Resultado obtenido:

- Cumplido.

---

## Restricción por Rol

Resultado esperado:

- Permitir acceso únicamente a los módulos autorizados.

Resultado obtenido:

- Cumplido.

---

# Resultados Obtenidos

Se desarrolló una aplicación web funcional basada en servicios web REST que permite gestionar usuarios, autenticar credenciales y controlar el acceso mediante roles.

La solución cumple con los requerimientos planteados para la evidencia GA7-220501096-AA5-EV01 y constituye la base para futuras funcionalidades del proyecto ConectaComercio.

---

# Conclusiones

- Se implementó correctamente una arquitectura REST.
- Se integró una base de datos MySQL para la persistencia de información.
- Se aplicaron mecanismos de seguridad mediante bcryptjs.
- Se desarrolló un sistema de autenticación basado en roles.
- Se implementó protección de rutas y sesiones.
- Se fortalecieron conocimientos en Node.js, Express, React y MySQL.
- El proyecto puede escalarse fácilmente para incorporar nuevos módulos comerciales.

---

# Autor

**Gabriela Vega **

**Programa:** Análisis y Desarrollo de Software

**Centro de Formación:** Servicio Nacional de Aprendizaje - SENA

**Evidencia:** GA7-220501096-AA5-EV01 Diseño y desarrollo de servicios web - caso.
