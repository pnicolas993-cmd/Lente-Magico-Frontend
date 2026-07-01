import api from "./axiosConfig";

export const RegistrarServicioService = {
  registrar: async (datosServicio) => {
    const response = await api.post('/consultas', datosServicio); 
    return response.data;
  }
};