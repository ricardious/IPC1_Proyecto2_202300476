# Usuarios de prueba — USocial

Cuentas creadas para pruebas y demostración. Todas usan la **misma contraseña**:

> Contraseña general: `USocial@2026`

> [!IMPORTANT]
> Estas credenciales son solo para pruebas locales. Cámbialas si el repositorio
> llegara a ser público.

## Cuentas

| Carnet | Nombre completo | Género | Facultad | Carrera | Correo | Rol |
|---|---|---|---|---|---|---|
| `12024` | Josué Rodolfo Morales Castillo | Masculino | Ingeniería | Ciencias y Sistemas | ipc11s2024@email.com | **admin** |
| `202300476` | Alex Ricardo Castañeda Rodríguez | Male | Ingeniería | Ciencias y Sistemas | 202300476@gmail.com | user |
| `202300001` | Ana María García López | Femenino | Ingeniería | Ingeniería en Sistemas | ana.garcia@ingenieria.usac.edu.gt | user |
| `202300002` | Carlos Alberto Pérez Martínez | Masculino | Ingeniería | Ingeniería Química | carlos.perez@ingenieria.usac.edu.gt | user |
| `202300003` | Luisa Fernanda Martínez González | Femenino | Ciencias Económicas | Administración de Empresas | luisa.martinez@ce.usac.edu.gt | user |
| `202300004` | Juan Carlos García Hernández | Masculino | Medicina | Medicina | juan.garcia@medicina.usac.edu.gt | user |
| `202300005` | Sofía Alejandra Ramírez Ortiz | Femenino | Arquitectura | Arquitectura | sofia.ramirez@arquitectura.usac.edu.gt | user |

> El admin **no** es editable ni eliminable desde el panel; su contraseña es
> `@dminIPC1`. El resto de cuentas se pueden modificar en *Edit Profile*.

## Publicaciones de ejemplo

| Autor | Categoría | Anónimo | Contenido |
|---|---|---|---|
| Ana María García López | Anuncio Importante | No | Arranca el segundo semestre, revisen sus horarios en el portal. |
| Carlos Alberto Pérez Martínez | Variedad | No | ¿Alguien más tiene problemas con el wifi en el edificio T-3? |
| Luisa Fernanda Martínez González | Académico | No | Tip: el laboratorio de IPC1 está abierto hasta las 6 pm. |
| Juan Carlos García Hernández | Divertido | No | No se pierdan el partido de la facultad este viernes. |
| Alex Ricardo Castañeda Rodríguez | Variedad | No | Probando USocial, primer post de mi cuenta. |
| Sofía Alejandra Ramírez Ortiz | Anuncio Importante | **Sí** | Hay un vehículo abandonado en el parqueo desde hace una semana. |
| Carlos Alberto Pérez Martínez | Variedad | No | El tráfico hacia la USAC hoy estuvo terrible. |

Se agregaron además **likes** y **comentarios** de varios usuarios para que los
contadores del Home no aparezcan en cero.

## Cómo restablecer la base

Para volver a empezar dejando solo al admin, sustituye el contenido de
`server/Users.json` por la cuenta `12024` y vacía `server/Posts.json`,
`server/Likes.json` y `server/Comments.json` con `[]`.
