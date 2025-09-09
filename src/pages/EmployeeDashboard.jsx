
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext';
import { mockModulesData } from '@/data/modules';
import EmployeeProfileCard from '@/components/Dashboard/EmployeeProfileCard';
import LearningProgressStats from '@/components/Dashboard/LearningProgressStats';
import ResumeModuleCard from '@/components/Dashboard/ResumeModuleCard';
import AssignedModulesList from '@/components/Dashboard/AssignedModulesList';
import CertificatesPreview from '@/components/Dashboard/CertificatesPreview';
import { mockEmployeeCertificatesData } from '@/data/certificates';

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const [modules, setModules] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [stats, setStats] = useState({
    totalModules: 0,
    completedModules: 0,
    inProgressModules: 0,
    overallProgress: 0
  });

  useEffect(() => {
    setModules(mockModulesData);
    setCertificates(mockEmployeeCertificatesData);

    const completed = mockModulesData.filter(m => m.status === 'completed').length;
    const inProgress = mockModulesData.filter(m => m.status === 'in-progress').length;
    const totalProgress = mockModulesData.reduce((sum, m) => sum + m.progress, 0) / mockModulesData.length;

    setStats({
      totalModules: mockModulesData.length,
      completedModules: completed,
      inProgressModules: inProgress,
      overallProgress: Math.round(totalProgress)
    });
  }, []);

  const getLastModule = () => {
    return modules.find(m => m.status === 'in-progress') || modules.find(m => m.status === 'not-started');
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - PWS Group</title>
      </Helmet>
      
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
          <p className="text-muted-foreground">Continue your learning journey and track your progress.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            <EmployeeProfileCard />
            <LearningProgressStats stats={stats} />
            <ResumeModuleCard module={getLastModule()} />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <AssignedModulesList modules={modules} />
            <CertificatesPreview certificates={certificates} />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default EmployeeDashboard;
