import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

const ResumeModuleCard = ({ module }) => {
  const router = useRouter();
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.2 } },
  };

  if (!module) {
    return null;
  }

  const handleResumeModule = () => {
    router.push(`/modules/${module.id}`);
  };

  return (
    <motion.div variants={cardVariants} initial="hidden" animate="visible">
      <Card className="bg-primary/5">
        <CardContent className="p-6">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-primary">Continue Learning</p>
            <h4 className="font-bold text-lg">{module.title}</h4>
            <div className="flex items-center gap-4">
              <Progress value={module.progress} className="flex-1" />
              <span className="text-sm font-medium text-muted-foreground">{module.progress}%</span>
            </div>
            <Button 
              className="w-full"
              onClick={handleResumeModule}
            >
              <Play className="w-4 h-4 mr-2" />
              Resume Module
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ResumeModuleCard;