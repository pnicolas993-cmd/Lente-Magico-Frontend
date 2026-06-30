import api from "./axiosConfig";

export const PlataformasService = {
  procesar: async (datosPago) => {

    const response = await api.post('/pagos', datosPago);
    return response.data;
  }
};