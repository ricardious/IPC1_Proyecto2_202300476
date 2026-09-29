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

if (!fs.existsSync(FILENAME)) {
    fs.writeFileSync(FILENAME, JSON.stringify(posts));
} else {

    const fileData = fs.readFileSync(FILENAME, 'utf8');
    posts = JSON.parse(fileData).map(normalize);

}


function updateDataFilePosts() {
    fs.writeFileSync(FILENAME, JSON.stringify(posts, null, 2));
}

export { updateDataFilePosts, posts };
