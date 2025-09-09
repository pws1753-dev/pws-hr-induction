import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const QuestionContent = ({ question, answer, onAnswerSelect }) => {
  if (question.type === 'multiple-choice') {
    return (
      <>
        {question.options.map((option, index) => (
          <label
            key={index}
            className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
              answer === index
                ? 'border-gray-900 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            <input
              type="radio"
              name={`question-${question.id}`}
              value={index}
              checked={answer === index}
              onChange={() => onAnswerSelect(question.id, index)}
              className="sr-only"
            />
            <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
              answer === index ? 'border-gray-900 bg-gray-900' : 'border-gray-300'
            }`}>
              {answer === index && <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>}
            </div>
            <span className="text-gray-900 dark:text-white">{option}</span>
          </label>
        ))}
      </>
    );
  }

  if (question.type === 'true-false') {
    return (
      <>
        <label
          className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
            answer === true ? 'border-gray-900 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
          }`}
        >
          <input
            type="radio"
            name={`question-${question.id}`}
            value="true"
            checked={answer === true}
            onChange={() => onAnswerSelect(question.id, true)}
            className="sr-only"
          />
          <div className={`w-4 h-4 rounded-full border-2 mr-3 ${answer === true ? 'border-gray-900 bg-gray-900' : 'border-gray-300'}`}>
            {answer === true && <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>}
          </div>
          <span className="text-gray-900 dark:text-white">True</span>
        </label>
        
        <label
          className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
            answer === false ? 'border-gray-900 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
          }`}
        >
          <input
            type="radio"
            name={`question-${question.id}`}
            value="false"
            checked={answer === false}
            onChange={() => onAnswerSelect(question.id, false)}
            className="sr-only"
          />
          <div className={`w-4 h-4 rounded-full border-2 mr-3 ${answer === false ? 'border-gray-900 bg-gray-900' : 'border-gray-300'}`}>
            {answer === false && <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>}
          </div>
          <span className="text-gray-900 dark:text-white">False</span>
        </label>
      </>
    );
  }

  return null;
};

const QuestionCard = ({ question, questionIndex, answer, onAnswerSelect }) => {
  return (
    <motion.div
      key={questionIndex}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="module-card mb-6">
        <CardHeader>
          <CardTitle className="text-xl">
            Question {questionIndex + 1}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg text-gray-900 dark:text-white">
            {question.question}
          </p>
          <div className="space-y-3">
            <QuestionContent
              question={question}
              answer={answer}
              onAnswerSelect={onAnswerSelect}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QuestionCard;