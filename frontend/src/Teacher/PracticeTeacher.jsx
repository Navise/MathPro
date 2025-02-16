import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaMoon, FaSun } from 'react-icons/fa';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import LoadingScreen from '../components/LoadingScreen';
import { serverUrl } from '../config';

const PracticeTeacher = () => {
  const { topic } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [showHint, setShowHint] = useState([]);
  const [showConcept, setShowConcept] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const fetchPracticeQuestions = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/question?topic=${topic}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('teacherToken')}`,
          },
        });
        setQuestions(response.data.data || []);
      } catch (error) {
        setError('Failed to load questions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPracticeQuestions();
  }, [topic]);

  const handleQuestionChange = (index) => {
    setCurrentQuestionIndex(index);
    setShowSolution(false);
    setShowHint([]);
    setShowConcept(false);
  };

  if (loading) return <LoadingScreen isDarkMode={darkMode} />;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (questions.length === 0) return <div className="text-center text-lg font-semibold">No questions available for this topic</div>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 dark:bg-gray-900">
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          className="p-2 text-lg rounded-full bg-gray-200 dark:bg-gray-800 dark:text-white"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      <aside className="w-full md:w-1/5 bg-white dark:bg-gray-800 p-4 border-r border-gray-300 dark:border-gray-700 overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-700 dark:text-white mb-4">Questions</h2>

        <div className="flex md:hidden overflow-x-auto space-x-2 pb-4">
          {questions.map((_, index) => (
            <button
              key={index}
              className={`flex-shrink-0 px-4 py-2 font-medium border rounded-md transition-all duration-300 ${
                currentQuestionIndex === index
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
              }`}
              onClick={() => handleQuestionChange(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <div className="hidden md:block">
          {questions.map((_, index) => (
            <button
              key={index}
              className={`w-full mb-2 p-3 text-left font-medium border rounded-md transition-all duration-300 ${
                currentQuestionIndex === index
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
              }`}
              onClick={() => handleQuestionChange(index)}
            >
              Question {index + 1}
            </button>
          ))}
        </div>
      </aside>

      <main className="w-full md:w-3/4 p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Practice: {topic.toUpperCase()}</h1>
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-800 dark:text-gray-300 mb-4">
          <div className="overflow-x-auto break-words whitespace-normal">
    <BlockMath math={currentQuestion.problem} />
        </div>
            </h2> 
          <button
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={() => setShowConcept((prev) => !prev)}
          >
            {showConcept ? 'Hide Concept' : 'Show Concept'}
          </button>
          {showConcept && (
            <p className="bg-gray-100 dark:bg-gray-800 p-4 border-l-4 border-blue-500 mb-4 rounded-md text-gray-800 dark:text-gray-300 overflow-x-auto break-words whitespace-normal">       
      <BlockMath math={currentQuestion.concept} />
              
            </p>
          )}
        </div>

        {currentQuestion.hints && currentQuestion.hints.length > 0 && (
          <div className="mb-6">
            {currentQuestion.hints.map((hint, index) => (
              <div key={index} className="mb-4">
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  onClick={() =>
                    setShowHint((prev) => ({ ...prev, [index]: !prev[index] }))
                  }
                >
                  {showHint[index] ? `Hide Hint ${index + 1}` : `Show Hint ${index + 1}`}
                </button>
                {showHint[index] && (
                  <p className="bg-gray-100 dark:bg-gray-800 p-4 border-l-4 border-green-500 mt-2 rounded-md text-gray-800 dark:text-gray-300 overflow-x-auto break-words whitespace-normal">
                    <BlockMath math={hint} />
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        <button
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          onClick={() => setShowSolution((prev) => !prev)}
        >
          {showSolution ? 'Hide Solution' : 'Show Solution'}
        </button>
        {showSolution && (
            <p className="bg-gray-100 dark:bg-gray-800 p-4 border-l-4 border-red-500 mt-4 rounded-md text-gray-800 dark:text-gray-300 overflow-x-auto break-words whitespace-normal">
    <BlockMath math={currentQuestion.solution} />
          </p>
        
        )}
      </main>
    </div>
  );
};

export default PracticeTeacher;
