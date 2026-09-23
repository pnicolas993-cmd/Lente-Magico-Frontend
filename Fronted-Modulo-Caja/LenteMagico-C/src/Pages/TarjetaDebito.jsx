import React from "react";
import { TarjetaDebitoService } from "../Api/TarjetaDebitoService";

function TarjetaDebito() {
  const factura = { numero: "LM-0248", cliente: "Juan Pérez", total: 470000 };

  const procesarPago = async (e) => {
    e.preventDefault();
    
    const numeroOperacion = e.target.numeroOperacion.value;

    const datosPago = {
      numero_factura: factura.numero,
      cliente: factura.cliente,
      total: factura.total,
      numero_tarjeta: numeroOperacion, 
      cuotas: "1" 
    };

    try {
      await TarjetaDebitoService.registrar(datosPago);

      alert(`✓ Pago con Tarjeta Débito Exitoso.\nFactura: ${factura.numero}\nTotal: $${factura.total.toLocaleString()} COP\nTransacción guardada con éxito.`);
      e.target.reset();

    } catch (error) {
      console.error("Error completo atrapado en Pago Débito:", error);
      
      const codigoStatus = error.response?.status || "Servidor Apagado / Sin Conexión";
      const mensajeServidor = error.response?.data?.mensaje || error.message;

      alert(
        `❌ Error al registrar el pago (Código: ${codigoStatus})\n\n` +
        `Detalle técnico: ${mensajeServidor}\n\n` +
        `Asegúrate de que tu backend esté corriendo en el puerto 3000.`
      );
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "75vh" }}>
      <div className="card shadow border-0 p-4" style={{ width: "100%", maxWidth: "450px" }}>
        <div className="card-body">
          
          <div className="text-center border-bottom pb-3 mb-3">
            <h3 className="fw-bold text-primary mb-1">Lente Mágico</h3>
            <span className="badge bg-secondary text-white font-monospace">Pago: Tarjeta Débito</span>
          </div>

          <div className="mb-4 small bg-light p-3 rounded border text-center">
            <div className="text-muted text-uppercase mb-1" style={{ fontSize: "11px" }}>Monto Neto:</div>
            <div className="font-monospace text-success fw-bold display-6 mb-2">${factura.total.toLocaleString()}</div>
            <span className="text-secondary d-block">Ref: {factura.numero} — {factura.cliente}</span>
          </div>

          <form onSubmit={procesarPago}>
            <div className="mb-4">
              <input 
                type="text" 
                name="numeroOperacion"
                placeholder="Número de Operación / Voucher Datáfono" 
                className="form-control py-2 text-center font-monospace" 
                required 
              />
            </div>

            <button type="submit" className="btn btn-warning text-dark w-100 fw-bold py-2 shadow-sm">
              Cancelar con Tarjeta Débito
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

export default TarjetaDebito;
