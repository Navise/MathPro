const express = require('express');
const Student = require('../models/student');   
const authMiddleware = require('../middleware/authMiddleware');
const teacherAuthMiddleware = require('../middleware/teacherAuthMiddleware');
const router = express.Router();

router.get('/view', authMiddleware, teacherAuthMiddleware, async (req, res) => {
    try{
        const students = await Student.find({} , 'name email createdAt');

        return res.status(200).json({ students });
    }catch(err){
        return res.status(500).json({ message: 'Server error fetching Students data' });
    }
});

module.exports = router;