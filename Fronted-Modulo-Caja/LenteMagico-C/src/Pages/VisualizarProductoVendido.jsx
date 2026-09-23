import React from "react";

function VisualizarProductoVendido() {

  const productosVendidos = [
    { id: 1, nombre: "Montura Óptica Ray-Ban Aviator Dorada", precio: "450.000", hora: "02:15 PM" },
    { id: 2, nombre: "Lentes Monofocales con Filtro Azul Anti-Reflejo", precio: "180.000", hora: "01:40 PM" },
    { id: 3, nombre: "Líquido Limpiador Lente Mágico 60ml", precio: "15.000", hora: "11:10 AM" },
    { id: 4, nombre: "Estuche Rígido de Protección Negro", precio: "25.000", hora: "09:30 AM" }
  ];

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "75vh" }}>
      <div className="card shadow border-0 p-4" style={{ width: "100%", maxWidth: "450px" }}>
        <div className="card-body">
          <h3 className="text-center fw-bold text-primary mb-4">Productos Vendidos</h3>
          <div className="overflow-auto" style={{ maxHeight: "300px" }}>
            {productosVendidos.map((prod) => (
              <div key={prod.id} className="p-3 bg-dark text-warning rounded text-center mb-3 shadow-sm">
                {/* Nombre del producto */}
                <div className="fw-bold fs-6 mb-1 text-white">{prod.nombre}</div>
                
                {/* Detalles adicionales de la venta */}
                <div className="d-flex justify-content-between align-items-center mt-2 px-2 small text-muted">
                  <span className="badge bg-warning text-dark fw-bold">${prod.precio}</span>
                  <span className="text-warning-50 font-monospace">{prod.hora}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}

export default VisualizarProductoVendido;
