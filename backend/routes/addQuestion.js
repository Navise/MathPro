const express = require('express');
const router = express.Router();
const Question = require('../models/question');
const authMiddleware = require('../middleware/authMiddleware');
const teacherAuthMiddleware = require('../middleware/teacherAuthMiddleware');

router.post('/teacher/add', authMiddleware , teacherAuthMiddleware, async (req, res) => {
    try {
        
        const { problem, topic, concept, hints, solution } = req.body;

        if (!problem || !topic || !concept || !solution) {
            return res.status(400).json({ message: 'All required fields must be provided.' });
        }

        const newQuestion = new Question({
            problem,
            topic,
            concept,
            hints,
            solution,
        });

        await newQuestion.save();

        res.status(201).json({ message: 'Question added successfully!' });
    } catch (error) {
        console.error('Error adding question:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});



module.exports = router;