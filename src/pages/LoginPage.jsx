
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import { Mail, Loader2, RefreshCw, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import Logo from '@/components/Logo';

const LoginPage = () => {
  const [step, setStep] = useState('email'); // 'email', 'otp', 'user-details'
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [department, setDepartment] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [designation, setDesignation] = useState('');
  const [name, setName] = useState('');
  const { requestLoginOTP, verifyOTPAndLogin, userDetailsNeeded, updateUserDetails, departments } = useAuth();
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (userDetailsNeeded && step === 'otp') {
      setStep('user-details');
    }
  }, [userDetailsNeeded, step]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await requestLoginOTP(email);
    setLoading(false);
    if (result.success) {
      setStep('otp');
      setTimer(300); // 5 minutes
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await verifyOTPAndLogin(otp);
    setLoading(false);
    if (result.success) {
      // The useEffect will handle transitioning to user-details if needed
      // If user is complete, AuthContext will navigate automatically
    }
  };

  const handleResendOtp = async () => {
    setOtp('');
    setTimer(0);
    await handleEmailSubmit(new Event('submit'));
  };

  const handleUserDetailsSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await updateUserDetails({ department, employeeId, designation, name });
    setLoading(false);
    if (result.success) {
      setStep('email');
      setEmail('');
      setOtp('');
      setDepartment('');
      setEmployeeId('');
      setDesignation('');
      setName('');
      setTimer(0);
    }
  };



  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <Head>
        <title>Login - PWS Group</title>
        <meta name="description" content="Login to PWS Group's Corporate Induction Learning Platform" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <AnimatePresence mode="wait">
              {step === 'email' && (
                <motion.div
                  key="email-step"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardHeader className="text-center space-y-2">
                    <div className="flex items-center justify-center mb-4">
                      <Logo showText={true} className="h-12" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Welcome</CardTitle>
                    <CardDescription>
                      Enter your email address to sign in or create an account
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleEmailSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input id="email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required className="pl-10 h-12" />
                        </div>
                      </div>
                      <Button type="submit" className="w-full h-12" disabled={loading}>
                        {loading ? <Loader2 className="animate-spin" /> : "Continue with Email"}
                      </Button>
                    </form>
                  </CardContent>
                </motion.div>
              )}

              {step === 'otp' && (
                <motion.div
                  key="otp-step"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardHeader>
                    <Button variant="ghost" size="sm" className="w-fit p-0 h-auto" onClick={() => { setStep('email'); setOtp(''); }}>
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <CardTitle className="text-2xl font-bold pt-2">Check your email</CardTitle>
                    <CardDescription>
                      We&apos;ve sent a 6-digit code to <span className="font-semibold text-foreground">{email}</span>.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleOtpSubmit} className="space-y-6">
                      <div className="space-y-2 text-center">
                        <Label htmlFor="otp">Enter your code</Label>
                        <InputOTP maxLength={6} id="otp" value={otp} onChange={(value) => setOtp(value)}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>

                      <Button type="submit" className="w-full h-12" disabled={loading || otp.length < 6}>
                        {loading ? <Loader2 className="animate-spin" /> : "Verify & Sign In"}
                      </Button>

                      <div className="text-center text-sm text-muted-foreground">
                        {timer > 0 ? (
                          <p>You can resend the code in {formatTime(timer)}</p>
                        ) : (
                          <Button variant="link" type="button" onClick={handleResendOtp} className="p-0 h-auto font-normal">
                            Didn&apos;t get a code? <span className="font-semibold ml-1 flex items-center">Resend <RefreshCw className="ml-2 h-3 w-3" /></span>
                          </Button>
                        )}
                      </div>
                    </form>
                  </CardContent>
                </motion.div>
              )}

              {step === 'user-details' && (
                <motion.div
                  key="user-details-step"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardHeader>
                    <Button variant="ghost" size="sm" className="w-fit p-0 h-auto" onClick={() => { setStep('otp'); }}>
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <CardTitle className="text-2xl font-bold pt-2">Complete Your Profile</CardTitle>
                    <CardDescription>
                      Please provide your details to complete the registration.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUserDetailsSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" type="text" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} required className="h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Select value={department} onValueChange={setDepartment} required>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select your department" />
                          </SelectTrigger>
                          <SelectContent>
                            {departments.map((dept) => (
                              <SelectItem key={dept._id} value={dept._id}>
                                {dept.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="designation">Designation</Label>
                        <Input id="designation" type="text" placeholder="Enter your designation" value={designation} onChange={(e) => setDesignation(e.target.value)} required className="h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="employeeId">Employee ID</Label>
                        <Input id="employeeId" type="text" placeholder="Enter your employee ID" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} required className="h-12" />
                      </div>
                      <Button type="submit" className="w-full h-12" disabled={loading}>
                        {loading ? <Loader2 className="animate-spin" /> : "Complete Registration"}
                      </Button>
                    </form>
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default LoginPage;
