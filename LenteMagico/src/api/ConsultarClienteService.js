import api from "./axiosConfig";

export const ConsultarClienteService = {
  getCliente: async (documento) => {
    const response = await api.get(`/clientes/${documento}`);
    return response.data;
  }
};