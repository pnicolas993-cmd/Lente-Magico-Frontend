import React, { useState } from "react";
import { QuitarConsultaService } from "../Api/QuitarConsultaService";

function QuitarConsulta() {

  const [consultas, setConsultas] = useState([
    { id: 1, detalle: "Control paciente Ximena Avila - 9:00 AM" },
    { id: 2, detalle: "Examen Ocular - 11:30 AM" }
  ]);

  const eliminar = async (id, detalleCita) => {
    const confirmar = window.confirm(`¿Estás seguro de que deseas quitar esta consulta?\n"${detalleCita}"`);
    if (!confirmar) return;

    
    const datosEliminados = {
      consulta_id: id,
      detalle: detalleCita,
      estado: "Eliminado"
    };

    try {
      
      await QuitarConsultaService.guardarEliminacion(datosEliminados);

      setConsultas(consultas.filter(c => c.id !== id));
      
      alert("✓ Eliminación registrada con éxito.");

    } catch (error) {
      console.error("Error al conectar con la API:", error);
      const detalleError = error.response?.data?.mensaje || error.message || "Error de conexión con el servidor";
      
      alert(
        `❌ Error: No se pudo guardar la eliminación en la API.\n` +
        `Detalle técnico: ${detalleError}\n\n` 
      );
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "75vh" }}>
      
      <div className="card shadow border-0 p-4" style={{ width: "100%", maxWidth: "450px" }}>
        
        <div className="card-body">
          <h3 className="text-center fw-bold text-danger mb-4">Quitar Consulta</h3>
          
          <div className="mt-2">
            {consultas.length === 0 ? (
              <p className="text-muted text-center small my-3">No hay más citas agendadas.</p>
            ) : (
              consultas.map((c) => (
                <div key={c.id} className="d-flex justify-content-between align-items-center border-bottom py-2">
                  <span className="small text-dark">{c.detalle}</span>
                  <button 
                    type="button"
                    className="btn btn-danger btn-sm fw-bold shadow-sm" 
                    onClick={() => eliminar(c.id, c.detalle)}>
                    Eliminar
                  </button>
                </div>
              ))
            )}
          </div>
        </div> 

      </div> 

    </div> 
  );
}

export default QuitarConsulta;