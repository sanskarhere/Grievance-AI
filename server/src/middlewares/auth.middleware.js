import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// Middleware to verify Neon Auth JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.NEON_AUTH_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
};

export default authenticateToken;