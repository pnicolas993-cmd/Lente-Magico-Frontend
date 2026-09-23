import React from "react";
import { Card, Button } from "react-bootstrap";

import { ConfirmarVentaService } from "../Api/ConfirmarVentaService";

function ConfirmarVenta() {
  const datosVentaActual = {
    concepto: "1x Gafas con montura Ray-Ban + Filtro Azul",
    total: 350000,
    fecha: "24/06/2026"
  };

  const handleConfirmar = async () => {
    await ConfirmarVentaService.confirmar(datosVentaActual);
    
    alert("✓ Venta confirmada correctamente");
  };

  return (
    <Card className="shadow-sm border-dark mx-auto" style={{ maxWidth: "350px", fontFamily: "monospace" }}>
      <Card.Body className="p-3 text-dark">
        <div className="text-center mb-2">
          <h5 className="fw-bold m-0">LENTE MÁGICO </h5>
          <small>Bogotá, Colombia</small>
        </div>
        
        <hr style={{ borderTop: "2px dashed #000" }} />
        
        <div className="small">
          <strong>CONCEPTO:</strong>
          <div className="d-flex justify-content-between">
            <span>1x Gafas con montura Ray-Ban</span>
            <span>$350.000</span>
          </div>
          <span className="text-muted">+ Filtro Azul</span>
        </div>
        
        <hr style={{ borderTop: "1px dashed #000" }} />
        
        <div className="d-flex justify-content-between align-items-center mb-2">
          <strong>TOTAL A PAGAR:</strong>
          <span className="fw-bold text-success">$350.000 COP</span>
        </div>
        
        <div className="text-center small text-muted mb-3">Fecha: {datosVentaActual.fecha}</div>
        <Button variant="success" className="w-100 fw-bold" onClick={handleConfirmar}>
          Confirmar Venta
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ConfirmarVenta;
