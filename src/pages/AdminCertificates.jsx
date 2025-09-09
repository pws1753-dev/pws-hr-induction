import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useRouter } from 'next/navigation';
import { 
  Award, 
  Download, 
  Search, 
  Eye, 
  CheckCircle,
  MoreHorizontal,
  Trash2,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { certificatesData, mockModulesList } from '@/data/certificates';

const AdminCertificates = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [certificates, setCertificates] = useState([]);
  const [filteredCertificates, setFilteredCertificates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [moduleFilter, setModuleFilter] = useState('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [actionType, setActionType] = useState('');

  useEffect(() => {
    setCertificates(certificatesData);
  }, []);

  useEffect(() => {
    let filtered = certificates.filter(cert =>
      (cert.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.certificateId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.moduleTitle.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === 'all' || cert.status === statusFilter) &&
      (moduleFilter === 'all' || (moduleFilter === 'complete' ? cert.moduleId === null : cert.moduleId === parseInt(moduleFilter)))
    );
    setFilteredCertificates(filtered);
  }, [certificates, searchTerm, statusFilter, moduleFilter]);

  const getStatusBadge = (status) => {
    const variants = {
      issued: 'default',
      revoked: 'destructive',
      expired: 'secondary',
    };
    return <Badge variant={variants[status] || 'outline'}>{status}</Badge>;
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  const handleActionClick = (cert, type) => {
    setSelectedCert(cert);
    setActionType(type);
    setDialogOpen(true);
  };

  const confirmAction = () => {
    setDialogOpen(false);
    toast({
      title: `Certificate ${actionType}d`,
      description: `Certificate ${selectedCert.certificateId} has been successfully ${actionType}d.`,
    });
    if (actionType === 'revoke') {
      setCertificates(certs => certs.map(c => c.id === selectedCert.id ? { ...c, status: 'revoked' } : c));
    }
    if (actionType === 're-issue') {
      setCertificates(certs => certs.map(c => c.id === selectedCert.id ? { ...c, status: 'issued', issueDate: new Date().toISOString().split('T')[0] } : c));
    }
  };

  const handleView = (certificateId) => {
    router.push(`/admin/certificate/${certificateId}`);
  };

  const handleDownload = () => {
    toast({
      title: "🚧 Feature not implemented",
      description: "You can request this in your next prompt! 🚀",
    });
  }

  const CertificateCard = ({ cert }) => (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-base font-semibold leading-tight">{cert.moduleTitle}</CardTitle>
        <CardDescription>For {cert.employeeName} ({cert.employeeId})</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-2 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Status:</span>
          {getStatusBadge(cert.status)}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Issued:</span>
          <span>{formatDate(cert.issueDate)}</span>
        </div>
        <p className="text-xs text-muted-foreground pt-2">ID: {cert.certificateId}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full" onClick={() => handleView(cert.id)}>
          <Eye className="mr-2 h-4 w-4" /> View Certificate
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>Manage Certificates - PWS Group</title>
        <meta name="description" content="Manage, issue, and revoke employee certificates." />
      </Helmet>

      <div>
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Certificate Management</h1>
              <p className="text-muted-foreground mt-1">
                Oversee all employee training certificates.
              </p>
            </div>
            <Button onClick={() => toast({ title: "🚧 Feature not implemented yet!" })} className="w-full sm:w-auto">
              <CheckCircle className="mr-2 h-4 w-4" /> Issue New Certificate
            </Button>
          </div>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Certificates</CardTitle>
            <CardDescription>{filteredCertificates.length} certificates found.</CardDescription>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="relative md:col-span-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="issued">Issued</SelectItem>
                    <SelectItem value="revoked">Revoked</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={moduleFilter} onValueChange={setModuleFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by module" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Modules</SelectItem>
                    {mockModulesList.map(module => (
                      <SelectItem key={module.id} value={module.id.toString()}>{module.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Module</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCertificates.length > 0 ? (
                    filteredCertificates.map(cert => (
                      <TableRow key={cert.id}>
                        <TableCell>
                          <div className="font-medium">{cert.employeeName}</div>
                          <div className="text-sm text-muted-foreground">{cert.employeeId}</div>
                        </TableCell>
                        <TableCell>{cert.moduleTitle}</TableCell>
                        <TableCell>{formatDate(cert.issueDate)}</TableCell>
                        <TableCell>{getStatusBadge(cert.status)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleView(cert.id)}>
                                <Eye className="mr-2 h-4 w-4" /> View
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={handleDownload}>
                                <Download className="mr-2 h-4 w-4" /> Download PDF
                              </DropdownMenuItem>
                               <DropdownMenuItem onClick={() => handleActionClick(cert, 're-issue')}>
                                <RefreshCw className="mr-2 h-4 w-4" /> Re-issue
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive" onClick={() => handleActionClick(cert, 'revoke')}>
                                <Trash2 className="mr-2 h-4 w-4" /> Revoke
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        No certificates found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
              {filteredCertificates.map(cert => (
                <CertificateCard key={cert.id} cert={cert} />
              ))}
              {filteredCertificates.length === 0 && (
                <p className="col-span-full text-center text-muted-foreground py-10">No certificates found.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will {actionType} the certificate <span className="font-bold">{selectedCert?.certificateId}</span>. This action can be undone later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmAction} className={actionType === 'revoke' ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : ''}>
              Confirm {actionType}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};

export default AdminCertificates;