import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, XCircle, CheckCircle, RotateCcw, ArrowLeft } from 'lucide-react';

const ResultIcon = ({ passed }) => (
  <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
    passed 
      ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400' 
      : 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
  }`}>
    {passed ? <Award className="w-12 h-12" /> : <XCircle className="w-12 h-12" />}
  </div>
);

const ResultDetails = ({ question, result, index }) => {
  const isCorrect = result.isCorrect;
  return (
    <div className={`p-4 rounded-lg border ${
      isCorrect ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20' : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
    }`}>
      <div className="flex items-start space-x-3">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
          {isCorrect ? <CheckCircle className="w-4 h-4 text-white" /> : <XCircle className="w-4 h-4 text-white" />}
        </div>
        <div className="flex-1">
          <p className="font-medium mb-2">Question {index + 1}: {question.question}</p>
          {question.type === 'multiple-choice' ? (
            <div className="space-y-1">
              <p className="text-sm"><span className="font-medium">Your answer:</span> <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>{question.options[result.userAnswer] || 'Not answered'}</span></p>
              {!isCorrect && <p className="text-sm"><span className="font-medium">Correct answer:</span> <span className="text-green-600">{question.options[result.correctAnswer]}</span></p>}
            </div>
          ) : (
            <div className="space-y-1">
              <p className="text-sm"><span className="font-medium">Your answer:</span> <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>{result.userAnswer !== undefined ? (result.userAnswer ? 'True' : 'False') : 'Not answered'}</span></p>
              {!isCorrect && <p className="text-sm"><span className="font-medium">Correct answer:</span> <span className="text-green-600">{result.correctAnswer ? 'True' : 'False'}</span></p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const QuizResults = ({ quiz, results, onRetake }) => {
  const router = useRouter();

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="text-center mb-8">
        <ResultIcon passed={results.passed} />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Quiz {results.passed ? 'Completed!' : 'Not Passed'}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
          Your Score: <span className={`font-bold ${results.passed ? 'text-green-600' : 'text-red-600'}`}>{results.score}%</span>
        </p>
        <p className="text-gray-500 dark:text-gray-400">
          {results.correctAnswers} out of {results.totalQuestions} questions correct
        </p>
      </div>

      <Card className="module-card mb-6">
        <CardHeader><CardTitle>Quiz Summary</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{results.score}%</div>
              <p className="text-sm text-gray-500">Final Score</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">{results.correctAnswers}</div>
              <p className="text-sm text-gray-500">Correct Answers</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600 mb-1">{quiz.passingScore}%</div>
              <p className="text-sm text-gray-500">Passing Score</p>
            </div>
          </div>
          <div className="space-y-4">
            {quiz.questions.map((q, i) => <ResultDetails key={q.id} question={q} result={results.questionResults[q.id]} index={i} />)}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center space-x-4">
        <Button variant="outline" onClick={() => router.push('/modules')}><ArrowLeft className="w-4 h-4 mr-2" />Back to Modules</Button>
        {!results.passed && <Button onClick={onRetake}><RotateCcw className="w-4 h-4 mr-2" />Retake Quiz</Button>}
        {results.passed && <Button className="bg-green-600 hover:bg-green-700" onClick={() => router.push('/certificates')}><Award className="w-4 h-4 mr-2" />View Certificate</Button>}
      </div>
    </motion.div>
  );
};

export default QuizResults;