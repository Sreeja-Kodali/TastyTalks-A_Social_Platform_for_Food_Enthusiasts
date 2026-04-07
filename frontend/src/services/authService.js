import { authAPI } from './api';

export const login = async (payload) => {
  const response = await authAPI.login(payload);
  return response.data;
};

export const register = async (payload) => {
  const response = await authAPI.register(payload);
  return response.data;
};

export const logout = async () => {
  await authAPI.logout();
};
