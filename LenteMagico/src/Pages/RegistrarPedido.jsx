import React from "react";

import { RegistrarPedidoService } from "../Api/RegistrarPedidoService";

function RegistrarPedido() {
  
  const procesar = async (e) => {
    e.preventDefault();
    
    const nombreCliente = e.target.nombreCliente.value;
    const NoVenta = e.target.NoVenta.value;
    const especificaciones = e.target.especificaciones.value;
    const valorPedido = e.target.valorPedido.value;

    const datosPedido = {
      nombre_cliente: nombreCliente,
      numero_venta: NoVenta,
      especificaciones: especificaciones,
      valor_total: valorPedido
    };

    try {
      await RegistrarPedidoService.registrar(datosPedido);

      alert(`✓ ¡Pedido registrado con éxito!\n\nCliente: ${nombreCliente}\nVenta N°: ${NoVenta}\nValor: $${valorPedido}`);
      e.target.reset();

    } catch (error) {
      console.error("Error completo atrapado en Pedidos:", error);
      
      const codigoStatus = error.response?.status || "Servidor Apagado / Sin Conexión";
      const mensajeServidor = error.response?.data?.mensaje || error.message;

      alert(
        `❌ Error al registrar el pedido en la API (Código: ${codigoStatus})\n\n` +
        `Detalle técnico: ${mensajeServidor}\n\n` +
        `Asegúrate de que tu backend esté corriendo en el puerto 3000.`
      );
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "75vh" }}>
      <div className="card shadow border-0 p-4" style={{ width: "100%", maxWidth: "450px" }}>
        <div className="card-body">
          <h3 className="text-center fw-bold text-primary mb-4">Registrar Pedido</h3>
          
          <form onSubmit={procesar}>
            {/* Nombre del Cliente */}
            <div className="mb-3">
              <label className="small fw-bold text-muted mb-1">Nombre</label>
              <input 
                type="text" 
                name="nombreCliente"
                className="form-control py-2" 
                placeholder="Nombre Cliente (Ej: Juan Carlos Perez)" 
                required 
                onInvalid={(e) => e.target.setCustomValidity("Por favor, rellena este campo.")}
                onInput={(e) => e.target.setCustomValidity("")}
              />
            </div>

            {/* Numero de la Venta */}
            <div className="mb-3">
              <label className="small fw-bold text-muted mb-1">Numero de Venta</label>
              <input 
                type="text" 
                name="NoVenta"
                className="form-control py-2" 
                placeholder="Código o Número de Venta" 
                required 
                onInvalid={(e) => e.target.setCustomValidity("Por favor, rellena este campo.")}
                onInput={(e) => e.target.setCustomValidity("")}
              />
            </div>

            {/* Especificaciones */}
            <div className="mb-3">
              <label className="small fw-bold text-muted mb-1">Especificaciones</label>
              <textarea 
                name="especificaciones"
                className="form-control py-2" 
                rows="3"
                placeholder="Especificaciones (Eje, Cilindro, Esfera, Adición)" 
                required 
                onInvalid={(e) => e.target.setCustomValidity("Por favor, rellena este campo.")}
                onInput={(e) => e.target.setCustomValidity("")}
              />
            </div>

            {/* Valor del pedido */}
            <div className="mb-4">
              <label className="small fw-bold text-muted mb-1">Valor Total</label>
              <input 
                type="number" 
                name="valorPedido"
                className="form-control py-2" 
                placeholder="Valor del Pedido al Proveedor ($)" 
                required 
                onInvalid={(e) => e.target.setCustomValidity("Por favor, rellena este campo.")}
                onInput={(e) => e.target.setCustomValidity("")}
              />
            </div>

            <button type="submit" className="btn btn-success w-100 fw-bold py-2 shadow-sm">
              Registrar Pedido
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

export default RegistrarPedido;