import api from "./axiosConfig";

export const RegistrarClienteService = {
  registrar: async (datosCliente) => {
    const response = await api.get('/clientes', datosCliente);
    return response.data;
  }
};