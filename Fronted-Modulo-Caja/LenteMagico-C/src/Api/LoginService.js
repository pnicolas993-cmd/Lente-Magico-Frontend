import api from "./axiosConfig";

export const LoginService = {
  login: async (credentials) => {
    const response = await api.post('/usuarios/login', credentials);
    return response.data;
  }
};