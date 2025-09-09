import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Edit, Upload, Trash2, Video, FileText, Monitor } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const getTypeIcon = (type) => {
  switch (type) {
    case 'video': return Video;
    case 'document': return FileText;
    case 'interactive': return Monitor;
    default: return BookOpen;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'published': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
    case 'draft': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
    case 'archived': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  }
};

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'Beginner': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
    case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
    case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  }
};

const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

const handleActionClick = (message) => {
  toast({
    title: "🚧 Feature Coming Soon!",
    description: `${message} functionality will be available soon! 🚀`,
  });
};

const ModulesTable = ({ modules }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="module-card">
        <CardHeader>
          <CardTitle>Training Modules</CardTitle>
          <CardDescription>Manage and update training content for the induction program</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Module</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Completion Rate</TableHead>
                <TableHead>Avg. Score</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {modules.map((module) => {
                const TypeIcon = getTypeIcon(module.type);
                return (
                  <TableRow key={module.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <TypeIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">{module.title}</p>
                          <p className="text-sm text-gray-500 max-w-xs truncate">{module.description}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={getDifficultyColor(module.difficulty)}>{module.difficulty}</Badge>
                            <span className="text-xs text-gray-500">{module.duration}</span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell><Badge variant="outline" className="capitalize">{module.type}</Badge></TableCell>
                    <TableCell><Badge className={getStatusColor(module.status)}>{module.status}</Badge></TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <span className="text-sm font-medium">{module.completionRate}%</span>
                        <div className="text-xs text-gray-500">{module.assignedEmployees} employees</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {module.averageScore > 0 ? (
                        <span className={`font-medium ${module.averageScore >= 90 ? 'text-green-600' : module.averageScore >= 70 ? 'text-orange-600' : 'text-red-600'}`}>
                          {module.averageScore}%
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell><span className="text-sm text-gray-500">{formatDate(module.lastUpdated)}</span></TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleActionClick('Module editing')}><Edit className="w-3 h-3 mr-1" />Edit</Button>
                        <Button variant="outline" size="sm" onClick={() => handleActionClick('Content upload')}><Upload className="w-3 h-3 mr-1" />Content</Button>
                        {module.status === 'draft' && <Button size="sm" onClick={() => handleActionClick('Module publishing')}>Publish</Button>}
                        <Button variant="outline" size="sm" onClick={() => handleActionClick('Module deletion')} className="text-red-600 hover:text-red-700"><Trash2 className="w-3 h-3" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {modules.length === 0 && (
            <div className="text-center py-8">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No modules found</h3>
              <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ModulesTable;