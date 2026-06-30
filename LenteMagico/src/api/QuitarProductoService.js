import api from "./axiosConfig";

export const QuitarProductoService = {
  guardarEliminacion: async (datosEliminados) => {
    const response = await api.post('/productos', datosEliminados);
    return response.data;
  }
};