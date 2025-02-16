const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded; 
        next(); 
    } catch (err) {
        
        if (err instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'Token Expired' });
        } else if (err instanceof jwt.JsonWebTokenError || err instanceof jwt.NotBeforeError) {
            return res.status(401).json({ message: 'Invalid Token' });
        } else {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

module.exports = authMiddleware;