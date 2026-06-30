import React from "react";

function Inicioo() {
  return (
    <div className="p-2 text-dark">
        <div className="mb-4">
            <h2 className="fw-bold text-dark m-0">Bienvenido al sistema Modulo Caja</h2>
            <p className="text-muted small">Resumen General:</p>
        </div>

        <div className="row g-3 mb-4">
            <div className="col-12 col-sm-6 col-md-3">
                <div className="p-3 bg-white border-start border-primary border-4 rounded shadow-sm">
                    <small className="text-muted d-block fw-semibold text-uppercase">Clientes registrados</small>
                    <span className="fs-3 fw-bold text-dark">100</span>
                </div>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
                <div className="p-3 bg-white border-start border-success border-4 rounded shadow-sm">
                    <small className="text-muted d-block fw-semibold text-uppercase">Ventas del mes</small>
                    <span className="fs-3 fw-bold text-dark">$3.200.000</span>
                </div>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
                <div className="p-3 bg-white border-start border-warning border-4 rounded shadow-sm">
                    <small className="text-muted d-block fw-semibold text-uppercase">Clientes Programados</small>
                    <span className="fs-3 fw-bold text-dark">12</span>
                </div>
            </div>
        
        </div>

        <div className="bg-white border rounded shadow-sm p-3">
            <h6 className="fw-bold border-bottom pb-2 mb-3">Últimas ventas registradas</h6>
            <div className="table-responsive">
                <table className="table table-hover align-middle mb-0 small">
                    <thead className="table-light text-muted">
                        <tr>
                            <th>#Venta</th>
                            <th>Cliente</th>
                            <th>Total</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="fw-bold">C-0010</td>
                            <td>Ximena Avila</td>
                            <td>$180.000</td>
                            <td><span className="badge bg-success-subtle text-success border border-success-subtle px-2">Pagado</span></td>
                        </tr>
                        <tr>
                            <td className="fw-bold">V-0011</td>
                            <td>Juan Toquica</td>
                            <td>$95.000</td>
                            <td><span className="badge bg-success-subtle text-success border border-success-subtle px-2">Pagado</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
}

export default Inicioo;