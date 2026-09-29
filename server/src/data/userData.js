import { createRequire } from "module";
const require = createRequire(import.meta.url);
import bcrypt from 'bcryptjs';


const fs = require('fs');

let users = [];

const FILENAME = 'Users.json';

if (!fs.existsSync(FILENAME)) {
    fs.writeFileSync(FILENAME, JSON.stringify(users));
} else {

    const fileData = fs.readFileSync(FILENAME, 'utf8');
    users = JSON.parse(fileData);

}


function updateDataFile() {
    fs.writeFileSync(FILENAME, JSON.stringify(users, null, 2));
}

function hashPasswords() {
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (user.contrasena && !user.isHashedPassword) {
            const hashedPassword = bcrypt.hashSync(user.contrasena, 10);
            user.contrasena = hashedPassword;
            user.isHashedPassword = true;
        }
    }
}




export { updateDataFile, users, hashPasswords };