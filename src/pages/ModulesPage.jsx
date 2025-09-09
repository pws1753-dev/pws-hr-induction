import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useRouter } from 'next/navigation';
import { 
  BookOpen, 
  Play, 
  Clock, 
  CheckCircle, 
  Search,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import Navbar from '@/components/Layout/Navbar';
import { toast } from '@/components/ui/use-toast';
import { mockModulesData } from '@/data/modules';

const ModulesPage = () => {
  const [modules, setModules] = useState([]);
  const [filteredModules, setFilteredModules] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const router = useRouter();

  useEffect(() => {
    setModules(mockModulesData);
    setFilteredModules(mockModulesData);
  }, []);

  useEffect(() => {
    let filtered = modules;

    if (searchTerm) {
      filtered = filtered.filter(module =>
        module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        module.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(module => module.status === statusFilter);
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(module => module.type === typeFilter);
    }

    setFilteredModules(filtered);
  }, [modules, searchTerm, statusFilter, typeFilter]);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video': return 'Video';
      case 'document': return 'FileText';
      case 'interactive': return 'Monitor';
      default: return 'BookOpen';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'in-progress': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'not-started': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
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

  const handleNavigateToModule = (moduleId) => {
    router.push(`/modules/${moduleId}`);
  };

  return (
    <>
      <Helmet>
        <title>Training Modules - Pyrotech Workspace LMS</title>
        <meta name="description" content="Access your assigned training modules, track progress, and continue your learning journey" />
        <meta property="og:title" content="Training Modules - Pyrotech Workspace LMS" />
        <meta property="og:description" content="Access your assigned training modules, track progress, and continue your learning journey" />
      </Helmet>
      
      <div className="min-h-screen bg-white dark:bg-white">
        {/* <Navbar /> */}
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Training Modules
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Complete your assigned modules to progress through the induction program
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <Card className="module-card">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search modules..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="not-started">Not Started</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="document">Document</SelectItem>
                        <SelectItem value="interactive">Interactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModules.map((module, index) => {
              const TypeIcon = BookOpen;
              
              return (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  <Card className="module-card h-full flex flex-col">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
                          <TypeIcon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <Badge className={getStatusColor(module.status)}>
                            {module.status === 'completed' ? 'Completed' :
                             module.status === 'in-progress' ? 'In Progress' : 'Not Started'}
                          </Badge>
                          <Badge className={getDifficultyColor(module.difficulty)}>
                            {module.difficulty}
                          </Badge>
                        </div>
                      </div>
                      <CardTitle className="text-lg leading-tight">
                        {module.title}
                      </CardTitle>
                      <CardDescription className="text-sm line-clamp-3">
                        {module.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="flex-1 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{module.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="capitalize">{module.type}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Progress</span>
                            <span className="text-sm text-gray-500">{module.progress}%</span>
                          </div>
                          <Progress value={module.progress} />
                        </div>

                        {module.status === 'completed' && module.score && (
                          <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm font-medium text-green-700 dark:text-green-400">
                                Completed
                              </span>
                            </div>
                            <span className="text-sm font-bold text-green-700 dark:text-green-400">
                              Score: {module.score}%
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-6">
                        <Button 
                          onClick={() => handleNavigateToModule(module.id)}
                          className="w-full"
                          variant={module.status === 'in-progress' ? 'default' : 'outline'}
                        >
                          {module.status === 'completed' ? (
                            <><BookOpen className="w-4 h-4 mr-2" />Review Module</>
                          ) : module.status === 'in-progress' ? (
                            <><Play className="w-4 h-4 mr-2" />Continue Module</>
                          ) : (
                            <><Play className="w-4 h-4 mr-2" />Start Module</>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {filteredModules.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No modules found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try adjusting your search or filter criteria
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default ModulesPage;