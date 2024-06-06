import { login as apiLogin, register as apiRegister, apiForgotPassword, apiResetPassword } from "../api/auth";

export const login = async (email, password) => {
  try {
    const data = await apiLogin(email, password);
    localStorage.setItem("token", data.data.token);
    return data;
  } catch (error) {
    throw error;
  }
};

export const register = async (name, email, password) => {
  try {
    const data = await apiRegister(name, email, password);
    return data;
  } catch (error) {
    throw error;
  }
};

export const postForgotPassword = async (email) => {
  try {
    const data = await apiForgotPassword(email);
    return data;
  } catch (error) {
    throw error;
  }
};

export const postResetPassword = async (email, newPassword, otp) => {
  try {
    const data = await apiResetPassword(email, newPassword, otp);
    return data;
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};
