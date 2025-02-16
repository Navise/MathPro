const express = require('express');
const router = express.Router();
const Question = require('../models/question');

const authMiddleware = require('../middleware/authMiddleware'); 

router.get('/question', authMiddleware, async (req, res) => {
    try {
        const { topic } = req.query;

        const validTopics = ['integration', 'differentiation'];
        if (!validTopics.includes(topic)) {
            return res.status(400).json({ error: 'Invalid topic. Please select a valid topic.' });
        }

        const questions = await Question.find({ topic });

        if (!questions || questions.length === 0) {
            return res.status(404).json({ message: `No questions found for topic: ${topic}` });
        }

        res.status(200).json({ success: true, data: questions });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving the questions.' });
    }
});

module.exports = router;
