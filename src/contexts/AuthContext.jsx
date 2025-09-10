'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';
import { initiateLogin, verifyLogin } from '@/lib/api';

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
  const [currentEmail, setCurrentEmail] = useState(null);
  const router = useRouter();

  const initiateMutation = useMutation({
    mutationFn: initiateLogin,
    onSuccess: (data, variables) => {
      toast({
        title: "OTP Sent",
        description: `A 6-digit code has been sent to ${variables.email}.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const verifyMutation = useMutation({
    mutationFn: ({ email, otp }) => verifyLogin(email, otp),
    onSuccess: (data) => {
      // Data structure: { statusCode, message, user, token }
      const loggedInUser = {
        id: data.user._id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role === 'user' ? 'employee' : data.user.role, // Map 'user' to 'employee'
        department: data.user.department,
        designation: data.user.designation,
        employeeId: data.user.employeeId,
      };
      setUser(loggedInUser);
      setIsAuthenticated(true);
      localStorage.setItem('lms_user', JSON.stringify(loggedInUser));
      localStorage.setItem('lms_token', data.token);
      toast({
        title: "Login Successful",
        description: `Welcome, ${loggedInUser.name}!`,
      });
      router.push(loggedInUser.role === 'admin' ? '/admin' : '/dashboard');
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

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

  const requestLoginOTP = async (email) => {
    try {
      setCurrentEmail(email);
      await initiateMutation.mutateAsync(email);
      return { success: true, email };
    } catch (error) {
      return { success: false };
    }
  };

  const verifyOTPAndLogin = async (otp) => {
    if (!currentEmail) {
      toast({
        title: "Error",
        description: "Email not found. Please start login again.",
        variant: "destructive",
      });
      return { success: false };
    }
    try {
      await verifyMutation.mutateAsync({ email: currentEmail, otp });
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('lms_user');
    localStorage.removeItem('lms_token');
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