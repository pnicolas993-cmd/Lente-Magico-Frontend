import React, { useState } from "react";
import { AgregarConsultaService } from "../Api/AgregarConsultaService"; 

function AgregarConsulta1() {
  const [nueva, setNueva] = useState("");

  const añadir = async (e) => {
    e.preventDefault();

    const datosConsulta = {
      descripcion: nueva 
    };

    await AgregarConsultaService.agregar(datosConsulta);
    
    setNueva("");
    alert("Consulta agregada con éxito");
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "75vh" }}>
      <div className="card shadow border-0 p-4" style={{ width: "100%", maxWidth: "450px" }}>
        <div className="card-body">
          <h3 className="text-center fw-bold text-primary mb-4">Agregar Consulta</h3>
          
          <form onSubmit={añadir} className="my-2">
            <div className="mb-3">
              <input
                type="text"
                placeholder="Ej: Control de Optometría 4:00 PM"
                className="form-control mb-2"
                value={nueva}
                onChange={(e) => setNueva(e.target.value)}
                required
                onInvalid={(e) => e.target.setCustomValidity("Por favor, rellena este campo.")}
                onInput={(e) => e.target.setCustomValidity("")}
              />
            </div>

            <button type="submit" className="btn btn-success w-100 fw-bold py-2 shadow-sm">
              Agendar Consulta
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AgregarConsulta1;