import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSun, FaMoon, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';
import { serverUrl } from '../config';

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark' || false);
    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.toggle('dark', isDarkMode);
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await axios.get(`${serverUrl}/api/dashboard`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    },
                });
                setDashboardData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                setLoading(false);
                if (error.response && error.response.status === 401) {
                    handleLogout();
                }
            }
        };

        fetchDashboardData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/');
    };

    const handleCardClick = (topic) => {
        navigate(`/practice/${topic.toLowerCase()}`);
    };

    if (loading) return <LoadingScreen isDarkMode={isDarkMode} />;
    if (!dashboardData) return <div className="text-center mt-8 text-red-500">Error loading data. Please try again later.</div>;

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-full bg-white dark:bg-gray-800 p-4 flex justify-between items-center shadow-md">
                <div className="text-xl font-semibold text-gray-800 dark:text-white">DEPARTMENT OF MATHEMATICS</div>
                <div className="flex items-center">
                    <span className="mr-2 text-gray-700 dark:text-gray-300 hidden md:block">Welcome, {dashboardData.username}</span>
                    <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full focus:outline-none">
                        {isDarkMode ? <FaSun className="text-white text-xl" /> : <FaMoon className="text-gray-700 dark:text-yellow-500 text-xl" />}
                    </button>
                    <button onClick={handleLogout} className="ml-4 p-2 rounded focus:outline-none">
                        <FaSignOutAlt className="text-gray-700 dark:text-white text-xl" />
                    </button>
                </div>
            </div>

            <div className="p-4 pt-2 md:p-6 container mx-auto">
                <div className=" mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white inline-block border-b-2 border-gray-500 dark:border-gray-400 pb-2 px-4">
                        PRACTICE
                    </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div
                        onClick={() => handleCardClick("integration")}
                        className={`w-11/12 mx-auto rounded-lg shadow-md h-40 p-4 flex flex-col justify-center items-center cursor-pointer 
                          ${isDarkMode ? 'bg-gray-800 text-white hover:border' : 'bg-white text-gray-800 border hover:text-gray-700 hover:border-black'}`}
                    >
                        <h3 className="text-xl font-semibold text-center uppercase">INTEGRATION</h3>
                        <p className="text-lg text-center pt-2">
                            {dashboardData.integrationCount !== undefined ? `${dashboardData.integrationCount} Questions` : "No questions available"}
                        </p>
                    </div>

                    <div
                        onClick={() => handleCardClick("differentiation")}
                        className={`w-11/12 mx-auto rounded-lg shadow-md h-40 p-4 flex flex-col justify-center items-center cursor-pointer
                        ${isDarkMode ? 'bg-gray-800 text-white hover:border' : 'bg-white text-gray-800 border hover:text-gray-700 hover:border-black'}`}
                    >
                        <h3 className="text-xl font-semibold text-center uppercase">DIFFERENTIATION</h3>
                        <p className="text-lg text-center pt-2">
                            {dashboardData.differentiationCount !== undefined ? `${dashboardData.differentiationCount} Questions` : "No questions available"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;