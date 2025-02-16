const express = require('express');
const fs = require('fs');
const path = require('path');

const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes'); 
const dashboard = require('./routes/dashboard');
const practice = require('./routes/practice');
const view = require('./routes/view');
const addQuestion = require('./routes/addQuestion');

const connectDB = require('./config/db');
require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

const rateLimit = require('express-rate-limit');
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 10, 
    message: 'Too many login attempts, please try again later',
});

const signupLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 10, 
    message: 'Too many signup attempts, please try again later',
});
app.use("/api/login", loginLimiter);
app.use("/api/signup", signupLimiter);

app.use("/api", studentRoutes);
app.use("/api", teacherRoutes); 
app.use("/api", dashboard);
app.use("/api", practice);
app.use("/api", view);
app.use("/api", addQuestion);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});