import { createRequire } from "module";
const require = createRequire(import.meta.url);


const fs = require('fs');

let posts = [];

const FILENAME = 'Posts.json';

if (!fs.existsSync(FILENAME)) {
    fs.writeFileSync(FILENAME, JSON.stringify(posts));
} else {

    const fileData = fs.readFileSync(FILENAME, 'utf8');
    posts = JSON.parse(fileData);

}


function updateDataFilePosts() {
    fs.writeFileSync(FILENAME, JSON.stringify(posts, null, 2));
}

export { updateDataFilePosts, posts };
