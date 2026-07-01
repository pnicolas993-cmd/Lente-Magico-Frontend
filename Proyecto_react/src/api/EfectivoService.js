import api from "./axiosConfig"; // <--- ¡Asegúrate de tener esta línea exacta aquí arriba!

export const EfectivoService = {
  procesar: async (datosPago) => {
    const respuesta = await api.post('/pagos', datosPago);
    return respuesta.data;
  }
};