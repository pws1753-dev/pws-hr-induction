import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { 
  Award, 
  Search,
  ChevronRight,
  XCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { mockEmployeeCertificatesData } from '@/data/certificates';

const CertificatesPage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [certificates, setCertificates] = useState([]);
  const [filteredCertificates, setFilteredCertificates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    setCertificates(mockEmployeeCertificatesData);
  }, []);

  useEffect(() => {
    let filtered = certificates.filter(cert =>
      (cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (cert.moduleName && cert.moduleName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (cert.certificateId && cert.certificateId.toLowerCase().includes(searchTerm.toLowerCase()))) &&
      (statusFilter === 'all' || cert.status === statusFilter)
    );
    setFilteredCertificates(filtered);
  }, [certificates, searchTerm, statusFilter]);
  
  const handleAction = (certificateId) => {
    if (!certificateId) {
      toast({
        title: "Certificate Pending",
        description: "Please complete all requirements to generate your certificate.",
        variant: "destructive"
      });
      return;
    }
    router.push(`/certificate/${certificateId}`);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <>
      <Head>
        <title>My Certificates - PWS Group</title>
        <meta name="description" content="View and download your earned certificates." />
      </Head>
      
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Certificates</h1>
          <p className="text-muted-foreground">View and download your earned certificates.</p>
        </div>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Search certificates..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="Filter by Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="issued">Issued</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredCertificates.map((cert, index) => (
            <motion.div key={cert.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.05 }}>
              <Card className="h-full flex flex-col hover:border-primary transition-colors group">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-primary/10 shrink-0">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <Badge variant={cert.status === 'issued' ? 'default' : 'secondary'} className="ml-2 capitalize">{cert.status}</Badge>
                  </div>
                  <CardTitle className="text-base sm:text-lg leading-tight">{cert.title}</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4 flex-grow">
                  {cert.status === 'issued' ? (
                    <div className="space-y-2 text-sm">
                      <div><p className="text-muted-foreground text-xs">Issue Date</p><p className="font-medium">{formatDate(cert.issueDate)}</p></div>
                      <div><p className="text-muted-foreground text-xs">Score</p><p className="font-medium text-green-500">{cert.score}%</p></div>
                    </div>
                  ) : (
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm font-semibold mb-2 text-muted-foreground">Requirements to unlock:</p>
                      <ul className="text-sm text-muted-foreground space-y-1.5">
                        {cert.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start space-x-2"><XCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" /><span>{req}</span></li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>

                <CardFooter className="pt-4 border-t">
                  <Button variant="ghost" size="sm" className="w-full justify-between" onClick={() => handleAction(cert.certificateId)}>
                    {cert.status === 'issued' ? 'View Certificate' : 'View Requirements'}
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredCertificates.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <Award className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium">No certificates found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default CertificatesPage;