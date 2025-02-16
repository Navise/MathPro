import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaMoon, FaSun, FaQuestionCircle } from 'react-icons/fa';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { serverUrl } from '../config';

const AddQuestion = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [problem, setProblem] = useState('');
  const [topic, setTopic] = useState('');
  const [concept, setConcept] = useState('');
  const [hints, setHints] = useState(['']);
  const [solution, setSolution] = useState('');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const handleAddHint = () => {
    setHints([...hints, '']);
  };

  const handleHintChange = (index, value) => {
    const updatedHints = [...hints];
    updatedHints[index] = value;
    setHints(updatedHints);
  };

  const handleRemoveHint = (index) => {
    const updatedHints = hints.filter((_, i) => i !== index);
    setHints(updatedHints);
  };

  const handleSubmit = async () => {
    if (!problem.trim() || !topic.trim() || !concept.trim() || !solution.trim()) {
      setNotification('Please fill all required fields.');
      return;
    }

    try {
      const payload = {
        problem,
        topic: topic.trim(),
        concept,
        hints: hints.filter((hint) => hint.trim() !== ''), 
        solution,
      };

      await axios.post(`${serverUrl}/api/teacher/add`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('teacherToken')}`,
        },
      });

      setNotification('Question added successfully!');
      setProblem('');
      setTopic('');
      setConcept('');
      setHints(['']);
      setSolution('');
    } catch (error) {
      setNotification('Failed to add question. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="flex justify-end items-center mb-4">
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          className="p-2 text-lg rounded-full bg-gray-200 dark:bg-gray-800 dark:text-white mr-4"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
        <a
          href="https://katex.org/docs/supported.html"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 dark:text-white text-lg"
        >
          <FaQuestionCircle />
        </a>
      </div>

      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Add a Question</h1>

      <div className="mb-4">
        <label className="block text-gray-800 dark:text-gray-300 mb-2">Topic</label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full p-3 border rounded-md dark:bg-gray-800 dark:text-white"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-800 dark:text-gray-300 mb-2">Problem</label>
        <textarea
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          className="w-full p-3 border rounded-md dark:bg-gray-800 dark:text-white"
          rows="3"
        />
        {problem && (
          <div className="mt-2 p-3 bg-gray-200 dark:bg-gray-800 border rounded-md dark:text-white">
            <BlockMath math={problem} />
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-800 dark:text-gray-300 mb-2">Concept</label>
        <textarea
          value={concept}
          onChange={(e) => setConcept(e.target.value)}
          className="w-full p-3 border rounded-md dark:bg-gray-800 dark:text-white"
          rows="3"
        />
        {concept && (
          <div className="mt-2 p-3 bg-gray-200 dark:bg-gray-800 border rounded-md dark:text-white">
            <BlockMath math={concept} />
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-800 dark:text-gray-300 mb-2">Hints</label>
        {hints.map((hint, index) => (
          <div key={index} className="mb-2">
            <textarea
              value={hint}
              onChange={(e) => handleHintChange(index, e.target.value)}
              className="w-full p-3 border rounded-md dark:bg-gray-800 dark:text-white"
              rows="2"
            />
            <button
              onClick={() => handleRemoveHint(index)}
              className="ml-2 px-3 py-2 bg-red-500 text-white rounded-md"
            >
              Remove
            </button>
            {hint && (
              <div className="mt-2 w-full p-3 bg-gray-200 dark:bg-gray-800 border rounded-md dark:text-white">
                <BlockMath math={hint} />
              </div>
            )}
          </div>
        ))}
        <button
          onClick={handleAddHint}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add Hint
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-gray-800 dark:text-gray-300 mb-2">Solution</label>
        <textarea
          value={solution}
          onChange={(e) => setSolution(e.target.value)}
          className="w-full p-3 border rounded-md dark:bg-gray-800 dark:text-white"
          rows="5"
        />
        {solution && (
          <div className="mt-2 p-3 bg-gray-200 dark:bg-gray-800 border rounded-md">
            <BlockMath math={solution} />
          </div>
        )}
      </div>

      {notification && (
        <div className="mb-4 text-center text-white p-3 bg-blue-500 rounded-md">
          {notification}
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="px-6 py-3 bg-green-500 text-white rounded-md"
      >
        Submit Question
      </button>
    </div>
  );
};

export default AddQuestion;
