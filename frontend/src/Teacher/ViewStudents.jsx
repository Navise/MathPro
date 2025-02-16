import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSun, FaMoon, FaSignOutAlt, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';
import { serverUrl } from '../config';

const ViewStudent = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark' || false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/view`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('teacherToken')}`,
          },
        });
        setStudents(response.data.students);
        setFilteredStudents(response.data.students);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching student data:', error);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filtered = students.filter(
      (student) =>
        student.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        student.email.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredStudents(filtered);
  };

  const handleLogout = () => {
    localStorage.removeItem('teacherToken');
    navigate('/');
  };

  if (loading) return <LoadingScreen isDarkMode={isDarkMode} />;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full bg-white dark:bg-gray-800 p-4 flex justify-between items-center shadow-md">
        <div className="text-xl font-semibold text-gray-800 dark:text-white">Student Management</div>
        <div className="flex items-center">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full focus:outline-none"
          >
            {isDarkMode ? <FaSun className="text-white text-xl" /> : <FaMoon className="text-gray-700 dark:text-yellow-500 text-xl" />}
          </button>
          <button onClick={handleLogout} className="ml-4 p-2 rounded focus:outline-none">
            <FaSignOutAlt className="text-gray-700 dark:text-white text-xl" />
          </button>
        </div>
      </div>

      <div className="p-4 md:p-6 container mx-auto">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white inline-block border-b-2 border-gray-500 dark:border-gray-400 pb-2 px-4">
            Students List
          </h2>
          <div className="relative w-1/3">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search by name or email"
              className="w-full p-2 pl-10 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300" />
          </div>
        </div>

        <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Joining Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student._id} className="border-b border-gray-300 dark:border-gray-600">
                  <td className="py-2 px-4 text-gray-800 dark:text-white">{student.name}</td>
                  <td className="py-2 px-4 text-gray-800 dark:text-white">{student.email}</td>
                  <td className="py-2 px-4 text-gray-800 dark:text-white">
                    {new Date(student.createdAt).toLocaleDateString('en-GB')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewStudent;
