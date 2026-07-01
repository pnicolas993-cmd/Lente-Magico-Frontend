import api from './axiosConfig';

export const proveedoresService = {
    getProveedores: async () => {
        const response = await api.get('/proveedores');
        return response.data;
    },

    crearProveedor: async (nuevoProveedor) => {
        const response = await api.post('/proveedores', nuevoProveedor);
        return response.data;
    },

    actualizarProveedor: async (id_proveedor, proveedorActualizado) => {
        const response = await api.put(`/proveedores/${id_proveedor}`, proveedorActualizado);
        return response.data;
    },

    eliminarProveedor: async (id_proveedor) => {
        const response = await api.delete(`/proveedores/${id_proveedor}`);
        return response.data;
    }
};