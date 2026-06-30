import React, { useState } from "react";

import { EfectivoService } from "../Api/EfectivoService";
import api from "../Api/axiosConfig";

function Efectivo() {

  const factura = {
    numero: "LM-0248",
    fecha: "25/06/2026",
    cliente: "Juan Ramirez",
    documento: "1.013.482.110",
    productos: [
      { descripcion: "Montura Ray-Ban Aviator", precio: 350000 },
      { descripcion: "Lentes Monofocales antirreflejo", precio: 120000 }
    ],
    total: 470000
  };

  const [recibido, setRecibido] = useState("");

  const cambio = recibido ? Math.max(0, Number(recibido) - factura.total) : 0;

  const procesarPago = async (e) => {
    e.preventDefault();
    
    const montoRecibido = Number(recibido);

    if (montoRecibido < factura.total) {
      alert(`El dinero recibido ($${montoRecibido.toLocaleString()}) no es el solicitado en la factura ($${factura.total.toLocaleString()}) hace falta un poco más.`);
      return;
    }

    alert(
      `✓ Pago procesado con éxito para la factura ${factura.numero}.\n\n` +
      `Total Factura: $${factura.total.toLocaleString()} COP\n` +
      `Efectivo Recibido: $${montoRecibido.toLocaleString()} COP\n` +
      `----------------------------------------\n` +
      `CAMBIO A ENTREGAR AL CLIENTE: $${cambio.toLocaleString()} COP\n\n` +
      `¡Dinero ingresado a la Caja de Lente Mágico!`
    );

    const datosPago = {
      numero_factura: factura.numero, 
      total: factura.total,          
      recibido: montoRecibido,        
      cambio: cambio                  
    };

    try {
      await EfectivoService.procesar(datosPago);
    } catch (error) {
      console.error("El backend no guardó el log del pago, pero la alerta se mostró:", error);
    }

    setRecibido(""); 
  }; 

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "75vh" }}>
      <div className="card shadow border-0 p-4" style={{ width: "100%", maxWidth: "450px" }}>
        <div className="card-body">
          
          {/* Encabezado de la Factura */}
          <div className="text-center border-bottom pb-3 mb-3">
            <h3 className="fw-bold text-primary mb-1">Lente Mágico</h3>
            <span className="d-block small text-muted text-uppercase fw-bold font-monospace">Factura de Venta: {factura.numero}</span>
            <small className="text-muted">{factura.fecha}</small>
          </div>

          {/* Datos del Cliente */}
          <div className="mb-3 small">
            <div className="text-secondary fw-bold text-uppercase" style={{ fontSize: "11px" }}>Cliente:</div>
            <div className="fw-semibold text-dark">{factura.cliente}</div>
            <div className="text-muted font-monospace">{factura.documento}</div>
          </div>

          {/* Cuerpo / Ítems de la Factura */}
          <div className="border-top border-bottom py-2 my-3">
            <div className="text-secondary fw-bold text-uppercase mb-2" style={{ fontSize: "11px" }}>Detalle de Productos:</div>
            {factura.productos.map((prod, index) => (
              <div key={index} className="d-flex justify-content-between align-items-center mb-1 small">
                <span className="text-dark text-truncate me-2">{prod.descripcion}</span>
                <span className="font-monospace text-secondary">${prod.precio.toLocaleString()}</span>
              </div>
            ))}
          </div>

          {/* Total a Pagar */}
          <div className="d-flex justify-content-between align-items-center bg-light p-2 rounded border mb-4">
            <span className="fw-bold text-uppercase small text-secondary ms-1">Total a Pagar:</span>
            <span className="font-monospace text-success fw-bold fs-4 me-1">
              ${factura.total.toLocaleString()}
            </span>
          </div>

          {/* Formulario de Pago en Efectivo */}
          <form onSubmit={procesarPago}>
            
            {/* Ingresar el dinero */}
            <div className="mb-3">
              <label className="form-label small fw-bold text-muted text-uppercase mb-1">Efectivo Recibido ($)</label>
              <input 
                type="number" 
                className="form-control py-2 font-monospace fs-5 text-center fw-bold text-primary"
                placeholder="0"
                value={recibido}
                onChange={(e) => setRecibido(e.target.value)}
                required 
                onInvalid={(e) => e.target.setCustomValidity("Por favor, rellena este campo.")}
                onInput={(e) => e.target.setCustomValidity("")}
              />
            </div>

            {/* Muestra el cambio */}
            {recibido && Number(recibido) >= factura.total && (
              <div className="alert alert-info text-center p-2 mb-3 border-0 shadow-sm rounded">
                <span className="d-block small text-uppercase fw-bold text-muted" style={{ fontSize: "11px" }}>Cambio / Devuelta:</span>
                <strong className="fs-5 font-monospace text-primary">${cambio.toLocaleString()} COP</strong>
              </div>
            )}

            {/* Botón de pago */}
            <button type="submit" className="btn btn-warning text-dark w-100 fw-bold py-2 shadow-sm">
              Cancelar en Efectivo
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

export default Efectivo;