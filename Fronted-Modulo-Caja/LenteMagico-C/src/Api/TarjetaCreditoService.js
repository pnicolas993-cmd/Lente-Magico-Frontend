import api from "./axiosConfig";

export const TarjetaCreditoService = {
  registrar: async (datosPago) => {
    const response = await api.post('/pagos', datosPago);
    return response.data;
  }
};