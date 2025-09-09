'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock user database
const mockUsers = [
  { id: '1', name: 'Sarit', email: 'sarit@pyrotechworkspace.com', role: 'admin' },
  { id: '2', name: 'John Doe', email: 'john.doe@example.com', role: 'employee' },
  { id: '3', name: 'Jane Smith', email: 'jane.smith@example.com', role: 'employee' },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('lms_user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('lms_user');
    }
    setLoading(false);
  }, []);

  // Simulates sending an OTP. In a real app, this would be a backend call.
  const requestLoginOTP = async (email) => {
    // This is a mock function. It does not actually send an email.
    // We are simulating the Brevo SMTP call described by the user.
    console.log(`Simulating sending OTP to ${email} via Brevo SMTP...`);

    const existingUser = mockUsers.find(u => u.email === email);
    
    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // In a real app, you'd hash the OTP and store it with an expiry.
    // Here, we store it in localStorage for demonstration.
    const otpData = {
      email,
      otp, // In a real app, this would be a hash.
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes expiry
      isNewUser: !existingUser,
    };
    sessionStorage.setItem('otp_data', JSON.stringify(otpData));
    
    console.log(`Generated OTP for ${email}: ${otp}`); // For debugging
    
    toast({
      title: "OTP Sent",
      description: `A 6-digit code has been sent to ${email}. (Check console for OTP)`,
    });
    
    return { success: true, email };
  };

  // Simulates verifying the OTP.
  const verifyOTPAndLogin = async (otp) => {
    const otpDataString = sessionStorage.getItem('otp_data');
    if (!otpDataString) {
      toast({ title: "Error", description: "OTP session not found. Please try again.", variant: "destructive" });
      return { success: false };
    }
    
    const otpData = JSON.parse(otpDataString);

    if (Date.now() > otpData.expiresAt) {
      toast({ title: "OTP Expired", description: "Your OTP has expired. Please request a new one.", variant: "destructive" });
      sessionStorage.removeItem('otp_data');
      return { success: false };
    }

    // --- START MODIFICATION ---
    // Bypassing OTP verification for testing purposes as requested by the user.
    // In a real application, you would compare the entered OTP with the stored OTP.
    // if (otp !== otpData.otp) {
    //   toast({ title: "Invalid OTP", description: "The OTP you entered is incorrect.", variant: "destructive" });
    //   return { success: false };
    // }
    // --- END MODIFICATION ---

    let loggedInUser;
    if (otpData.isNewUser) {
      // Create a new user (mock) - generate name from email
      const emailName = otpData.email.split('@')[0];
      const displayName = emailName.split('.').map(part => 
        part.charAt(0).toUpperCase() + part.slice(1)
      ).join(' ');
      
      loggedInUser = {
        id: (mockUsers.length + 1).toString(),
        name: displayName,
        email: otpData.email,
        role: 'employee', // Default role
      };
      mockUsers.push(loggedInUser);
    } else {
      loggedInUser = mockUsers.find(u => u.email === otpData.email);
    }

    setUser(loggedInUser);
    setIsAuthenticated(true);
    localStorage.setItem('lms_user', JSON.stringify(loggedInUser));
    sessionStorage.removeItem('otp_data');

    toast({
      title: "Login Successful",
      description: `Welcome, ${loggedInUser.name}!`,
    });
    
    router.push(loggedInUser.role === 'admin' ? '/admin' : '/dashboard');
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('lms_user');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    router.push('/login');
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    requestLoginOTP,
    verifyOTPAndLogin,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};