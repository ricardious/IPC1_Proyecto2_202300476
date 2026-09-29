# Capturas de pantalla — USocial

Capturas de las ventanas principales de la aplicación, tomadas el 29/09/2026 con
`playwright-cli` en un viewport de **1440 × 900**.

| Archivo | Ventana | Ruta | Sesión |
|---|---|---|---|
| `01-landing.webp` | Página principal | `/` | Pública |
| `02-login.webp` | Inicio de sesión | `/login` | Pública |
| `03-register.webp` | Registro | `/register` | Pública |
| `04-home.webp` | Home (feed) | `/home` | `202300476` |
| `05-post-comentarios.webp` | Post con comentarios | `/home` | `202300476` |
| `06-profile.webp` | Editar perfil | `/profile` | `202300476` |
| `07-admin-users.webp` | Admin · Usuarios | `/admin` | `12024` |
| `08-admin-posts.webp` | Admin · Publicaciones | `/admin` | `12024` |
| `09-admin-modal.webp` | Admin · detalle | `/admin` | `12024` |
| `10-home-dark.webp` | Home en modo oscuro | `/home` | `202300476` |
| `11-admin-delete-modal.webp` | Admin · confirmar borrado | `/admin` | `12024` |

## Cómo regenerarlas

Con la app corriendo (client en `5173` y API en `3000`):

```bash
playwright-cli open http://localhost:5173/
playwright-cli resize 1440 900
playwright-cli screenshot --filename=docs/capturas/01-landing.webp
```

Para las vistas protegidas hay que iniciar sesión primero, por ejemplo:

```bash
playwright-cli goto http://localhost:5173/login
playwright-cli fill "input[name=carnet]" "202300476"
playwright-cli fill "input[name=contrasena]" "USocial@2026"
playwright-cli click "button[type=submit]"
playwright-cli screenshot --filename=docs/capturas/04-home.webp
```

Las credenciales de prueba están en [`docs/usuarios-de-prueba.md`](../usuarios-de-prueba.md).
