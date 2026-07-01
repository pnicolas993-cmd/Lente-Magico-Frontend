import React from "react";

import { RegistrarClienteService } from "../Api/RegistrarClienteService";

export default function RegistrarCliente() {
  
  const manejarRegistro = async (e) => {
    e.preventDefault();
    
    const nombre = e.target.nombre.value;
    const tipoDocumento = e.target.tipoDocumento.value;
    const cedula = e.target.cedula.value;
    const correo = e.target.correo.value;

    const datosCliente = {
      nombre: nombre,
      tipo_documento: tipoDocumento,
      numero_documento: cedula,
      correo: correo
    };

    try {
      
      await RegistrarClienteService.registrar(datosCliente);

      alert(`✓ ¡Cliente guardado con éxito!\n\nNombre: ${nombre}\n${tipoDocumento}: ${cedula}`);
      e.target.reset();

    } catch (error) {
      console.error("Error completo atrapado:", error);
      
      const codigoStatus = error.response?.status || "Servidor Apagado / Sin Conexión";
      const mensajeServidor = error.response?.data?.mensaje || error.message;

      alert(
        `❌ Error al registrar en la API (Código: ${codigoStatus})\n\n` +
        `Detalle técnico: ${mensajeServidor}\n\n` +
        `Asegúrate de que tu backend esté corriendo en el puerto 3000.`
      );
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "75vh" }}>
      <div className="card shadow border-0 p-4" style={{ width: "100%", maxWidth: "450px" }}>
        <div className="card-body">
          <h3 className="text-center fw-bold text-primary mb-4">Registrar Nuevo Cliente</h3>
          
          <form onSubmit={manejarRegistro}>
            <div className="mb-3">
              <input 
                type="text" 
                name="nombre"
                className="form-control py-2" 
                placeholder="Nombre Completo" 
                required 
              />
            </div>

            <div className="mb-3">
              <select name="tipoDocumento" className="form-select py-2 text-muted" defaultValue="" required>
                <option value="" disabled hidden>Tipo de Documento</option>
                <option value="Cédula de Ciudadanía" className="text-dark">Cédula de Ciudadanía (C.C.)</option>
                <option value="Cédula de Extranjería" className="text-dark">Cédula de Extranjería (C.E.)</option>
                <option value="Tarjeta de Identidad" className="text-dark">Tarjeta de Identidad (T.I.)</option>
                <option value="Pasaporte" className="text-dark">Pasaporte</option>
              </select>
            </div>

            <div className="mb-3">
              <input 
                type="text" 
                name="cedula"
                className="form-control py-2" 
                placeholder="Número de Documento" 
                required 
              />
            </div>

            <div className="mb-4">
              <input 
                type="email" 
                name="correo"
                className="form-control py-2" 
                placeholder="Correo Electrónico" 
                required 
              />
            </div>

            <button type="submit" className="btn btn-success w-100 fw-bold py-2 shadow-sm">
              Guardar Cliente
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}