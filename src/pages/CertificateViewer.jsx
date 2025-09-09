import React, { useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Helmet } from 'react-helmet';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { certificatesData } from '@/data/certificates';
import CertificateTemplate from '@/components/Certificate/CertificateTemplate';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, ArrowLeft, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const CertificateViewer = () => {
    const { certificateId } = useParams();
    const { user } = useAuth();
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const [isDownloading, setIsDownloading] = React.useState(false);
    const certificate = certificatesData.find(c => c.id === certificateId || c.certificateId === certificateId);
    const certificateRef = useRef();
    const pdfContainerRef = useRef();

    const handleDownloadPdf = () => {
        const input = pdfContainerRef.current;
        if (!input) {
            toast({
              title: "Download Error",
              description: "Could not find certificate content to download.",
              variant: "destructive",
            });
            return;
        };

        setIsDownloading(true);

        html2canvas(input, {
            scale: 3, 
            useCORS: true,
            logging: false,
            backgroundColor: null, 
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png', 1.0);
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'px',
                format: [1123, 794],
                hotfixes: ['px_scaling'],
            });
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Certificate-${certificate.moduleName.replace(/\s+/g, '-')}.pdf`);
            toast({
              title: "Download Complete",
              description: "Your certificate has been successfully downloaded.",
            });
            setIsDownloading(false);
        }).catch((error) => {
            console.error("Error generating PDF:", error);
            toast({
              title: "Download Failed",
              description: "An unexpected error occurred while generating the PDF.",
              variant: "destructive",
            });
            setIsDownloading(false);
        });
    };
    
    useEffect(() => {
        const queryParams = new URLSearchParams(searchParams);
        if (queryParams.get('action') === 'download' && certificate) {
            handleDownloadPdf();
        }
    }, [searchParams, certificate]);

    if (!certificate) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <h1 className="text-2xl font-bold mb-4">Certificate Not Found</h1>
                <p className="text-muted-foreground mb-6">We couldn&apos;t find the certificate you&apos;re looking for.</p>
                <Button asChild>
                    <Link href="/certificates">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to My Certificates
                    </Link>
                </Button>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Certificate: {certificate.moduleName} - PWS Group</title>
                <meta name="description" content={`View and download your certificate for completing the ${certificate.moduleName} module.`} />
            </Helmet>
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">Certificate of Completion</h1>
                        <p className="text-muted-foreground">Module: {certificate.moduleName}</p>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                         <Button variant="outline" asChild className="flex-1 sm:flex-none">
                            <Link href={user?.role === 'admin' ? '/admin/certificates' : '/certificates'}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back
                            </Link>
                        </Button>
                        <Button onClick={handleDownloadPdf} disabled={isDownloading} className="flex-1 sm:flex-none">
                            {isDownloading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Download className="mr-2 h-4 w-4" />
                            )}
                            Download PDF
                        </Button>
                    </div>
                </div>

                <Card className="bg-muted/30 p-2 sm:p-4 md:p-8 flex items-center justify-center">
                    <CardContent className="p-0 w-full max-w-6xl overflow-x-auto">
                       <div ref={certificateRef} className="shadow-2xl min-w-[300px]">
                           <CertificateTemplate certificate={certificate} />
                       </div>
                    </CardContent>
                </Card>
                
                {/* Hidden div for high-quality PDF generation */}
                <div className="absolute -z-10 -left-[9999px] -top-[9999px]">
                    <div ref={pdfContainerRef} className="w-[1123px] h-[794px]">
                        <CertificateTemplate certificate={certificate} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CertificateViewer;