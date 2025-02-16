const express = require("express");
const jwt = require("jsonwebtoken");
const Teacher = require("../models/teacher");
require("dotenv").config();

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY;

router.post("/teacher/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    if (teacher.password !== password) {
      return res.status(400).json({ error: "Wrong Password" });
    }

    const token = jwt.sign(
      { userId: teacher._id, email: teacher.email, role:teacher.role, username: teacher.name },
      SECRET_KEY,
      { expiresIn: "7d" }
    );

    return res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    return res.status(500).json({ error: "Error logging in" });
  }
});

module.exports = router;
