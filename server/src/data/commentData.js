import { createRequire } from "module";
const require = createRequire(import.meta.url);


const fs = require('fs');

let comments = [];

const FILENAME = 'Comments.json';

if (!fs.existsSync(FILENAME)) {
    fs.writeFileSync(FILENAME, JSON.stringify(comments));
} else {

    const fileData = fs.readFileSync(FILENAME, 'utf8');
    comments = JSON.parse(fileData);

}


function updateDataFileComments() {
    fs.writeFileSync(FILENAME, JSON.stringify(comments, null, 2));
}

export { updateDataFileComments, comments };
