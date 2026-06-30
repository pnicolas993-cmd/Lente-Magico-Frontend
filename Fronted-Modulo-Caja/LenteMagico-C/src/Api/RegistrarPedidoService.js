import api from "./axiosConfig";

export const RegistrarPedidoService = {
  registrar: async (datosPedido) => {
    const response = await api.post('/compras', datosPedido); 
    return response.data;
  }
};