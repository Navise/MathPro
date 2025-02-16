const teacherAuthMiddleware = (req, res, next) => {

    if (!req.user) { 
        return res.status(401).json({ message: 'Unauthorized: Missing user information' }); 
    }
    if (req.user.role !== 'teacher') {
        return res.status(403).json({ message: 'Forbidden: Only teachers are allowed' });
    }

    next();
};

module.exports = teacherAuthMiddleware;