
import React, { useState } from 'react';
import QuestionForm from './QuestionForm';

const HomePage = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    difficulty: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, category, difficulty } = formData;
    if (!name || !category || !difficulty) {
      setError('All fields are required.');
      return;
    }
    setError('');
    onSubmit(formData);
  };

  return (
    <div>
      <h1>🎉 Welcome to the Mini Quiz App</h1>
      <p>Please enter your name and choose a category and difficulty to begin!</p>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input name="name" value={formData.name} onChange={handleChange} />
        </label>
        <br />

        <label>
          Category:
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="">-- Select --</option>
            <option value="9">General Knowledge</option>
            <option value="11">Entertainment: Film</option>
            <option value="18">Science: Computers</option>
            <option value="23">History</option>
          </select>
        </label>
        <br />

        <label>
          Difficulty:
          <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
            <option value="">-- Select --</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
        <br />

        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Start Quiz</button>
      </form>
    </div>
  );
};

export default HomePage;