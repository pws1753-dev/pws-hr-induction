export const certificatesData = [
  { id: '1', certificateId: 'CERT-PYR-001-2024', employeeName: 'John Doe', employeeId: 'EMP001', department: 'Engineering', moduleTitle: 'Company Overview & Culture', moduleName: 'Company Overview & Culture', moduleId: 1, issueDate: '2025-09-05', validUntil: '2026-09-05', score: 95, status: 'issued', downloadCount: 3, lastDownloaded: '2025-09-03', completionDate: '2025-09-05'},
  { id: '2', certificateId: 'CERT-PYR-002-2024', employeeName: 'Sarah Wilson', employeeId: 'EMP002', department: 'Human Resources', moduleTitle: 'Workplace Safety & Security', moduleName: 'Workplace Safety & Security', moduleId: 2, issueDate: '2025-08-25', validUntil: '2026-08-25', score: 88, status: 'issued', downloadCount: 1, lastDownloaded: '2025-08-25', completionDate: '2025-08-25' },
  { id: '3', certificateId: 'CERT-PYR-003-2024', employeeName: 'David Brown', employeeId: 'EMP005', department: 'Finance', moduleTitle: 'HR Policies & Procedures', moduleName: 'HR Policies & Procedures', moduleId: 3, issueDate: '2025-08-18', validUntil: '2026-08-18', score: 94, status: 'issued', downloadCount: 2, lastDownloaded: '2025-08-20', completionDate: '2025-08-18' },
  { id: '4', certificateId: 'CERT-PYR-FULL-001-2024', employeeName: 'Sarah Wilson', employeeId: 'EMP002', department: 'Human Resources', moduleTitle: 'Complete Induction Program', moduleName: 'Complete Induction Program', moduleId: null, issueDate: '2025-08-28', validUntil: '2026-08-28', score: 90, status: 'issued', downloadCount: 5, lastDownloaded: '2025-08-28', completionDate: '2025-08-28' },
  { id: '5', certificateId: 'CERT-PYR-FULL-002-2024', employeeName: 'David Brown', employeeId: 'EMP005', department: 'Finance', moduleTitle: 'Complete Induction Program', moduleName: 'Complete Induction Program', moduleId: null, issueDate: '2025-08-26', validUntil: '2026-08-26', score: 92, status: 'revoked', downloadCount: 1, lastDownloaded: '2025-08-26', completionDate: '2025-08-26' }
];

export const mockEmployeeCertificatesData = [
  { id: 1, title: 'Company Overview & Culture Completion', moduleId: 1, moduleName: 'Company Overview & Culture', issueDate: '2025-09-05', certificateId: 'CERT-PYR-001-2024', status: 'issued', score: 95, validUntil: '2026-09-05' },
  { id: 2, title: 'Workplace Safety & Security Completion', moduleId: 2, moduleName: 'Workplace Safety & Security', issueDate: '2025-08-25', certificateId: 'CERT-PYR-002-2024', status: 'issued', score: 88, validUntil: '2026-08-25' },
  { id: 3, title: 'Complete Induction Program Certificate', moduleId: null, moduleName: 'Complete Induction Program', issueDate: null, certificateId: null, status: 'pending', score: null, validUntil: null, requirements: ['Complete all 6 training modules', 'Pass all quizzes with 70% or higher'] }
];

export const mockModulesList = [
  { id: 1, title: 'Company Overview & Culture' },
  { id: 2, title: 'Workplace Safety & Security' },
  { id: 3, title: 'HR Policies & Procedures' },
  { id: 4, title: 'IT Systems & Tools' }
];