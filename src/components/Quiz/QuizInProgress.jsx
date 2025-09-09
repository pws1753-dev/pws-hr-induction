import React from 'react';
import QuizHeader from './QuizHeader';
import QuestionCard from './QuestionCard';
import QuizNavigation from './QuizNavigation';

const QuizInProgress = ({
  quiz,
  currentQuestion,
  setCurrentQuestion,
  answers,
  onAnswerSelect,
  timeLeft,
  onSubmit,
}) => {
  const currentQ = quiz.questions[currentQuestion];
  
  return (
    <>
      <QuizHeader 
        quiz={quiz} 
        timeLeft={timeLeft}
        currentQuestionIndex={currentQuestion}
      />
      <QuestionCard 
        question={currentQ}
        questionIndex={currentQuestion}
        answer={answers[currentQ.id]}
        onAnswerSelect={onAnswerSelect}
      />
      <QuizNavigation 
        currentQuestion={currentQuestion}
        totalQuestions={quiz.questions.length}
        setCurrentQuestion={setCurrentQuestion}
        answeredQuestions={Object.keys(answers).length}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default QuizInProgress;