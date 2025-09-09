import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, Download, Eye } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const CertificatesPreview = ({ certificates }) => {
  const { toast } = useToast();
  const router = useRouter();
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.1 } },
  };

  const handleAction = (certificateId, action) => {
    if (!certificateId) {
       toast({
        title: "🚧 Feature Coming Soon!",
        description: "Certificate generation is in progress. 🚀",
      });
      return;
    }
    router.push(`/certificate/${certificateId}?action=${action}`);
  };

  return (
    <motion.div variants={cardVariants} initial="hidden" animate="visible">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>My Certificates</CardTitle>
            <CardDescription>Your earned certificates</CardDescription>
          </div>
          <Link href="/certificates">
            <Button variant="outline">View All</Button>
          </Link>
        </CardHeader>
        <CardContent>
          {certificates.length > 0 ? (
            <div className="space-y-4">
              {certificates.slice(0, 2).map((cert) => (
                <div
                  key={cert.id}
                  className="flex items-center justify-between p-4 border rounded-lg bg-muted/30"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {cert.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {cert.issueDate ? `Issued on ${cert.issueDate}`: 'Pending'}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleAction(cert.certificateId, 'view')}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleAction(cert.certificateId, 'download')}
                      disabled={!cert.certificateId}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Complete modules to earn certificates.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CertificatesPreview;