const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    problem: {
        type: String,
        required: true,  
    },
    topic: {
        type: String,
        required: true,  
    },
    concept: {
        type: String,
        required: true, 
    },
    hints: {
        type: [String],  
        default: [],
    },
    solution: {
        type: String,
        required: true,  
    },
    createdAt: {
        type: Date,
        default: Date.now, 
    },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
