import React from "react";

import { RegistrarServicioService } from "../Api/RegistrarServicioService";

function RegistrarServicio() {
  
  const crearServicio = async (e) => {
    e.preventDefault();
    
    const tipo = e.target.tipoServicio.value;
    const nombre = e.target.nombreServicio.value;
    const costo = e.target.costoServicio.value;


    const datosServicio = {
      tipo_servicio: tipo,
      nombre_servicio: nombre,
      costo_servicio: costo
    };

    try {
      await RegistrarServicioService.registrar(datosServicio);

      alert(`✓ ¡Servicio registrado con éxito!\n\nTipo: ${tipo}\nNombre: ${nombre}\nCosto: $${costo}`);
      e.target.reset();

    } catch (error) {
      console.error("Error completo atrapado en Servicios:", error);
      
      const codigoStatus = error.response?.status || "Servidor Apagado / Sin Conexión";
      const mensajeServidor = error.response?.data?.mensaje || error.message;

      alert(
        `❌ Error al registrar el servicio en la API (Código: ${codigoStatus})\n\n` +
        `Detalle técnico: ${mensajeServidor}\n\n` +
        `Asegúrate de que tu backend esté corriendo en el puerto 3000.`
      );
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "75vh" }}>
      <div className="card shadow border-0 p-4" style={{ width: "100%", maxWidth: "450px" }}>
        <div className="card-body">
          <h3 className="text-center fw-bold text-primary mb-4">Registrar Servicio</h3>
          
          <form onSubmit={crearServicio}>
            
            {/* Seleccionar el Tipo de Servicio */}
            <div className="mb-3">
              <select 
                name="tipoServicio" 
                className="form-select py-2 text-muted" 
                defaultValue=""
                required
                onInvalid={(e) => e.target.setCustomValidity("Por favor, rellena este campo.")}
                onInput={(e) => e.target.setCustomValidity("")}
              >
                <option value="" disabled hidden>Selecciona el Tipo de Servicio</option>
                <option value="Servicio de Venta Óptica" className="text-dark">Servicio de Venta de Productos Ópticos</option>
                <option value="Consulta Médica" className="text-dark">Consulta Médica</option>
              </select>
            </div>

            {/* Nombre del Servicio */}
            <div className="mb-3">
              <input 
                type="text" 
                name="nombreServicio"
                className="form-control py-2" 
                placeholder="Nombre (Ej: Montura Negra / Examen General)" 
                required 
                onInvalid={(e) => e.target.setCustomValidity("Por favor, rellena este campo.")}
                onInput={(e) => e.target.setCustomValidity("")}
              />
            </div>

            {/* Campo 3: Costo del Servicio */}
            <div className="mb-4">
              <input 
                type="number" 
                name="costoServicio"
                className="form-control py-2" 
                placeholder="Costo del Servicio ($)" 
                required 
                onInvalid={(e) => e.target.setCustomValidity("Por favor, rellena este campo.")}
                onInput={(e) => e.target.setCustomValidity("")}
              />
            </div>

            {/* Botón de acción con estilos estables */}
            <button type="submit" className="btn btn-warning text-dark w-100 fw-bold py-2 shadow-sm">
              Registrar Servicio
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

export default RegistrarServicio;