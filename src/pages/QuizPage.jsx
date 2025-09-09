import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Helmet } from 'react-helmet';
// import Navbar from '@/components/Layout/Navbar';
import { toast } from '@/components/ui/use-toast';
import { mockQuizzesData } from '@/data/quizzes';
import QuizInProgress from '@/components/Quiz/QuizInProgress';
import QuizResults from '@/components/Quiz/QuizResults';

const QuizPage = () => {
  const { moduleId } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    const foundQuiz = mockQuizzesData[moduleId];
    if (foundQuiz) {
      setQuiz(foundQuiz);
      
      const savedResults = localStorage.getItem(`quiz_${moduleId}_results`);
      if(savedResults) {
        setResults(JSON.parse(savedResults));
        setIsSubmitted(true);
        return;
      }

      setTimeLeft(foundQuiz.timeLimit);
      const savedAnswers = localStorage.getItem(`quiz_${moduleId}_answers`);
      const savedTime = localStorage.getItem(`quiz_${moduleId}_time`);
      
      if (savedAnswers) {
        setAnswers(JSON.parse(savedAnswers));
      }
      if (savedTime) {
        setTimeLeft(parseInt(savedTime));
      }
    }
  }, [moduleId]);

  const handleSubmitQuiz = useCallback(() => {
    if (!quiz || isSubmitted) return;

    let correctAnswers = 0;
    const questionResults = {};

    quiz.questions.forEach(question => {
      const userAnswer = answers[question.id];
      const isCorrect = userAnswer === question.correctAnswer;
      
      questionResults[question.id] = {
        userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect
      };

      if (isCorrect) {
        correctAnswers++;
      }
    });

    const score = Math.round((correctAnswers / quiz.questions.length) * 100);
    const passed = score >= quiz.passingScore;

    const quizResults = {
      score,
      passed,
      correctAnswers,
      totalQuestions: quiz.questions.length,
      questionResults,
      completedAt: new Date().toISOString()
    };

    setResults(quizResults);
    setIsSubmitted(true);

    localStorage.setItem(`quiz_${moduleId}_results`, JSON.stringify(quizResults));
    localStorage.removeItem(`quiz_${moduleId}_answers`);
    localStorage.removeItem(`quiz_${moduleId}_time`);

    toast({
      title: passed ? "Quiz Passed! 🎉" : "Quiz Not Passed",
      description: passed
        ? `Congratulations! You scored ${score}% and passed the quiz.`
        : `You scored ${score}%. You need ${quiz.passingScore}% to pass. You can retake the quiz.`,
      variant: passed ? "default" : "destructive",
    });
  }, [quiz, answers, isSubmitted, moduleId]);

  useEffect(() => {
    if (!quiz || isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quiz, isSubmitted, handleSubmitQuiz]);

  useEffect(() => {
    if (!isSubmitted) {
        const autoSave = setInterval(() => {
          localStorage.setItem(`quiz_${moduleId}_answers`, JSON.stringify(answers));
          localStorage.setItem(`quiz_${moduleId}_time`, timeLeft.toString());
        }, 30000);
        return () => clearInterval(autoSave);
    }
  }, [answers, timeLeft, moduleId, isSubmitted]);

  const handleAnswerSelect = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleRetakeQuiz = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setIsSubmitted(false);
    setResults(null);
    setTimeLeft(quiz.timeLimit);
    localStorage.removeItem(`quiz_${moduleId}_results`);
  };

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-white">
        {/* <Navbar /> */}
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-500">Quiz not found or loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{isSubmitted ? `Results - ${quiz.title}` : quiz.title} - Pyrotech LMS</title>
        <meta name="description" content={quiz.description} />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 dark:bg-white">
        {/* <Navbar /> */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {isSubmitted && results ? (
            <QuizResults 
              quiz={quiz} 
              results={results} 
              onRetake={handleRetakeQuiz} 
              onBack={() => router.push('/modules')} 
            />
          ) : (
            <QuizInProgress 
              quiz={quiz}
              currentQuestion={currentQuestion}
              setCurrentQuestion={setCurrentQuestion}
              answers={answers}
              onAnswerSelect={handleAnswerSelect}
              timeLeft={timeLeft}
              onSubmit={handleSubmitQuiz}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default QuizPage;