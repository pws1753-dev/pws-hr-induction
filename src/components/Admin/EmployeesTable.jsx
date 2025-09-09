import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Mail, Users } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

const EmployeesTable = ({ employees }) => {
  const getStatusBadge = (status) => {
    const variants = {
      completed: 'default',
      'in-progress': 'secondary',
      'not-started': 'destructive',
    };
    const icons = {
      completed: <CheckCircle className="w-3 h-3 mr-1.5" />,
      'in-progress': <Clock className="w-3 h-3 mr-1.5" />,
      'not-started': <AlertCircle className="w-3 h-3 mr-1.5" />,
    };
    return (
      <Badge variant={variants[status] || 'outline'} className="capitalize flex items-center">
        {icons[status]}
        {status.replace('-', ' ')}
      </Badge>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const handleSendReminder = (employeeId) => {
    toast({
      title: "🚧 Feature Coming Soon!",
      description: `Email reminder functionality for ${employeeId} will be available soon! 🚀`,
    });
  };

  const handleViewDetails = (employeeId) => {
    toast({
      title: "🚧 Feature Coming Soon!",
      description: `Detailed view for ${employeeId} will be available soon! 🚀`,
    });
  };

  if (employees.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium">No employees found</h3>
        <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Employee</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Progress</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Activity</TableHead>
          <TableHead className="text-right">Avg. Score</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {employees.map((employee) => (
          <TableRow key={employee.id}>
            <TableCell>
              <div className="font-medium">{employee.name}</div>
              <div className="text-sm text-muted-foreground">{employee.id}</div>
            </TableCell>
            <TableCell>
              <Badge variant="outline">{employee.department}</Badge>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Progress value={employee.progress} className="w-24" />
                <span className="text-sm font-medium text-muted-foreground">{employee.progress}%</span>
              </div>
            </TableCell>
            <TableCell>{getStatusBadge(employee.status)}</TableCell>
            <TableCell>{formatDate(employee.lastActivity)}</TableCell>
            <TableCell className="text-right font-medium">
              {employee.averageScore ? `${employee.averageScore}%` : 'N/A'}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex space-x-2 justify-end">
                <Button variant="outline" size="sm" onClick={() => handleViewDetails(employee.id)}>View</Button>
                {employee.status !== 'completed' && (
                  <Button variant="secondary" size="sm" onClick={() => handleSendReminder(employee.id)}>
                    <Mail className="w-3 h-3 mr-1" />
                    Remind
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EmployeesTable;