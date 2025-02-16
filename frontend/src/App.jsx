import React from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";

import ProtectedRouteStudent from "./ProtectedRouteStudent"; 
import ProtectedRouteTeacher from "./ProtectedRouteTeacher";

import Home from "./components/Home";
import StudentLogin from "./components/StudentLogin";
import TeacherLogin from "./components/TeacherLogin";
import Unauthorized from "./components/Unauthorized"; 
import NotFound from "./components/404";

import StudentDashboard from "./Student/StudentDashboard"; 
import TeacherDashboard from "./Teacher/TeacherDashboard";
import PracticeStudent from "./Student/PracticeStudent";
import PracticeTeacher from "./Teacher/PracticeTeacher";
import ViewStudents from "./Teacher/ViewStudents";
import AddQuestions from "./Teacher/AddQuestions";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/studentlogin" element={<StudentLogin />} />
        <Route path="/teacherlogin" element={<TeacherLogin />} />

        <Route
          path="/studentdashboard"
          element={
            <ProtectedRouteStudent allowedRoles={["student"]}>
              <StudentDashboard />
            </ProtectedRouteStudent>
          }
        />

        <Route
          path="/practice/:topic"
          element={
            <ProtectedRouteStudent allowedRoles={["student" ]}>
              <PracticeStudent />
            </ProtectedRouteStudent>
          }
        />


        <Route
          path="/teacherdashboard"
          element={
            <ProtectedRouteTeacher allowedRoles={["teacher"]}>
              <TeacherDashboard />
            </ProtectedRouteTeacher>
          }
        />

        <Route
          path="/teacher/practice/:topic"
          element={
            <ProtectedRouteTeacher allowedRoles={["teacher"]}>
              <PracticeTeacher />
            </ProtectedRouteTeacher>
          }
        />

        <Route
          path="/teacher/view"
          element={
            <ProtectedRouteTeacher allowedRoles={["teacher"]}>
              <ViewStudents />
            </ProtectedRouteTeacher>
          }
        />

        <Route
          path="/teacher/add"
          element={
            <ProtectedRouteTeacher allowedRoles={["teacher"]}>
              <AddQuestions />
            </ProtectedRouteTeacher>
          }
        />

        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
