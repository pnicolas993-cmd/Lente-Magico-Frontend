import api from "./axiosConfig";

export const AgregarProductosService = {
  agregar: async (datosProducto) => {
    const response = await api.post('/productos', datosProducto);
    return response.data;
  }
};