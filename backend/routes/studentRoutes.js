require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const Student = require('../models/student');

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY;


router.post(
  '/signup',
  [
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      const existingStudent = await Student.findOne({ email });
      if (existingStudent) {
        return res.status(400).json({ error: 'Email already in use' });
      }

      const hashedPassword = await bcrypt.hash(password, 1);

      const newStudent = new Student({ name, email, password: hashedPassword});
      await newStudent.save();
      return res.status(201).json({ message: 'Student registered successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error registering student' });
    }
  }
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isString().notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const student = await Student.findOne({ email });
      if (!student) {
        return res.status(400).json({ error: 'Sign up first' }); 
      }

      const isPasswordValid = await bcrypt.compare(password, student.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign(
        {
          userId: student._id,
          email: student.email,
          role: student.role,
          username: student.name,
        },
        SECRET_KEY,
        { expiresIn: '7d' }
      );
      return res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error logging in' });
    }
  }
);

module.exports = router;
