import React, { useState } from "react";
import { TarjetaCreditoService } from "../Api/TarjetaCreditoService";

function TarjetaCredito() {
  const factura = { numero: "LM-0248", cliente: "Juan Pérez", total: 470000 };
  const [cuotas, setCuotas] = useState("1");

  const procesarPago = async (e) => {
    e.preventDefault();
    
    const numeroTarjeta = e.target.numeroTarjeta.value;

    const datosPago = {
      numero_factura: factura.numero,
      cliente: factura.cliente,
      total: factura.total,
      numero_tarjeta: numeroTarjeta,
      cuotas: cuotas
    };

    try {
      await TarjetaCreditoService.registrar(datosPago);

      alert(`✓ ¡Pago Guardado con éxito!\n\nFactura: ${factura.numero}\nCliente: ${factura.cliente}\nCuotas: ${cuotas}`);
      e.target.reset();
      setCuotas("1");

    } catch (error) {
      console.error("Error al guardar pago con tarjeta:", error);
      
      const codigoStatus = error.response?.status || "Sin respuesta del servidor";
      const mensajeApi = error.response?.data?.mensaje || error.message;

      alert(
        `❌ No se guardó en la API (Código: ${codigoStatus})\n\n` +
        `Detalle técnico: ${mensajeApi}\n\n` +
        `Revisa si agregaste la ruta app.use('/pagos-tarjeta') en tu index.js de Node.`
      );
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "75vh" }}>
      <div className="card shadow border-0 p-4" style={{ width: "100%", maxWidth: "450px" }}>
        <div className="card-body">
          
          <div className="text-center border-bottom pb-3 mb-3">
            <h3 className="fw-bold text-primary mb-1">Lente Mágico</h3>
            <span className="badge bg-dark text-white font-monospace">Pago: Tarjeta de Crédito</span>
          </div>

          <div className="mb-3 small bg-light p-2 rounded border">
            <div className="text-muted text-uppercase fw-bold" style={{ fontSize: "10px" }}>Factura / Cliente:</div>
            <strong className="text-dark">{factura.numero}</strong> — {factura.cliente}
            <div className="text-success fw-bold fs-5 mt-1">${factura.total.toLocaleString()} COP</div>
          </div>

          <form onSubmit={procesarPago}>
            <div className="mb-3">
              <input 
                type="text" 
                name="numeroTarjeta"
                placeholder="Número de Tarjeta (**** **** **** 1234)" 
                className="form-control py-2 font-monospace text-center" 
                required 
              />
            </div>

            <div className="mb-4">
              <label className="form-label small fw-bold text-muted text-uppercase mb-1">Número de Cuotas</label>
              <select className="form-select py-2" value={cuotas} onChange={(e) => setCuotas(e.target.value)}>
                <option value="1">1 Cuota (Sin Intereses)</option>
                <option value="3">3 Cuotas</option>
                <option value="6">6 Cuotas</option>
                <option value="12">12 Cuotas</option>
              </select>
            </div>

            <button type="submit" className="btn btn-warning text-dark w-100 fw-bold py-2 shadow-sm">
              Pagar con Tarjeta de Crédito
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

export default TarjetaCredito;