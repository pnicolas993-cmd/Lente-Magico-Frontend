import api from "./axiosConfig";

export const TarjetaDebitoService = {
  registrar: async (datosPago) => {
    const response = await api.post('/pagos', datosPago);
    return response.data;
  }
};