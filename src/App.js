import React, { useState } from 'react';
import Quiz from './components/Quiz';

function App() {
  const [quizStarted, setQuizStarted] = useState(false); 

  const handleStartQuiz = () => {
    setQuizStarted(true); 
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleStartQuiz();
    }
  };

  return (
    <div className='bg-container'>
      {quizStarted ? (
        <Quiz />
      ) : (
        <button 
          className='start-button'
          onClick={handleStartQuiz}
          onKeyDown={handleKeyDown}
        >
          <h1>QUIZ</h1>
          <p>Press to start</p>
        </button>
      )}
    </div>
  );
}
export default App;
