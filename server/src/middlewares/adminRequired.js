import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';
import { users } from '../data/userData.js';

// Verifica el token y que el usuario autenticado tenga rol admin
export const adminRequired = (req, res, next) => {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, TOKEN_SECRET, (err, payload) => {
        if (err) return res.status(403).json({ message: "Forbidden" });

        const userFound = users.find(user => user.carnet === payload.carnet);

        if (!userFound || userFound.role !== 'admin') {
            return res.status(403).json({ message: "Admin access required" });
        }

        req.user = payload;
        next();
    });
}
