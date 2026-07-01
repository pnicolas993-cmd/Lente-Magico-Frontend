import React, { useState } from "react";

function CantidadProductosVendidos() {
  const [unidadesVendidas, setUnidadesVendidas] = useState(250);

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "75vh" }}>
      <div className="card bg-success text-white shadow border-0 p-4 text-center" style={{ width: "100%", maxWidth: "450px" }}>
        <div className="card-body">
          <h3 className="fw-bold mb-4">Cantidad de Productos Vendidos</h3>
          <div className="display-1 fw-bold my-3 font-monospace">
            {unidadesVendidas}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CantidadProductosVendidos;
