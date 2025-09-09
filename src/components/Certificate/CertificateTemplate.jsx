import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Logo from '@/components/Logo';

const CertificateTemplate = React.forwardRef(({ certificate }, ref) => {
  const { user } = useAuth();
  
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const employeeName = user?.name || certificate?.employeeName;
  const moduleName = certificate?.moduleName || certificate?.title;
  const issueDate = formatDate(certificate?.issueDate);
  const certificateId = certificate?.certificateId || certificate?.id;
  const signatureUrl = 'https://horizons-cdn.hostinger.com/80183b82-9400-4995-812e-b97ec408ba93/d1297e682e864cd2e84d416b27e85292.webp';
  
  return (
    <div ref={ref} className="w-full mx-auto max-w-full md:max-w-[900px] md:aspect-[1.414] min-h-[320px] sm:min-h-[420px] md:min-h-[600px] bg-white text-[#1a202c] p-[3%] sm:p-[5%] font-[Georgia] flex flex-col justify-center">
      <div className="w-full h-full border-2 sm:border-4 border-double border-[#0d1b2a] bg-[#fdfdfd] p-[3%] sm:p-[5%] flex flex-col relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-no-repeat bg-center opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: `url('https://horizons-cdn.hostinger.com/80183b82-9400-4995-812e-b97ec408ba93/41e3368990de7b6efa3e0394377972d2.webp')`, backgroundSize: '45%' }}>
        </div>

        <header className="flex flex-col sm:flex-row justify-between items-center z-10 w-full gap-2 sm:gap-0">
            <div className="text-center sm:text-left">
                <p className="font-bold text-[clamp(0.6rem,1.2vw,1.125rem)] tracking-wider text-[#0d1b2a]">PYROTECH WORKSPACE</p>
                <p className="text-[clamp(0.4rem,0.8vw,0.75rem)] text-[#718096] tracking-widest">SOLUTIONS PVT. LTD.</p>
            </div>
            <div className="flex items-center">
                <Logo showText={true} className="h-6 sm:h-8" />
            </div>
        </header>

        <main className="flex-grow flex flex-col items-center justify-center text-center z-10 w-full my-auto px-2 sm:px-0">
            <p className="font-sans text-[clamp(0.8rem,1.5vw,1.5rem)] font-light uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#718096]">
              Certificate of Completion
            </p>
            <div className="my-[1%] sm:my-[2%] w-1/3 sm:w-1/5 h-[1px] sm:h-[2px] bg-[#bfa181]"></div>
            <p className="font-sans text-[clamp(0.6rem,1.2vw,1.125rem)] text-[#718096] mb-1 sm:mb-2">This is to proudly certify that</p>
            <h1 className="text-[clamp(1.5rem,4vw,3.75rem)] font-bold tracking-tight text-[#0d1b2a] leading-tight break-words px-2">{employeeName}</h1>
            <p className="font-sans text-[clamp(0.6rem,1.2vw,1.125rem)] text-[#718096] mt-2 sm:mt-4 max-w-2xl sm:max-w-3xl mx-auto px-2">
              has successfully completed all requirements for the training module
            </p>
            <h2 className="text-[clamp(1.2rem,3vw,2.5rem)] font-semibold text-[#bfa181] mt-2 sm:mt-3 break-words px-2">{moduleName}</h2>
        </main>

        <footer className="flex flex-col sm:flex-row justify-between items-center sm:items-end z-10 w-full gap-4 sm:gap-0">
            <div className="text-center sm:text-left">
                <img src={signatureUrl} alt="Signature of HR Manager" className="h-[clamp(1.2rem,3vw,3rem)] mx-auto sm:mx-0 sm:-ml-2 mb-1" />
                <div className="w-full h-[1px] bg-[#bfa181] mt-1 mb-2"></div>
                <p className="font-sans font-semibold text-[clamp(0.6rem,1vw,1rem)] text-[#0d1b2a]">HR Manager</p>
                <p className="font-sans text-[clamp(0.4rem,0.8vw,0.75rem)] text-[#718096]">PWS Group</p>
            </div>
            
            <div className="flex flex-col items-center order-first sm:order-none">
                <ShieldCheck className="w-[clamp(2rem,6vw,6rem)] h-[clamp(2rem,6vw,6rem)] text-[#bfa181] mb-1" />
                <p className="font-sans text-[clamp(0.4rem,0.8vw,0.75rem)] text-[#718096] font-medium tracking-wider">VERIFIED</p>
            </div>

            <div className="text-center sm:text-right">
                <p className="font-sans font-semibold text-[clamp(0.6rem,1vw,1rem)] text-[#0d1b2a]">{issueDate}</p>
                <p className="font-sans text-[clamp(0.4rem,0.8vw,0.75rem)] text-[#718096] mb-2">Date of Issue</p>
                <p className="font-mono text-[clamp(0.3rem,0.6vw,0.625rem)] text-[#718096] mt-2 sm:mt-4 break-all">ID: {certificateId}</p>
            </div>
        </footer>
      </div>
    </div>
  );
});

export default CertificateTemplate;