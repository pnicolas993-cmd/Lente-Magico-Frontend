import React, { useState } from "react";
import { PlataformasService } from "../Api/PlataformasService";

function Plataformas() {
  const factura = { numero: "LM-0248", total: 470000 };
  const [plataforma, setPlataforma] = useState("");
  const [cuentaCelular, setCuentaCelular] = useState("");

  const procesarPago = async (e) => {
    e.preventDefault();

    const datosPago = {
      numero_factura: factura.numero,
      total_factura: factura.total,
      metodo_pago: plataforma,       
      monto_recibido: factura.total,     
      cambio_devuelta: 0,              
      detalles_transaccion: cuentaCelular 
    };

    try {
      await PlataformasService.procesar(datosPago);

      alert(
        `✓ ¡Pago REGISTRADO en la tabla de Pagos!\n\n` +
        `Factura: ${factura.numero}\n` +
        `Plataforma: ${plataforma}\n` +
        `Monto Guardado: $${factura.total.toLocaleString()} COP\n\n` +
        `¡Datos sincronizados con éxito en Lente Mágico!`
      );

      setPlataforma("");
      setCuentaCelular("");

    } catch (error) {
      console.error("Error al guardar en la tabla pagos:", error);
      const detalleError = error.response?.data?.mensaje || error.message || "Error de red";
      alert(`❌ Error al guardar en la API: ${detalleError}`);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "75vh" }}>
      <div className="card shadow border-0 p-4" style={{ width: "100%", maxWidth: "450px" }}>
        <div className="card-body">
          
          <div className="text-center border-bottom pb-3 mb-3">
            <h3 className="fw-bold text-primary mb-1">Lente Mágico</h3>
            <span className="badge bg-info text-dark font-monospace">Pago con Plataformas</span>
          </div>

          <div className="d-flex justify-content-between align-items-center bg-light p-2 rounded border mb-3 small">
            <span className="fw-bold text-secondary">Total a Transferir:</span>
            <span className="font-monospace text-success fw-bold fs-5">${factura.total.toLocaleString()}</span>
          </div>

          <form onSubmit={procesarPago}>
            <div className="mb-3">
              <select className="form-select py-2" value={plataforma} onChange={(e) => setPlataforma(e.target.value)} required>
                <option value="" disabled>Selecciona la Plataforma</option>
                <option value="Nequi">Nequi</option>
                <option value="Daviplata">Daviplata</option>
                <option value="PSE / Cuenta Bancaria">PSE / Cuenta Bancaria</option>
              </select>
            </div>

            <div className="mb-4">
              <input 
                type="text" 
                placeholder="Número de Celular o Cuenta" 
                className="form-control py-2 text-center font-monospace" 
                value={cuentaCelular}
                onChange={(e) => setCuentaCelular(e.target.value)}
                required 
              />
            </div>

            <button type="submit" className="btn btn-warning text-dark w-100 fw-bold py-2 shadow-sm">
              Confirmar y Guardar Pago
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

export default Plataformas;