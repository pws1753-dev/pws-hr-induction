export const mockQuizzesData = {
  1: {
    id: 1,
    moduleTitle: 'Company Overview & Culture',
    title: 'Company Overview Quiz',
    description: 'Test your knowledge about Pyrotech Workspace culture and values',
    timeLimit: 1800, // 30 minutes
    passingScore: 70,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'What year was Pyrotech Workspace founded?',
        options: ['2015', '2018', '2020', '2022'],
        correctAnswer: 1
      },
      {
        id: 2,
        type: 'true-false',
        question: 'Pyrotech Workspace values innovation and collaboration above all else.',
        correctAnswer: true
      },
      {
        id: 3,
        type: 'multiple-choice',
        question: 'Which of the following is NOT one of our core values?',
        options: ['Innovation', 'Integrity', 'Competition', 'Collaboration'],
        correctAnswer: 2
      },
      {
        id: 4,
        type: 'multiple-choice',
        question: 'What is our company mission?',
        options: [
          'To be the biggest tech company',
          'To create innovative solutions that transform businesses',
          'To maximize profits',
          'To compete with other companies'
        ],
        correctAnswer: 1
      },
      {
        id: 5,
        type: 'true-false',
        question: 'Remote work is supported at Pyrotech Workspace.',
        correctAnswer: true
      }
    ]
  },
  2: {
    id: 2,
    moduleTitle: 'Workplace Safety & Security',
    title: 'Safety & Security Quiz',
    description: 'Assess your understanding of workplace safety protocols',
    timeLimit: 1200, // 20 minutes
    passingScore: 80,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'In case of fire emergency, what should you do first?',
        options: ['Call 911', 'Use fire extinguisher', 'Alert others and evacuate', 'Save important documents'],
        correctAnswer: 2
      },
      {
        id: 2,
        type: 'true-false',
        question: 'You should hold doors open for others during an emergency evacuation.',
        correctAnswer: false
      },
      {
        id: 3,
        type: 'multiple-choice',
        question: 'How often should you change your computer password?',
        options: ['Never', 'Every month', 'Every 3 months', 'Every year'],
        correctAnswer: 2
      }
    ]
  },
  3: {
    id: 3,
    moduleTitle: 'HR Policies & Procedures',
    title: 'HR Policies Quiz',
    description: 'Check your understanding of the company HR policies',
    timeLimit: 1500,
    passingScore: 75,
    questions: [
      { id: 1, type: 'true-false', question: 'Annual leave must be approved at least 2 weeks in advance.', correctAnswer: true },
      { id: 2, type: 'multiple-choice', question: 'What is the probation period for new employees?', options: ['1 month', '3 months', '6 months', '1 year'], correctAnswer: 2 }
    ]
  },
  4: {
    id: 4,
    moduleTitle: 'IT Systems & Tools',
    title: 'IT Systems Quiz',
    description: 'Test your knowledge on company IT systems and security.',
    timeLimit: 900,
    passingScore: 80,
    questions: [
        { id: 1, type: 'true-false', question: 'It is okay to share your password with your manager.', correctAnswer: false },
        { id: 2, type: 'multiple-choice', question: 'Which tool is used for project management?', options: ['Slack', 'Microsoft Teams', 'Jira', 'Asana'], correctAnswer: 2 }
    ]
  },
  5: {
    id: 5,
    moduleTitle: 'Communication & Collaboration',
    title: 'Communication Quiz',
    description: 'Check your knowledge on communication best practices.',
    timeLimit: 600,
    passingScore: 80,
    questions: [
        { id: 1, type: 'true-false', question: 'Emails should always have a clear and concise subject line.', correctAnswer: true }
    ]
  },
  6: {
    id: 6,
    moduleTitle: 'Code of Conduct & Ethics',
    title: 'Ethics Quiz',
    description: 'Test your understanding of the Code of Conduct.',
    timeLimit: 900,
    passingScore: 85,
    questions: [
        { id: 1, type: 'true-false', question: 'Accepting gifts from clients is always permissible.', correctAnswer: false }
    ]
  },
  7: {
    id: 7,
    moduleTitle: 'Advanced Cybersecurity Training',
    title: 'Cybersecurity Quiz',
    description: 'Test your advanced cybersecurity knowledge.',
    timeLimit: 1200,
    passingScore: 80,
    questions: [
        { id: 1, type: 'multiple-choice', question: 'What is "phishing"?', options: ['A type of fishing', 'A fraudulent attempt to obtain sensitive information', 'A server maintenance technique', 'A software bug'], correctAnswer: 1 }
    ]
  },
  8: {
    id: 8,
    moduleTitle: 'Product Knowledge: Project Phoenix',
    title: 'Project Phoenix Quiz',
    description: 'Test your knowledge of our flagship product.',
    timeLimit: 1800,
    passingScore: 75,
    questions: [
        { id: 1, type: 'true-false', question: 'Project Phoenix offers a mobile app version.', correctAnswer: true }
    ]
  }
};