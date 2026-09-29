# USocial

Red social tipo blog y foro para la comunidad de la Universidad de San Carlos
de Guatemala. Los usuarios pueden publicar anuncios, reportes y opiniones con
imágenes o solo texto, comentar, dar "Me gusta" y publicar de forma anónima;
el administrador gestiona usuarios y publicaciones y exporta los datos a CSV.

Aplicación cliente–servidor: una **API REST en Node.js + Express** y un
**frontend en React + Vite**.

---

## Características

### Autenticación
- Registro con carné único, correo validado y contraseña con reglas de
  seguridad (mínimo 8 caracteres, 1 mayúscula, 1 minúscula y 1 especial).
- Inicio y cierre de sesión con JWT en cookie.
- Dos roles: **usuario** y **administrador**, con redirección al módulo
  correspondiente (`/home` o `/admin`).
- Edición del perfil propio (el carné no es editable).

### Publicaciones
- Crear posts con **categoría** obligatoria (Anuncio Importante / Divertido /
  Académico / Variedad), imagen opcional y opción de **publicar en anónimo**.
- Feed ordenado del más reciente al más antiguo, con nombre y apellidos,
  carrera (facultad), categoría, texto, imagen, fecha y contadores.
- Los posts anónimos se muestran como *Usuario anónimo* de la
  *Universidad de San Carlos de Guatemala*.
- **Me gusta** (toggle por usuario) y **comentarios** de solo texto con autor,
  carrera y facultad.
- Endpoint de **tendencias** (top 10 por likes + comentarios).

### Administrador
- Panel con pestañas de **usuarios** y **publicaciones**.
- Ver el detalle de cada registro y eliminarlos.
- **Exportar a CSV** usuarios y publicaciones.

### Interfaz
- Tema claro y **oscuro**.
- Diseño **responsive**.
- Avatares generados con las iniciales del usuario.

---

## Tecnologías

| Capa | Herramientas |
|---|---|
| Backend | Node.js, Express, bcryptjs, jsonwebtoken, Zod, Multer, cookie-parser, CORS, Morgan |
| Frontend | React 18, Vite, React Router, TanStack Query, Axios, React Hook Form, Tailwind CSS, MUI Icons, Moment |
| Datos | Archivos JSON (`server/*.json`) |

---

## Requisitos

- **Node.js 18 o superior** (probado con Node 22)
- npm

---

## Ejecución

El proyecto son dos aplicaciones independientes; hay que levantar cada una en su
propia terminal.

**1. Backend (API, puerto 3000)**

```bash
cd server
npm install
npm run dev
```

**2. Frontend (interfaz, puerto 5173)**

```bash
cd client
npm install
npm run dev
```

Luego abre **http://localhost:5173**.

> El backend debe ejecutarse desde la carpeta `server/`, porque los archivos de
> datos usan rutas relativas.
>
> El frontend está configurado para consumir la API en `http://localhost:3000/api`
> y el CORS del servidor solo acepta el origen `http://localhost:5173`.

---

## Estructura del proyecto

```
IPC1_Proyecto2_202300476/
├── client/                 # Frontend (React + Vite)
│   ├── public/             # Archivos estáticos e imágenes subidas
│   └── src/
│       ├── api/            # Cliente Axios y llamadas a la API
│       ├── assets/         # Imágenes e iconos
│       ├── components/     # Navbar, barras laterales, posts, comentarios...
│       ├── context/        # Autenticación y tema oscuro
│       └── pages/          # Landing, Login, Registro, Home, Perfil, Admin
├── server/                 # Backend (API REST)
│   ├── *.json              # "Base de datos" (usuarios, posts, likes, comentarios)
│   └── src/
│       ├── controllers/    # Lógica de cada recurso
│       ├── data/           # Lectura/escritura de los JSON
│       ├── middlewares/    # Sesión y rol de administrador
│       ├── models/         # Modelos
│       ├── routes/         # Definición de endpoints
│       └── schemas/        # Validación con Zod
└── docs/                   # Documentación y capturas
```

---

## API

Base: `http://localhost:3000/api`

| Método | Endpoint | Acceso | Descripción |
|---|---|---|---|
| `POST` | `/register` | Público | Registrar usuario |
| `POST` | `/login` | Público | Iniciar sesión |
| `POST` | `/logout` | Público | Cerrar sesión |
| `GET` | `/verify` | Sesión | Validar la sesión activa |
| `GET` | `/profile` | Sesión | Datos del usuario autenticado |
| `PUT` | `/profile` | Sesión | Actualizar el perfil |
| `GET` | `/users` | Público | Listar usuarios |
| `DELETE` | `/delete/:carnet` | Público | Eliminar un usuario |
| `GET` | `/posts` | Público | Listar publicaciones (recientes primero) |
| `GET` | `/posts/trending` | Público | Top 10 por likes + comentarios |
| `POST` | `/posts` | Sesión | Crear publicación |
| `DELETE` | `/posts/:id` | Admin | Eliminar publicación |
| `GET` | `/comments?postId=` | Público | Comentarios de una publicación |
| `POST` | `/comments` | Sesión | Comentar una publicación |
| `GET` | `/likes?postId=` | Público | Usuarios que dieron "Me gusta" |
| `POST` | `/likes` | Sesión | Dar o quitar "Me gusta" (toggle) |
| `POST` | `/upload` | Público | Subir una imagen (`multipart`, campo `file`) |
| `GET` | `/export/users` | Admin | Exportar usuarios a CSV |
| `GET` | `/export/posts` | Admin | Exportar publicaciones a CSV |

---

## Usuarios de prueba

Las cuentas de prueba y sus credenciales están en
[`docs/usuarios-de-prueba.md`](docs/usuarios-de-prueba.md).

| Rol | Carné | Contraseña |
|---|---|---|
| Administrador | `12024` | `@dminIPC1` |
| Usuario | `202300476` | `USocial@2026` |

---

## Capturas

En [`docs/capturas/`](docs/capturas) hay imágenes de las ventanas principales
(página principal, login, registro, home, perfil, panel de administración y modo
oscuro).

## Documentación

- [`docs/Manual_Tecnico.pdf`](docs/Manual_Tecnico.pdf)
- [`docs/Manual_de_Usuario.pdf`](docs/Manual_de_Usuario.pdf)
- [`docs/[IPC1]Proyecto2.pdf`](docs/%5BIPC1%5DProyecto2.pdf) — enunciado

---

## Autor

**Alex Ricardo Castañeda Rodríguez** — Carné `202300476`
Introducción a la Programación y Computación 1 — Sección B
Universidad de San Carlos de Guatemala
