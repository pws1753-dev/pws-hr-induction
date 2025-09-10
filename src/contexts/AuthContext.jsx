'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';
import { initiateLogin, verifyLogin, updateUser, fetchDepartments } from '@/lib/api';

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
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentEmail, setCurrentEmail] = useState(null);
  const [userDetailsNeeded, setUserDetailsNeeded] = useState(false);
  const [departments, setDepartments] = useState([]);
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
      // Check if any of the required fields are missing or empty
      const userData = data.user;
      const missingDetails = !userData.employeeId || !userData.designation || !userData.department || !userData.name;
      const loggedInUser = {
        id: userData._id,
        name: userData.name,
        email: userData.email,
        role: userData.role === 'user' ? 'employee' : userData.role, // Map 'user' to 'employee'
        department: userData.department,
        designation: userData.designation,
        employeeId: userData.employeeId,
      };
      setUser(loggedInUser);
      setToken(data.token);
      console.log("missingDetails", missingDetails)
      if (missingDetails) {
        fetchDepartmentsMutation.mutate(data.token);
        setUserDetailsNeeded(true);
      } else {
        setIsAuthenticated(true);
        localStorage.setItem('lms_user', JSON.stringify(loggedInUser));
        localStorage.setItem('lms_token', data.token);
        router.push(loggedInUser.role === 'admin' ? '/admin' : '/dashboard');
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ userId, token, userData }) => updateUser(userId, token, userData),
    onSuccess: (data, variables) => {
      // Store user from the update response
      console.log("SUCCESS", data)
      const user = data.data
      const updatedUser = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role === 'user' ? 'employee' : user.role,
        department: user.department,
        designation: user.designation,
        employeeId: user.employeeId,
      };
      setUser(updatedUser);
      setIsAuthenticated(true);
      localStorage.setItem('lms_user', JSON.stringify(updatedUser));
      localStorage.setItem('lms_token', token);
      setUserDetailsNeeded(false);
      toast({
        title: "Login Successful",
        description: `Welcome, ${updatedUser.name}!`,
      });
      router.push(updatedUser.role === 'admin' ? '/admin' : '/dashboard');
    },
    onError: (error) => {
      toast({
        title: "Update Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const fetchDepartmentsMutation = useMutation({
    mutationFn: (token) => fetchDepartments(token),
    onSuccess: (data) => {
      setDepartments(data.departments);
      setUserDetailsNeeded(true);
    },
    onError: (error) => {
      console.error("Failed to fetch departments", error);
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

  const updateUserDetails = async (userData) => {
    if (!user || !token) {
      toast({
        title: "Error",
        description: "User session not found.",
        variant: "destructive",
      });
      return { success: false };
    }
    try {
      await updateMutation.mutateAsync({ userId: user.id, token, userData });
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    userDetailsNeeded,
    requestLoginOTP,
    verifyOTPAndLogin,
    updateUserDetails,
    logout,
    departments
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};