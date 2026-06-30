import api from './axiosConfig';

export const comprasService = {
   
    getCompras: async () => {
        const response = await api.get('/compras');
        return response.data;
    },

    crearCompra: async (nuevaCompra) => {
        const response = await api.post('/compras', nuevaCompra);
        return response.data;
    },

    getCompraPorId: async (id) => {
        const response = await api.get(`/compras/${id}`);
        return response.data;
    },

    eliminarCompra: async (id) => {
        const response = await api.delete(`/compras/${id}`);
        return response.data;
    }
};