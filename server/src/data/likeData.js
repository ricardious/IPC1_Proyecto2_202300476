import { createRequire } from "module";
const require = createRequire(import.meta.url);



const fs = require('fs');

let likes = [];

const FILENAME = 'Likes.json';

if (!fs.existsSync(FILENAME)) {
    fs.writeFileSync(FILENAME, JSON.stringify(likes));
} else {

    const fileData = fs.readFileSync(FILENAME, 'utf8');
    likes = JSON.parse(fileData);

}


function updateDataFile() {
    fs.writeFileSync(FILENAME, JSON.stringify(likes, null, 2));
}

export { updateDataFile, likes };