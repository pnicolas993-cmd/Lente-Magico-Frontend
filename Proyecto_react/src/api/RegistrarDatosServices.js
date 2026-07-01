import api from "./axiosConfig";

export const RegistrarDatosService = {
  registrar: async (datosPersonales) => {
    const response = await api.post('/datos_personales', datosPersonales);
    return response.data;
  }
};

export default RegistrarDatosService;