import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const QuizNavigation = ({
  currentQuestion,
  totalQuestions,
  setCurrentQuestion,
  answeredQuestions,
  onSubmit
}) => {
  const isLastQuestion = currentQuestion === totalQuestions - 1;

  return (
    <div className="flex justify-between items-center">
      <Button
        variant="outline"
        onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
        disabled={currentQuestion === 0}
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Previous
      </Button>
      
      <div className="text-sm text-gray-500">
        {answeredQuestions} of {totalQuestions} answered
      </div>
      
      {isLastQuestion ? (
        <Button
          onClick={onSubmit}
          className="bg-green-600 hover:bg-green-700"
          disabled={answeredQuestions === 0}
        >
          Submit Quiz
        </Button>
      ) : (
        <Button onClick={() => setCurrentQuestion(Math.min(totalQuestions - 1, currentQuestion + 1))}>
          Next
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      )}
    </div>
  );
};

export default QuizNavigation;