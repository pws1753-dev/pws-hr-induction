import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { 
  Users, 
  BookOpen, 
  Award, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  Activity,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';
import Link from 'next/link';

const AdminDashboard = () => {
  const [stats] = useState({ totalEmployees: 150, completedEmployees: 45, inProgressEmployees: 78, averageScore: 87, completionRate: 68 });
  const [recentActivity] = useState([
    { id: 1, employee: 'John Doe', action: 'Completed', module: 'Company Overview & Culture', timestamp: '2h ago', score: 95 },
    { id: 2, employee: 'Sarah Wilson', action: 'Started', module: 'Workplace Safety & Security', timestamp: '4h ago', score: null },
    { id: 3, employee: 'Mike Johnson', action: 'Completed', module: 'HR Policies & Procedures', timestamp: '6h ago', score: 88 },
    { id: 4, employee: 'Emily Davis', action: 'Failed Quiz', module: 'IT Systems & Tools', timestamp: '8h ago', score: 65 },
    { id: 5, employee: 'David Brown', action: 'Certificate Issued', module: 'Complete Induction Program', timestamp: '1d ago', score: 94 }
  ]);
  const [departmentStats] = useState([
    { name: 'Engineering', value: 71 },
    { name: 'HR', value: 83 },
    { name: 'Marketing', value: 54 },
    { name: 'Sales', value: 57 },
    { name: 'Finance', value: 78 },
    { name: 'Operations', value: 67 }
  ]);

  const statCards = [
    { title: 'Total Employees', value: stats.totalEmployees, icon: Users, color: 'text-blue-500', link: '/admin/employees' },
    { title: 'Completed', value: stats.completedEmployees, icon: CheckCircle, color: 'text-green-500', link: '/admin/employees' },
    { title: 'In Progress', value: stats.inProgressEmployees, icon: Clock, color: 'text-orange-500', link: '/admin/employees' },
    { title: 'Average Score', value: `${stats.averageScore}%`, icon: TrendingUp, color: 'text-purple-500', link: '/admin/modules' },
  ];

  const getActionBadge = (action) => {
    switch (action) {
      case 'Completed': return 'default';
      case 'Started': return 'secondary';
      case 'Failed Quiz': return 'destructive';
      case 'Certificate Issued': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Pyrotech LMS</title>
        <meta name="description" content="Monitor learning progress and manage the induction program." />
      </Helmet>
      
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here&apos;s a summary of your organization&apos;s learning progress.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, i) => (
            <motion.div key={stat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="hover:border-primary transition-colors group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className={`h-5 w-5 text-muted-foreground ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <Link href={stat.link} className="text-xs text-muted-foreground flex items-center group-hover:text-primary transition-colors">
                    View Details <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <motion.div className="lg:col-span-3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Department Completion Rate</CardTitle>
                <CardDescription>Average induction completion rate by department.</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={departmentStats} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                    <Tooltip
                      cursor={{ fill: 'hsl(var(--accent))' }}
                      contentStyle={{
                        background: "hsl(var(--background))",
                        border: "1px solid #eeeeee",
                        borderRadius: "var(--radius)",
                      }}
                    />
                    <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div className="lg:col-span-2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Overall Progress</CardTitle>
                <CardDescription>Organization-wide induction status.</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie data={[{ name: 'Completed', value: stats.completionRate }, { name: 'Pending', value: 100 - stats.completionRate }]} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} innerRadius={70} labelLine={false} stroke="hsl(var(--background))" strokeWidth={4}>
                      <Cell key="completed" fill="hsl(var(--primary))" />
                      <Cell key="pending" fill="hsl(var(--muted))" />
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--background))",
                        border: "1px solid #eeeeee",
                        borderRadius: "var(--radius)",
                      }}
                    />
                    <text x="50%" y="48%" textAnchor="middle" dominantBaseline="middle" className="text-4xl font-bold fill-foreground">
                      {stats.completionRate}%
                    </text>
                     <text x="50%" y="60%" textAnchor="middle" dominantBaseline="middle" className="text-sm fill-muted-foreground">
                      Completed
                    </text>
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest employee learning activities across the platform.</CardDescription>
              </div>
              <Button variant="outline" asChild>
                <Link href="/admin/employees">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Module</TableHead>
                    <TableHead className="text-right">Score</TableHead>
                    <TableHead className="text-right">Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentActivity.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell className="font-medium">{activity.employee}</TableCell>
                      <TableCell>
                        <Badge variant={getActionBadge(activity.action)}>
                          {activity.action}
                        </Badge>
                      </TableCell>
                      <TableCell>{activity.module}</TableCell>
                      <TableCell className="text-right">{activity.score ? `${activity.score}%` : '-'}</TableCell>
                      <TableCell className="text-right text-muted-foreground">{activity.timestamp}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </>
  );
};

export default AdminDashboard;