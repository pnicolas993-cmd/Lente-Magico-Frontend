import React from "react";
import { Table } from "react-bootstrap";

function VisualizarVenta() {
  const historialLocal = [
    { id: 1, fecha: "24/06/2026", total: 350000, cliente: "Nicol Guerrero" },
    { id: 2, fecha: "24/06/2026", total: 180000, cliente: "Estefania Avila" }
  ];

  return (
    <div className="card">
      <h5>Historial de Ventas</h5>
      <Table striped bordered hover variant="dark" className="mt-2 small">
        <thead>
          <tr>
            <th>Factura</th>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {historialLocal.map(v => (
            <tr key={v.id}>
              <td>#00{v.id}</td>
              <td>{v.cliente}</td>
              <td>{v.fecha}</td>
              <td>${v.total.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default VisualizarVenta;