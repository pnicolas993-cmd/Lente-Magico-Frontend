import api from "./axiosConfig";

export const AgregarConsultaService = {
  agregar: async (datosConsulta) => {
    const response = await api.post('/agenda_consulta', datosConsulta);
    return response.data;
  }
};