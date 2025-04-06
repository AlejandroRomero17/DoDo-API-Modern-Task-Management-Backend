# DoDo! - Backend

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

Este proyecto permite gestionar tareas y usuarios, con las siguientes funcionalidades:
- **Usuarios**: Registro e inicio de sesión con autenticación JWT.
- **Tareas**: Crear, leer, actualizar y eliminar tareas.

Utiliza las siguientes tecnologías:
- **Express**: Framework para construir APIs RESTful.
- **MongoDB**: Base de datos NoSQL para almacenar las tareas y usuarios.
- **JWT**: Para la autenticación de usuarios.
- **Winston**: Para la gestión de logs.

---

## Características

- API RESTful con autenticación basada en **JWT**.
- Documentación interactiva a través de **Swagger** (implementada manualmente).
- Gestión de usuarios con **registro** y **inicio de sesión**.
- CRUD para las tareas (To-Do).
- Seguridad con **CORS** y **rate limiting**.

---

## Requisitos

Antes de ejecutar el proyecto, asegúrate de tener instalado lo siguiente:

1. **Node.js** 18+
2. **MongoDB** en ejecución local o un servicio de MongoDB en la nube.
3. **Dependencias del proyecto** (ver `package.json`).
4. **Variables de entorno** (ver `.env`).

---

## Instalación

Sigue estos pasos para configurar el proyecto en tu entorno local:

1. **Clona este repositorio**:
   ```bash
   git clone https://github.com/AlejandroRomero17/DoDo-API-Modern-Task-Management-Backend
   cd DoDo-API-Modern-Task-Management-Backend
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

3. **Configura las variables de entorno**:
   Crea un archivo `.env` en la raíz del proyecto y agrega los siguientes valores:
   ```env
   NODE_ENV=development
   PORT=5000
   DB_URL=mongodb://localhost:27017/todo
   JWT_SECRET=mi_secreto_para_jwt
   JWT_EXPIRES_IN=1d
   ```

4. **Ejecuta el servidor**:
   ```bash
   npm run dev
   ```

La API estará disponible en `http://localhost:5000`.

---

## Uso

### Documentación interactiva

- **Swagger UI**: Accede a `/api-docs` para explorar y probar los endpoints.

### Ejemplo de JSON para crear un usuario

```json
{
    "userName": "juanperez123",
    "firstName": "Juan",
    "lastName": "Pérez",
    "password": "contraseña_segura"
}
```

Envía este JSON a la ruta `POST /api/auth/register` para crear un nuevo usuario.

### Ejemplo de JSON para crear una tarea

```json
{
    "title": "Comprar pan",
    "description": "Comprar pan en la tienda del barrio",
    "completed": false
}
```

Envía este JSON a la ruta `POST /api/todo` para crear una nueva tarea.

---

## Endpoints

### Usuarios

- `POST /api/auth/register`: Crea un nuevo usuario.
- `POST /api/auth/login`: Inicia sesión y obtiene un token JWT.

### Tareas (To-Do)

- `GET /api/todo`: Obtiene todas las tareas.
- `POST /api/todo`: Crea una nueva tarea.
- `GET /api/todo/:id`: Obtiene una tarea por ID.
- `PUT /api/todo/:id`: Actualiza una tarea existente.
- `DELETE /api/todo/:id`: Elimina una tarea.

---

## Contribuciones

Si deseas contribuir al proyecto, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -m "Añadir nueva funcionalidad"`).
4. Sube tus cambios (`git push origin feature/nueva-funcionalidad`).
5. Abre un pull request.

Toda ayuda es bienvenida, ya sea para corregir errores, mejorar la documentación o agregar nuevas características.

---

## Licencia

Este proyecto está bajo la licencia **MIT**. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

## Contacto

Si tienes preguntas o sugerencias, no dudes en contactarme:

- **Nombre**: Alejandro Gonzalez Romero
- **Correo electrónico**: gonzalez.romero.alejandroo@gmail.com
- **GitHub**: [https://github.com/AlejandroRomero17](https://github.com/AlejandroRomero17)
