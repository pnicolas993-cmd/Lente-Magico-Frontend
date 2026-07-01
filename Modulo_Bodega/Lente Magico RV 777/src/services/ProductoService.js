import api from "./axiosConfig";

export const ProductoService = {

  // GET /productos -> trae todos los productos
  obtenerTodos: async () => {
    const response = await api.get('/productos');
    return response.data;
  },

  // GET /productos/:id -> trae un solo producto
  obtenerPorId: async (id) => {
    const response = await api.get(`/productos/${id}`);
    return response.data;
  },

  // POST /productos -> crea un producto nuevo
  crear: async (datosProducto) => {
    const response = await api.post('/productos', datosProducto);
    return response.data;
  },

  // PUT /productos/:id -> actualiza un producto existente (lo reemplaza completo)
  actualizar: async (id, datosProducto) => {
    const response = await api.put(`/productos/${id}`, datosProducto);
    return response.data;
  },

  // DELETE /productos/:id -> elimina un producto
  eliminar: async (id) => {
    const response = await api.delete(`/productos/${id}`);
    return response.data;
  },
};
