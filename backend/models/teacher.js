const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'teacher' }
},
{timestamps: true}
);

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
