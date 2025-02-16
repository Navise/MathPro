const express = require('express');
const Question = require('../models/question');  
const authMiddleware = require('../middleware/authMiddleware'); 

const router = express.Router();

router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    
    const username = req.user.username;

    const integrationCount = await Question.countDocuments({ topic: 'integration' });
    const differentiationCount = await Question.countDocuments({ topic: 'differentiation' });

    res.json({
      username,  
      integrationCount,
      differentiationCount
    });

  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
