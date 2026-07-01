import api from "./axiosConfig";

export const ConfirmacionBancoService = {
  verificar: async (datosCompra) => {
    const response = await api.post('/pagos', datosCompra);
    return response.data;
  }
};