import API from "./index";

// Login
export const login = async (email, password) => {
  try {
    const response = await API.post("/auth/login", { email, password });
    if (!(response.status >= 200 && response.status < 300)) {
      throw new Error(response.data.message || "Failed to login");
    }
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Register
export const register = async (name, email, password) => {
  try {
    const response = await API.post("/auth/register", { name, email, password });
    if (!(response.status >= 200 && response.status < 300)) {
      throw new Error(response.data.message || "Failed to register");
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Forgot Pass
export const apiForgotPassword = async (email) => {
  try {
    const response = await API.post("/auth/forgot-pass", { email });
    if (!(response.status >= 200 && response.status < 300)) {
      throw new Error(response.data.message || "Failed to send request");
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Reset Pass
export const apiResetPassword = async (email, newPassword, otp) => {
  try {
    const response = await API.put("/auth/reset-pass", { email, newPassword, otp });
    if (!(response.status >= 200 && response.status < 300)) {
      throw new Error(response.data.message || "Failed to send request");
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};
