const API_BASE_URL = 'http://localhost:8080';

export const initiateLogin = async (email) => {
  const response = await fetch(`${API_BASE_URL}/user/email/initiate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(errorData.message || 'Failed to initiate login');
  }

  return await response.json();
};

export const verifyLogin = async (email, otp) => {
  const response = await fetch(`${API_BASE_URL}/user/email/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, otp }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(errorData.message || 'Failed to verify OTP');
  }

  return await response.json();
};
