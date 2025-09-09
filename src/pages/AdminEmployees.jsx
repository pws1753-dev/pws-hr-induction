import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { 
  Users, 
  Search, 
  Download, 
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import EmployeeFilters from '@/components/Admin/EmployeeFilters';
import EmployeesTable from '@/components/Admin/EmployeesTable';

const AdminEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const mockEmployees = [
      { id: 'EMP001', name: 'John Doe', email: 'john.doe@pyrotech.com', contact: '+91 9876543210', department: 'Engineering', designation: 'Software Developer', manager: 'Jane Smith', joiningDate: '2024-01-15', progress: 75, completedModules: 3, totalModules: 4, status: 'in-progress', lastActivity: '2024-01-25', averageScore: 88 },
      { id: 'EMP002', name: 'Sarah Wilson', email: 'sarah.wilson@pyrotech.com', contact: '+91 9876543211', department: 'Human Resources', designation: 'HR Manager', manager: 'Mike Johnson', joiningDate: '2023-06-10', progress: 100, completedModules: 4, totalModules: 4, status: 'completed', lastActivity: '2024-01-20', averageScore: 92 },
      { id: 'EMP003', name: 'Mike Johnson', email: 'mike.johnson@pyrotech.com', contact: '+91 9876543212', department: 'Marketing', designation: 'Marketing Manager', manager: 'Lisa Brown', joiningDate: '2024-02-01', progress: 25, completedModules: 1, totalModules: 4, status: 'in-progress', lastActivity: '2024-01-28', averageScore: 85 },
      { id: 'EMP004', name: 'Emily Davis', email: 'emily.davis@pyrotech.com', contact: '+91 9876543213', department: 'Sales', designation: 'Sales Executive', manager: 'Robert Taylor', joiningDate: '2024-01-20', progress: 0, completedModules: 0, totalModules: 4, status: 'not-started', lastActivity: null, averageScore: null },
      { id: 'EMP005', name: 'David Brown', email: 'david.brown@pyrotech.com', contact: '+91 9876543214', department: 'Finance', designation: 'Financial Analyst', manager: 'Susan White', joiningDate: '2023-12-15', progress: 100, completedModules: 4, totalModules: 4, status: 'completed', lastActivity: '2024-01-18', averageScore: 94 }
    ];
    setEmployees(mockEmployees);
  }, []);

  useEffect(() => {
    let filtered = employees.filter(emp =>
      (emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (departmentFilter === 'all' || emp.department === departmentFilter) &&
      (statusFilter === 'all' || emp.status === statusFilter)
    );
    setFilteredEmployees(filtered);
  }, [employees, searchTerm, departmentFilter, statusFilter]);

  const handleExportData = () => {
    toast({
      title: "🚧 Feature Coming Soon!",
      description: "Employee data export functionality will be available soon! 🚀",
    });
  };

  const departments = [...new Set(employees.map(emp => emp.department))];

  const statCards = [
    { title: 'Total Employees', value: employees.length, icon: Users, color: 'text-blue-500' },
    { title: 'Completed', value: employees.filter(e => e.status === 'completed').length, icon: CheckCircle, color: 'text-green-500' },
    { title: 'In Progress', value: employees.filter(e => e.status === 'in-progress').length, icon: Clock, color: 'text-orange-500' },
    { title: 'Not Started', value: employees.filter(e => e.status === 'not-started').length, icon: AlertCircle, color: 'text-red-500' },
  ];

  return (
    <>
      <Head>
        <title>Employee Management - Pyrotech LMS</title>
        <meta name="description" content="Manage employees and track learning progress across the organization." />
      </Head>
      
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Employee Management</h1>
            <p className="text-muted-foreground">Track employee progress and manage training assignments.</p>
          </div>
          <Button onClick={handleExportData}>
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, i) => (
            <motion.div key={stat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className={`h-4 w-4 text-muted-foreground ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Search by name, email, or ID..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
              </div>
              <EmployeeFilters 
                departments={departments}
                departmentFilter={departmentFilter}
                setDepartmentFilter={setDepartmentFilter}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Employee Progress</CardTitle>
            <CardDescription>A list of all employees and their induction progress.</CardDescription>
          </CardHeader>
          <CardContent>
            <EmployeesTable employees={filteredEmployees} />
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default AdminEmployees;