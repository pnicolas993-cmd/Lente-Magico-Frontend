import React, { useState } from "react";
import { Form } from "react-bootstrap";

function FormasPago() {
  const [metodo, setMetodo] = useState("");

  return (
    <div className="card" style={{ maxWidth: "400px" }}>
      <h5>Selección de Formas de Pago</h5>
      <Form.Select className="mt-2" value={metodo} onChange={(e) => {
        setMetodo(e.target.value);
        alert(`Simulación: Forma de pago elegida: ${e.target.value}`);
      }}>
        <option value="">-- Elija una opción --</option>
        <option value="EFECTIVO">Efectivo Físico</option>
        <option value="TARJETA_CREDITO">Tarjeta de Crédito</option>
        <option value="TARJETA_DEBITO">Tarjeta Débito (Datáfono)</option>
        <option value="PLATAFORMA">Plataforma Móvil (Nequi/Daviplata)</option>
      </Form.Select>
    </div>
  );
}

export default FormasPago;
