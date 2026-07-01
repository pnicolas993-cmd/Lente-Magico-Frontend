import api from './axiosConfig';

export const categoriasService = {
    getCategorias: async () => {
        const response = await api.get('/categorias_producto');
        return response.data;
    },

    crearCategoria: async (nuevaCategoria) => {
        const response = await api.post('/categorias_producto', nuevaCategoria);
        return response.data;
    },

    actualizarCategoria: async (id, categoriaActualizada) => {
        const response = await api.put(`/categorias_producto/${id}`, categoriaActualizada);
        return response.data;
    },

    eliminarCategoria: async (id) => {
        const response = await api.delete(`/categorias_producto/${id}`);
        return response.data;
    }
};