import React from 'react';

const decodeHTML = (html) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

const Results = ({ name, isCorrect, correctAnswer, onRestart }) => {
  return (
    <div>
      <h2>
        {isCorrect
          ? `🎉 Great job, ${name}! You got it right!`
          : `😕 Sorry, ${name}. That's not correct.`}
      </h2>
      {!isCorrect && (
        <p>The correct answer was: <strong>{decodeHTML(correctAnswer)}</strong></p>
      )}
      <button onClick={onRestart}>Try Another Question</button>
    </div>
  );
};

export default Results;