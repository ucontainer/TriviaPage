import React, { useState } from 'react';
import HomePage from './components/HomePage';
import QuestionForm from './components/QuestionForm';
import Results from './components/Results';

const App = () => {
  const [userInfo, setUserInfo] = useState(null); // { name, category, difficulty }
  const [questionData, setQuestionData] = useState(null);
  const [apiError, setApiError] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);

  const fetchQuestion = async (info) => {
    setUserInfo(info);
    setApiError('');
    try {
      const url = `https://opentdb.com/api.php?amount=1&category=${info.category}&difficulty=${info.difficulty}&type=multiple`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.results.length === 0) {
        throw new Error('No questions returned.');
      }
      setQuestionData(data.results[0]);
    } catch (err) {
      setApiError('Failed to load question. Please try again.',err);
    }
  };

  const handleSubmitAnswer = (answer) => {
    setSelectedAnswer(answer);
    const isAnswerCorrect = answer === questionData.correct_answer;
    setIsCorrect(isAnswerCorrect);
  };

  const handleRestart = () => {
    setUserInfo(null);
    setQuestionData(null);
    setSelectedAnswer('');
    setIsCorrect(null);
    setApiError('');
  };

  return (
    <div className="App">
      {!userInfo ? (
        <HomePage onSubmit={fetchQuestion} />
      ) : !selectedAnswer ? (
        <QuestionForm
          question={questionData}
          onSubmit={handleSubmitAnswer}
          apiError={apiError}
        />
      ) : (
        <Results
          name={userInfo.name}
          isCorrect={isCorrect}
          correctAnswer={questionData.correct_answer}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default App;