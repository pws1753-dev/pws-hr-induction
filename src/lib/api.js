import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const initiateLogin = async (email) => {
  try {
    const response = await axiosInstance.post('/user/email/initiate', { email });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to initiate login');
  }
};

export const verifyLogin = async (email, otp) => {
  try {
    const response = await axiosInstance.post('/user/email/verify', { email, otp });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to verify OTP');
  }
};

export const updateUser = async (userId, token, userData) => {
  try {
    const response = await axiosInstance.put(`/user/update/${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("response.data", response.data)
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update user');
  }
};

export const fetchDepartments = async (token) => {
  try {
    const response = await axiosInstance.get('/module/departments', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch departments');
  }
};
