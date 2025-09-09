import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

const AdminModuleStats = ({ modules }) => {
  const totalModules = modules.length;
  const publishedModules = modules.filter(m => m.status === 'published').length;
  const draftModules = modules.filter(m => m.status === 'draft').length;
  const avgCompletion = totalModules > 0 
    ? Math.round(modules.reduce((sum, m) => sum + m.completionRate, 0) / totalModules)
    : 0;

  const stats = [
    { label: 'Total Modules', value: totalModules, color: 'blue', icon: BookOpen },
    { label: 'Published', value: publishedModules, color: 'green' },
    { label: 'Drafts', value: draftModules, color: 'orange' },
    { label: 'Avg. Completion', value: `${avgCompletion}%`, color: 'purple' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * (index + 1) }}
        >
          <Card className="module-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium text-gray-600 dark:text-gray-400`}>
                    {stat.label}
                  </p>
                  <p className={`text-3xl font-bold text-${stat.color}-600`}>
                    {stat.value}
                  </p>
                </div>
                {stat.icon ? (
                  <stat.icon className={`w-8 h-8 text-${stat.color}-500`} />
                ) : (
                  <div className={`w-8 h-8 bg-${stat.color}-100 dark:bg-${stat.color}-900/20 rounded-lg flex items-center justify-center`}>
                    <div className={`w-4 h-4 bg-${stat.color}-500 rounded-full`}></div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default AdminModuleStats;