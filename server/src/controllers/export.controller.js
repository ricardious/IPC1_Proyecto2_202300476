
import { users } from "../data/userData.js";
import { posts, updateDataFilePosts } from "../data/postData.js";

const escapeCell = (value) => {
    const text = value === undefined || value === null ? "" : String(value);
    // Envuelve en comillas si contiene coma, comilla o salto de línea
    if (/[",\n]/.test(text)) {
        return `"${text.replace(/"/g, '""')}"`;
    }
    return text;
};

const toCsv = (headers, rows) =>
    [headers, ...rows].map(row => row.map(escapeCell).join(",")).join("\n");

export const exportUsers = (req, res) => {
    const headers = [
        "carnet",
        "nombres",
        "apellidos",
        "genero",
        "facultad",
        "carrera",
        "correo",
        "role",
    ];

    const rows = users.map(user => [
        user.carnet,
        user.nombres,
        user.apellidos,
        user.genero,
        user.facultad,
        user.carrera,
        user.correo,
        user.role,
    ]);

    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", 'attachment; filename="users.csv"');
    res.send(toCsv(headers, rows));
};

export const exportPosts = (req, res) => {
    const headers = [
        "id",
        "codigo_usuario",
        "descripcion",
        "categoria",
        "imagen",
        "anonimo",
        "fecha",
    ];

    const rows = posts.map(post => [
        post.id,
        post.anonymous ? "anonimo" : post.user,
        post.description,
        post.category,
        post.image,
        post.anonymous,
        post.date,
    ]);

    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", 'attachment; filename="posts.csv"');
    res.send(toCsv(headers, rows));
};
