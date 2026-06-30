import api from "./axiosConfig";

export const ConfirmarVentaService = {
  confirmar: async (datosVenta) => {
    const response = await api.post('/ventas', datosVenta);
    return response.data;
  }
};