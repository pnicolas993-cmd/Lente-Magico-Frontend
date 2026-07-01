import api from "./axiosConfig";

export const QuitarConsultaService = {
  guardarEliminacion: async (datosEliminados) => {
    const response = await api.post('/consultas', datosEliminados);
    return response.data;
  }
};