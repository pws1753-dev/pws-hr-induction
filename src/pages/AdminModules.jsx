import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { 
  BookOpen, 
  Plus, 
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { mockModulesData } from '@/data/modules';
import AdminModuleStats from '@/components/Admin/AdminModuleStats';
import ModuleFilters from '@/components/Admin/ModuleFilters';
import ModulesTable from '@/components/Admin/ModulesTable';

const AdminModules = () => {
  const [modules, setModules] = useState([]);
  const [filteredModules, setFilteredModules] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const adminModules = mockModulesData.map(m => ({
      ...m,
      createdDate: '2024-01-10',
      lastUpdated: '2024-01-15',
      assignedEmployees: 150,
      completionRate: m.progress,
      averageScore: m.score || 0,
      contentSize: `${Math.floor(Math.random() * 300) + 50} MB`
    }));
    setModules(adminModules);
  }, []);

  useEffect(() => {
    let filtered = modules.filter(module =>
      (module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (typeFilter === 'all' || module.type === typeFilter) &&
      (statusFilter === 'all' || module.status === statusFilter)
    );
    setFilteredModules(filtered);
  }, [modules, searchTerm, typeFilter, statusFilter]);

  const handleCreateModule = () => {
    toast({
      title: "🚧 Feature Coming Soon!",
      description: "Module creation functionality will be available soon! 🚀",
    });
  };

  return (
    <>
      <Head>
        <title>Module Management - Pyrotech LMS</title>
        <meta name="description" content="Create, manage, and update training modules for the corporate induction program." />
      </Head>
      
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Module Management</h1>
            <p className="text-muted-foreground">Create and manage training modules for the induction program.</p>
          </div>
          <Button onClick={handleCreateModule}>
            <Plus className="w-4 h-4 mr-2" />
            Create Module
          </Button>
        </div>

        <AdminModuleStats modules={modules} />

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Search modules..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
              </div>
              <ModuleFilters 
                typeFilter={typeFilter}
                setTypeFilter={setTypeFilter}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Training Modules</CardTitle>
            <CardDescription>Manage and update training content for the induction program.</CardDescription>
          </CardHeader>
          <CardContent>
            <ModulesTable modules={filteredModules} />
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default AdminModules;