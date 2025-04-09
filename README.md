# DoDo! - Backend

**URL de la API en Producción:**
[https://taskflow-api-modern-task-management.onrender.com](https://taskflow-api-modern-task-management.onrender.com)

Este proyecto implementa una API para gestionar tareas (To-Do), con funcionalidades de autenticación y seguridad utilizando **Express**, **JWT** y **MongoDB**.

![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)

## Tabla de contenidos

- [DoDo! - Backend](#dodo---backend)
  - [Tabla de contenidos](#tabla-de-contenidos)
  - [Descripción](#descripción)
  - [Características](#características)
  - [Requisitos](#requisitos)
  - [Instalación](#instalación)
  - [Uso](#uso)
    - [Documentación interactiva](#documentación-interactiva)
    - [Ejemplo de JSON para crear un usuario](#ejemplo-de-json-para-crear-un-usuario)
    - [Ejemplo de JSON para crear una tarea](#ejemplo-de-json-para-crear-una-tarea)
  - [Endpoints](#endpoints)
    - [Usuarios](#usuarios)
    - [Tareas (To-Do)](#tareas-to-do)
  - [Contribuciones](#contribuciones)
  - [Licencia](#licencia)
  - [Contacto](#contacto)

---

## Descripción

DoDo! es una API diseñada para gestionar tareas y usuarios, ofreciendo:

- **Usuarios:** Registro e inicio de sesión mediante autenticación basada en JWT.
- **Tareas:** Crear, leer, actualizar y eliminar tareas (CRUD).

Utiliza tecnologías modernas como:

- **Express:** Framework para la creación de APIs RESTful.
- **MongoDB:** Base de datos NoSQL para almacenar datos de usuarios y tareas.
- **JWT:** Para la autenticación segura de los usuarios.
- **Winston:** Para la gestión y registro de logs.

---

## Características

- **API RESTful** con autenticación y autorización mediante JWT.
- **Documentación interactiva** a través de Swagger, facilitando el desarrollo y pruebas.
- **Gestión completa de usuarios**, permitiendo el registro e inicio de sesión.
- **Operaciones CRUD** para gestionar tareas (To-Do).
- **Seguridad reforzada** con CORS, rate limiting y validaciones de entrada.

---

## Requisitos

Antes de ejecutar el proyecto, asegúrate de contar con lo siguiente:

1. **Node.js** 18 o superior.
2. **MongoDB** en ejecución local o un servicio en la nube.
3. Las dependencias del proyecto (consultar `package.json`).
4. Variables de entorno configuradas (ver sección de instalación).

---

## Instalación

Para configurar el proyecto en tu entorno local, sigue estos pasos:

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/AlejandroRomero17/DoDo-API-Modern-Task-Management-Backend
   cd DoDo-API-Modern-Task-Management-Backend
   ```

2. **Instalar las dependencias:**

   ```bash
   npm install
   ```

3. **Configurar las variables de entorno:**

   Crea un archivo `.env` en la raíz del proyecto y añade lo siguiente:
   ```env
   NODE_ENV=development
   PORT=5000
   DB_URL=mongodb://localhost:27017/todo
   JWT_SECRET=mi_secreto_para_jwt
   JWT_EXPIRES_IN=1d
   ```

4. **Ejecutar el servidor:**

   ```bash
   npm run dev
   ```

La API estará disponible en `http://localhost:5000` (para entorno local).

---

## Uso

### Documentación interactiva

Accede a la documentación en tiempo real a través de Swagger UI:

- **Producción:** [https://taskflow-api-modern-task-management.onrender.com/api-docs](https://taskflow-api-modern-task-management.onrender.com/api-docs)
- **Local:** [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

Desde Swagger podrás explorar, testear y entender cada endpoint de la API.
Si el endpoint requiere autenticación, utiliza el botón **Authorize** e introduce tu token en el formato `Bearer <tu-token>`.

### Ejemplo de JSON para crear un usuario

```json
{
  "userName": "juanperez123",
  "firstName": "Juan",
  "lastName": "Pérez",
  "password": "contraseña_segura"
}
```

### Ejemplo de JSON para crear una tarea

```json
{
  "title": "Comprar pan",
  "description": "Comprar pan en la tienda del barrio",
  "completed": false
}
```

---

## Endpoints

### Usuarios

- `POST /api/auth/register`: Registra un nuevo usuario.
- `POST /api/auth/login`: Inicia sesión y devuelve un token JWT.

### Tareas (To-Do)

- `POST /api/todo/create-to-do`: Crea una nueva tarea.
- `GET /api/todo/get-all-to-do/:userId`: Obtiene todas las tareas de un usuario.
- `PATCH /api/todo/update-to-do/:id`: Actualiza una tarea por ID.
- `DELETE /api/todo/delete-to-do/:id`: Elimina una tarea por ID.

---

## Contribuciones

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -m "Añadir nueva funcionalidad"`).
4. Sube tus cambios (`git push origin feature/nueva-funcionalidad`).
5. Abre un pull request.

---

## Licencia

Este proyecto está bajo la licencia **MIT**.

---

## Contacto

- **Nombre:** Alejandro Gonzalez Romero
- **Correo electrónico:** gonzalez.romero.alejandroo@gmail.com
- **GitHub:** [https://github.com/AlejandroRomero17](https://github.com/AlejandroRomero17)
