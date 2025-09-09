import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const QuizHeader = ({ quiz, timeLeft, currentQuestionIndex }) => {
  const router = useRouter();
  const progressPercentage = Math.round(((currentQuestionIndex + 1) / quiz.questions.length) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push('/modules')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Modules
        </Button>
        
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{formatTime(timeLeft)}</span>
          </Badge>
          <Badge variant="outline">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </Badge>
        </div>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        {quiz.title}
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {quiz.description}
      </p>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Progress</span>
          <span className="text-sm text-gray-500">{progressPercentage}%</span>
        </div>
        <Progress value={progressPercentage} className="progress-glow" />
      </div>
    </motion.div>
  );
};

export default QuizHeader;