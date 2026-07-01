import React from "react";

function PrecioCadaProducto() {
  const catalogoPrecios = [
    { id: 1, nombre: "Montura Ray-Ban Aviator", precio: 350000, categoria: "Montura" },
    { id: 2, nombre: "Lentes Monofocales antirreflejo", precio: 120000, categoria: "Cristales" },
    { id: 3, nombre: "Lentes de Contacto FreshLook", precio: 180000, categoria: "Contacto" },
    { id: 4, nombre: "Líquido Limpiador Lente Mágico", precio: 150000, categoria: "Accesorios" },
    { id: 5, nombre: "Estuche de Protección Rígido", precio: 25000, categoria: "Accesorios" }
  ];

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "75vh" }}>
      <div className="card shadow border-0 p-4" style={{ width: "100%", maxWidth: "450px" }}>
        <div className="card-body">
          <h3 className="text-center fw-bold text-primary mb-2">Precios de Productos</h3>
          <p className="text-muted text-center small mb-4">Lista de valores unitarios de los Productos de la optica Lente Magico</p>
          <div className="overflow-auto" style={{ maxHeight: "280px" }}>
            {catalogoPrecios.map((prod) => (
              <div key={prod.id} className="p-3 bg-light rounded border mb-2 d-flex justify-content-between align-items-center shadow-sm">
                <div className="text-start me-2">
                  <span className="d-block fw-bold text-dark small">{prod.nombre}</span>
                  <span className="badge bg-secondary text-white" style={{ fontSize: "10px" }}>{prod.categoria}</span>
                </div>
                <div className="text-end font-monospace text-success fw-bold fs-5">
                  ${prod.precio.toLocaleString()}
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}

export default PrecioCadaProducto;