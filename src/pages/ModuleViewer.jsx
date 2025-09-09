import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Send, 
  CheckCircle, 
  Play, 
  FileText,
  Bot,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
// import Navbar from '@/components/Layout/Navbar';
import { toast } from '@/components/ui/use-toast';
import { mockModulesData } from '@/data/modules';

const ModuleViewer = () => {
  const { moduleId } = useParams();
  const router = useRouter();
  const [module, setModule] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const foundModule = mockModulesData.find(m => m.id.toString() === moduleId);
    
    if (foundModule) {
      setModule(foundModule);
      const savedProgress = localStorage.getItem(`module_${moduleId}_progress`) || foundModule.progress || 0;
      setProgress(parseInt(savedProgress));
      setIsCompleted(parseInt(savedProgress) >= 100);
    }

    const savedChat = localStorage.getItem(`module_${moduleId}_chat`);
    if (savedChat) {
      setChatMessages(JSON.parse(savedChat));
    } else {
      setChatMessages([
        {
          id: 1,
          type: 'ai',
          message: `Hi! I'm your AI assistant for the "${foundModule?.title}" module. Feel free to ask me any questions about the content!`,
          timestamp: new Date().toISOString()
        }
      ]);
    }
  }, [moduleId]);

  const handleProgressUpdate = (newProgress) => {
    const updatedProgress = Math.min(newProgress, 100);
    setProgress(updatedProgress);
    localStorage.setItem(`module_${moduleId}_progress`, updatedProgress.toString());
    
    if (updatedProgress >= 100 && !isCompleted) {
      setIsCompleted(true);
      toast({
        title: "Module Completed! 🎉",
        description: "Great job! You can now take the quiz for this module.",
      });
    }
  };

  const handleCompleteModule = () => {
    handleProgressUpdate(100);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: newMessage,
      timestamp: new Date().toISOString()
    };

    const updatedMessages = [...chatMessages, userMessage];
    setChatMessages(updatedMessages);
    setNewMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        message: `I understand you're asking about "${newMessage}". This is a great question related to the ${module?.title} module. Let me help you with that...`,
        timestamp: new Date().toISOString()
      };

      const finalMessages = [...updatedMessages, aiResponse];
      setChatMessages(finalMessages);
      localStorage.setItem(`module_${moduleId}_chat`, JSON.stringify(finalMessages));
      setIsLoading(false);
    }, 1500);
  };

  const handleTakeQuiz = () => {
    router.push(`/quiz/${moduleId}`);
  };

  if (!module) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-white">
        {/* <Navbar /> */}
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-500">Module not found</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{module.title} - Pyrotech Workspace LMS</title>
        <meta name="description" content={module.description} />
        <meta property="og:title" content={`${module.title} - Pyrotech Workspace LMS`} />
        <meta property="og:description" content={module.description} />
      </Head>
      
      <div className="min-h-screen bg-white dark:bg-white">
        {/* <Navbar /> */}
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex items-center space-x-4 mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push('/modules')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Modules
              </Button>
              <Badge variant="outline" className="capitalize">{module.type}</Badge>
              <Badge variant="outline">{module.duration}</Badge>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {module.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {module.description}
            </p>
            
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-gray-500">{progress}%</span>
                </div>
                <Progress value={progress} className="progress-glow" />
              </div>
              {isCompleted && (
                <CheckCircle className="w-6 h-6 text-green-500" />
              )}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="module-card">
                  <CardContent className="p-0">
                    {module.type === 'video' ? (
                      <div className="aspect-video bg-gray-900 rounded-t-lg flex items-center justify-center">
                        <div className="text-center text-white">
                          <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                          <p className="text-lg mb-2">Video Content</p>
                          <p className="text-sm opacity-75">
                            🚧 Video player functionality will be available soon! 🚀
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="p-8">
                        <div className="space-y-6">
                          <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                              Interactive Content
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400">
                              🚧 Interactive module content will be available soon! 🚀
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="p-6 border-t">
                      <div className="flex justify-between items-center">
                        <div className="space-x-2">
                          <Button
                            variant="outline"
                            onClick={() => handleProgressUpdate(progress + 25)}
                          >
                            Mark Progress (+25%)
                          </Button>
                        </div>
                        <div className="space-x-2">
                          {!isCompleted && (
                            <Button onClick={handleCompleteModule}>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Mark Complete
                            </Button>
                          )}
                          {isCompleted && (
                            <Button 
                              className="bg-green-600 hover:bg-green-700"
                              onClick={handleTakeQuiz}
                            >
                              Take Quiz
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="module-card h-[600px] flex flex-col">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center space-x-2">
                      <Bot className="w-5 h-5 text-blue-500" />
                      <span>AI Assistant</span>
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="flex-1 flex flex-col p-0">
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {chatMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`flex items-start space-x-2 max-w-[80%] ${
                            message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                          }`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              message.type === 'user' 
                                ? 'bg-gray-900' 
                                : 'bg-gradient-to-r from-purple-500 to-blue-500'
                            }`}>
                              {message.type === 'user' ? (
                                <User className="w-4 h-4 text-white" />
                              ) : (
                                <Bot className="w-4 h-4 text-white" />
                              )}
                            </div>
                            <div className={`p-3 rounded-lg ${
                              message.type === 'user'
                                ? 'user-chat-bubble'
                                : 'ai-chat-bubble'
                            }`}>
                              <p className="text-sm">{message.message}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {isLoading && (
                        <div className="flex justify-start">
                          <div className="flex items-start space-x-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                              <Bot className="w-4 h-4 text-white" />
                            </div>
                            <div className="ai-chat-bubble">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4 border-t">
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Ask a question..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          disabled={isLoading}
                        />
                        <Button
                          size="icon"
                          onClick={handleSendMessage}
                          disabled={isLoading || !newMessage.trim()}
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModuleViewer;