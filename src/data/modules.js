import { BookOpen, FileText, Monitor, Video } from 'lucide-react';

export const mockModulesData = [
  {
    id: 1,
    title: 'Company Overview & Culture',
    description: 'Learn about Pyrotech Workspace history, mission, vision, values, and organizational culture. Understand our journey, achievements, and what makes us unique.',
    progress: 100,
    status: 'completed',
    duration: '45 min',
    type: 'video',
    difficulty: 'Beginner',
    completedDate: '2024-01-20',
    score: 95
  },
  {
    id: 2,
    title: 'Workplace Safety & Security',
    description: 'Essential safety protocols, emergency procedures, security guidelines, and best practices to ensure a safe working environment for everyone.',
    progress: 75,
    status: 'in-progress',
    duration: '60 min',
    type: 'interactive',
    difficulty: 'Intermediate',
    completedDate: null,
    score: null
  },
  {
    id: 3,
    title: 'HR Policies & Procedures',
    description: 'Comprehensive guide to company policies, employee benefits, leave procedures, performance management, and HR processes.',
    progress: 0,
    status: 'not-started',
    duration: '90 min',
    type: 'document',
    difficulty: 'Intermediate',
    completedDate: null,
    score: null
  },
  {
    id: 4,
    title: 'IT Systems & Tools',
    description: 'Introduction to company software, IT infrastructure, security protocols, and digital tools used in daily operations.',
    progress: 30,
    status: 'in-progress',
    duration: '120 min',
    type: 'interactive',
    difficulty: 'Advanced',
    completedDate: null,
    score: null
  },
  {
    id: 5,
    title: 'Communication & Collaboration',
    description: 'Effective communication strategies, team collaboration tools, meeting etiquette, and professional communication standards.',
    progress: 0,
    status: 'not-started',
    duration: '75 min',
    type: 'video',
    difficulty: 'Beginner',
    completedDate: null,
    score: null
  },
  {
    id: 6,
    title: 'Code of Conduct & Ethics',
    description: 'Understanding professional ethics, code of conduct, compliance requirements, and maintaining integrity in the workplace.',
    progress: 0,
    status: 'not-started',
    duration: '50 min',
    type: 'document',
    difficulty: 'Beginner',
    completedDate: null,
    score: null
  },
  {
    id: 7,
    title: 'Advanced Cybersecurity Training',
    description: 'Deep dive into phishing prevention, data protection, and secure online practices for advanced users.',
    progress: 0,
    status: 'not-started',
    duration: '150 min',
    type: 'interactive',
    difficulty: 'Advanced',
    completedDate: null,
    score: null
  },
  {
    id: 8,
    title: 'Product Lifecycle Management',
    description: 'An overview of how products are developed, managed, and retired at Pyrotech Workspace.',
    progress: 0,
    status: 'not-started',
    duration: '60 min',
    type: 'video',
    difficulty: 'Intermediate',
    completedDate: null,
    score: null
  }
];

export const getTypeIcon = (type) => {
  switch (type) {
    case 'video':
      return Video;
    case 'document':
      return FileText;
    case 'interactive':
      return Monitor;
    default:
      return BookOpen;
  }
};

export const getStatusColor = (status) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
    case 'in-progress':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
    case 'not-started':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  }
};

export const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'Beginner':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
    case 'Intermediate':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
    case 'Advanced':
      return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  }
};