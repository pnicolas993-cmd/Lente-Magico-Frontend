import React, { useState } from "react";
import { ConsultarClienteService } from "../Api/ConsultarClienteService";

import { RegistrarClienteService } from "../Api/RegistrarClienteService"; 

function ConsultarCliente() {
  const [clienteEncontrado, setClienteEncontrado] = useState(null);

  const manejarBusqueda = async (e) => {
    e.preventDefault(); 
    const nombre = e.target.nombre.value;
    const apellido = e.target.apellido.value;
    const correo = e.target.correo.value;
    const id=e.target.id.value;

    const nuevoCliente = {
      nombre,
      apellido,
      correo,
      id,
    };

    try {
      const resultado = await ConsultarClienteService.getCliente(correo);
      
      if (resultado && resultado.correo) {
        setClienteEncontrado(resultado);
        alert(`El usuario con el correo ${correo} YA ESTÁ REGISTRADO en el sistema de Lente Mágico.`);
      } else {
        throw new Error("not_found");
      }

    } catch (error) {

      if (error.response?.status === 404 || error.message === "not_found") {
        
        try {
          await RegistrarClienteService.registrar(nuevoCliente);
          
          alert(`El usuario NO ESTABA registrado.\n\n¡Se ha guardado exitosamente en la API de Lente Mágico!`);
          
          setClienteEncontrado(nuevoCliente);
          e.target.reset(); 

        } catch (errorRegistro) {
          console.error("Error al registrar cliente:", errorRegistro);
          alert("❌ El cliente no existía, pero hubo un error al intentar guardarlo en la API.");
        }

      } else {
        console.error("Error en la consulta:", error);
        alert("❌ Error de conexión con la API al consultar el cliente.");
      }
    }
  };

  return (
    <div className="card shadow-sm border-0 mx-auto" style={{ width: "100%", maxWidth: "500px" }}>
      <div className="card-body p-4 text-dark">
        <h5 className="fw-bold mb-2 text-primary text-center">Consultar Cliente</h5>
        <p className="small text-muted text-center mb-4">
          Ingresa los datos del usuario para realizar la búsqueda:
        </p>
        
        <form onSubmit={manejarBusqueda}>
          <div className="mb-2">
            <label className="small fw-bold text-muted mb-1">Nombre</label>
            <input 
              type="text" 
              name="nombre" 
              className="form-control" 
              placeholder="Nombre del cliente" 
              required 
              onInvalid={(e) => e.target.setCustomValidity("Por favor, rellena este campo.")}
              onInput={(e) => e.target.setCustomValidity("")}
            />
          </div>

          <div className="mb-2">
            <label className="small fw-bold text-muted mb-1">Apellido</label>
            <input 
              type="text" 
              name="apellido" 
              className="form-control" 
              placeholder="Apellido del cliente" 
              required 
              onInvalid={(e) => e.target.setCustomValidity("Por favor, rellena este campo.")}
              onInput={(e) => e.target.setCustomValidity("")}
            />
          </div>

          <div className="mb-3">
            <label className="small fw-bold text-muted mb-1">Correo Electrónico</label>
            <input 
              type="email" 
              name="correo" 
              className="form-control" 
              placeholder="correo@ejemplo.com" 
              required 
              onInvalid={(e) => e.target.setCustomValidity("Por favor, rellena este campo.")}
              onInput={(e) => e.target.setCustomValidity("")}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold py-2 shadow-sm mb-3">
            Consultar
          </button>
        </form>

        {clienteEncontrado && (
          <div className="mt-3 p-3 bg-light rounded border border-success shadow-sm animate__animated animate__fadeIn">
            <h6 className="fw-bold text-success mb-2">Clientes Consultados:</h6>
            <p className="small m-0"><strong>Nombre completo:</strong> {clienteEncontrado.nombre} {clienteEncontrado.apellido}</p>
            <p className="small m-0"><strong>Correo electrónico:</strong> {clienteEncontrado.correo}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ConsultarCliente;