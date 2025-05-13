import React, { useState, useMemo } from 'react';
import HomePage from './HomePage';

const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

const decodeHTML = (html) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

const QuestionForm = ({ question, onSubmit, apiError }) => {
  const [selected, setSelected] = useState('');
  const [error, setError] = useState('');

  const answers = useMemo(() => {
    return shuffle([
      question.correct_answer,
      ...question.incorrect_answers,
    ]);
  }, [question]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selected) {
      setError('Please select an answer.');
      return;
    }
    setError('');
    onSubmit(selected);
  };

  if (apiError) return <p style={{ color: 'red' }}>{apiError}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>{decodeHTML(question.question)}</h2>
      {answers.map((ans, idx) => (
        <div key={idx}>
          <label>
            <input
              type="radio"
              name="answer"
              value={ans}
              checked={selected === ans}
              onChange={(e) => setSelected(e.target.value)}
            />
            {decodeHTML(ans)}
          </label>
        </div>
      ))}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Submit Answer</button>
    </form>
  );
};

export default QuestionForm;