import api from './axiosConfig';

export const proveedoresService = {
    // Obtener todos los proveedores
    getProveedores: async () => {
        try {
            const response = await api.get('/proveedores');
            return response.data; // Axios almacena la respuesta del servidor en .data
        } catch (error) {
            console.error("Error en getProveedores:", error);
            throw error; // Lanza el error para que el catch del componente lo capture y muestre el toast
        }
    },

    // Crear un nuevo proveedor
    crearProveedor: async (proveedorData) => {
        try {
            const response = await api.post('/proveedores', proveedorData);
            return response.data;
        } catch (error) {
            console.error("Error en crearProveedor:", error);
            throw error;
        }
    },

    // Actualizar un proveedor existente
    actualizarProveedor: async (id, proveedorData) => {
        try {
            const response = await api.put(`/proveedores/${id}`, proveedorData);
            return response.data;
        } catch (error) {
            console.error("Error en actualizarProveedor:", error);
            throw error;
        }
    },

    // Eliminar un proveedor
    eliminarProveedor: async (id) => {
        try {
            const response = await api.delete(`/proveedores/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error en eliminarProveedor:", error);
            throw error;
        }
    }
};