import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../config";

function StudentLogin() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      setSuccess("");
      return;
    }

    if (formData.password.length < 8 || formData.password.length > 20) {
      setError("Length of Password must minimum be 8 ");
      setSuccess("");
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setSuccess("");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email.");
      setSuccess("");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

    const url = isLogin ? `${serverUrl}/api/login` : `${serverUrl}/api/signup`;
    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        };
    
        console.log("Payload:", payload);

    try {
      const response = await axios.post(url, payload);

      setSuccess(response.data.message);
      setError("");

      if (isLogin) {
        const token = response.data.token; 
        localStorage.setItem("authToken", token);
        navigate("/studentdashboard") 
      } else {
        toggleForm(); 
      }
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred. Please try again.");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    setError("");
    setSuccess("");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-blue-700">
      <div className="bg-white p-10 rounded-xl shadow-lg w-10/12 md:w-4/6 max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {isLogin ? "Student Login" : "Student Sign Up"}
        </h2>

        <div className="flex justify-between mb-6">
          <button
            onClick={toggleForm}
            className={`py-2 px-4 rounded-lg w-1/2 transition-all duration-300 ${
              isLogin ? "bg-blue-500 text-white" : "text-blue-500"
            }`}
          >
            Login
          </button>
          <button
            onClick={toggleForm}
            className={`py-2 px-4 rounded-lg w-1/2 transition-all duration-300 ${
              isLogin ? "text-blue-500" : "bg-green-500 text-white"
            }`}
          >
            Sign Up
          </button>
        </div>

        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
        {success && <div className="mb-4 text-green-600 text-center">{success}</div>}
        {loading && <div className="mb-4 text-blue-500 text-center">Processing...</div>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-800 text-lg">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
                required
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-800 text-lg">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-800 text-lg">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-800 text-lg">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm your password"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 text-white rounded-lg bg-blue-500 hover:bg-blue-700 transition-all duration-300"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default StudentLogin;
