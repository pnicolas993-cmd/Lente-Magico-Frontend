import api from "./axiosConfig";

export const ProductoService = {

  obtenerTodos: async () => {
    const response = await api.get('/productos');
    return response.data;
  },

  obtenerPorId: async (id) => {
    const response = await api.get(`/productos/${id}`);
    return response.data;
  },

  crear: async (datosProducto) => {
    const response = await api.post('/productos', datosProducto);
    return response.data;
  },

  actualizar: async (id, datosProducto) => {
    const response = await api.put(`/productos/${id}`, datosProducto);
    return response.data;
  },

  eliminar: async (id) => {
    const response = await api.delete(`/productos/${id}`);
    return response.data;
  },
};
