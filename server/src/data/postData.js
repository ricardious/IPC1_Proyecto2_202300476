import { createRequire } from "module";
const require = createRequire(import.meta.url);


const fs = require('fs');

let posts = [];

const FILENAME = 'Posts.json';

// Normaliza registros viejos para que siempre tengan la estructura esperada
function normalize(post) {
    return {
        id: Number(post.id) || 0,
        user: post.user ?? null,
        description: typeof post.description === 'string' ? post.description : "",
        category: post.category || "Variedad",
        image: typeof post.image === 'string' ? post.image : "",
        anonymous: !!post.anonymous,
        date: post.date || new Date().toISOString(),
        name: post.name ?? null, // legado: primer nombre guardado del autor
    };
}

// Registros viejos comparten id: 1, lo que impedía borrarlos individualmente.
// Reasigna ids únicos conservando el primero y continuando desde el máximo.
function ensureUniqueIds(list) {
    const used = new Set();
    let max = list.reduce((acc, post) => Math.max(acc, post.id), 0);

    for (const post of list) {
        if (!post.id || used.has(post.id)) {
            max += 1;
            post.id = max;
        }
        used.add(post.id);
    }

    return list;
}

if (!fs.existsSync(FILENAME)) {
    fs.writeFileSync(FILENAME, JSON.stringify(posts));
} else {

    const fileData = fs.readFileSync(FILENAME, 'utf8');
    const original = JSON.parse(fileData);
    posts = ensureUniqueIds(original.map(normalize));

    // Persiste la migración (nuevos campos / ids únicos) si hubo cambios
    if (JSON.stringify(original) !== JSON.stringify(posts)) {
        updateDataFilePosts();
    }

}


function updateDataFilePosts() {
    fs.writeFileSync(FILENAME, JSON.stringify(posts, null, 2));
}

export { updateDataFilePosts, posts };
