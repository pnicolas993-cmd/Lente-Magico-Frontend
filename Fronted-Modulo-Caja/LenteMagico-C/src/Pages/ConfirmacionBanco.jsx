import React from "react";
// Importamos el servicio unificado para registrar el pago
import { ConfirmacionBancoService } from "../Api/ConfirmacionBancoService";

function ConfirmacionBanco() {
  const factura = { 
    numero: "LM-0248", 
    total: 470000, 
    metodo: "Transferencia Bancaria" 
  };

  const verificarSms = async (e) => {
    e.preventDefault();
    
    // Captura garantizada usando el atributo name del input
    const tokenInput = e.target.tokenAutorizacion.value; 

    // Estructuramos el objeto JSON unificado para el endpoint /pagos
    const datosCompra = {
      numero_factura: factura.numero,
      cliente: "Confirmado por el Banco", // Marcamos el cliente o estado según tu requerimiento
      total: factura.total,
      numero_tarjeta: tokenInput, // Reutilizamos el campo para almacenar el Token / Comprobante
      cuotas: "1" // Las transferencias bancarias se registran como pago único (1 cuota)
    };

    try {
      // Enviamos los datos mediante POST usando tu arquitectura con Axios
      await ConfirmacionBancoService.verificar(datosCompra);

      alert(
        `✓ Validación Exitosa y Pago Guardado.\n\n` +
        `Se confirmó el ingreso de $${factura.total.toLocaleString()} COP en la cuenta bancaria de Lente Mágico.\n` +
        `Ref: ${factura.numero}\n` +
        `Token/Comprobante: ${tokenInput}`
      );
      
      e.target.reset();

    } catch (error) {
      console.error("Error al confirmar transacción bancaria:", error);
      
      const codigoStatus = error.response?.status || "Servidor Apagado / Sin Conexión";
      const mensajeServidor = error.response?.data?.mensaje || error.message;

      alert(
        `❌ Error al registrar la confirmación en la API (Código: ${codigoStatus})\n\n` +
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
            <h3 className="fw-bold text-success mb-1">Validación Del Banco</h3>
          </div>

          {/* Caja con la información de la transferencia pendiente */}
          <div className="p-3 bg-dark text-white rounded small mb-4 font-monospace">
            <div className="text-warning fw-bold mb-1">Transacción Pendiente:</div>
            <div>Ref: {factura.numero}</div>
            <div>Medio: {factura.metodo}</div>
            <div className="text-success fw-bold fs-5 mt-1">+ ${factura.total.toLocaleString()} COP</div>
          </div>

          <form onSubmit={verificarSms}>
            <div className="mb-4">
              <label className="small fw-bold text-muted mb-1 d-block text-center">Ingresa el Token de Seguridad / Comprobante</label>
              <input 
                type="text" 
                name="tokenAutorizacion" // CORREGIDO: Se añade name para una lectura estricta y limpia
                placeholder="Código de Aprobación o Token" 
                className="form-control py-2 text-center font-monospace" 
                required 
                onInvalid={(e) => e.target.setCustomValidity("Por favor, rellena este campo.")}
                onInput={(e) => e.target.setCustomValidity("")}
              />
            </div>

            <button type="submit" className="btn btn-success w-100 fw-bold py-2 shadow-sm">
              Confirmar Transacción en Banco
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

export default ConfirmacionBanco;