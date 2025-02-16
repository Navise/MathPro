const studentAuthMiddleware = (req, res, next) => {
    
    if (!req.user) { 
        return res.status(401).json({ message: 'Unauthorized: Missing user information' });
    }

    if (req.user.role !== 'student') {
        return res.status(403).json({ message: 'Forbidden: Not a student' });
    }

    next();
};

module.exports = studentAuthMiddleware;