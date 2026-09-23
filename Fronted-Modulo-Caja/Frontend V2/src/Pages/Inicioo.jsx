import React, { useEffect, useState } from "react";
import { apiFetch } from "../config/api";

export default function Inicioo() {

  const [datos, setDatos] = useState({
    clientesRegistrados: 0,
    ventasMes: 0,
    clientesProgramados: 0,
    ultimasVentas: []
  });

  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);


  // =====================================================
  // CARGAR INFORMACIÓN DEL DASHBOARD
  // =====================================================

  const cargarDashboard = async () => {

    try {

      setError(null);

      const data = await apiFetch("/inicioo");

      setDatos({
        clientesRegistrados:
          Number(data.clientesRegistrados || 0),

        ventasMes:
          Number(data.ventasMes || 0),

        clientesProgramados:
          Number(data.clientesProgramados || 0),

        ultimasVentas:
          data.ultimasVentas || []
      });

    } catch (err) {

      console.error(
        "Error cargando dashboard:",
        err
      );

      setError(err.message);

    } finally {

      setCargando(false);

    }

  };


  // =====================================================
  // CARGAR AL ENTRAR
  // =====================================================

  useEffect(() => {

    cargarDashboard();

  }, []);


  // =====================================================
  // FORMATO DE DINERO
  // =====================================================

  const formatoDinero = (valor) => {

    return Number(valor || 0).toLocaleString(
      "es-CO",
      {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0
      }
    );

  };


  // =====================================================
  // ESTADO DE LA VENTA
  // =====================================================

  const mostrarEstado = (estado) => {

    if (!estado) {
      return "Sin estado";
    }

    return estado;

  };


  return (

    <div className="container-fluid py-4">

      {/* ================================================= */}
      {/* TÍTULO */}
      {/* ================================================= */}

      <div className="text-center mb-4">

        <h1 className="fw-bold">
          Bienvenido al sistema Modulo Caja
        </h1>

        <p className="text-muted">
          Resumen General:
        </p>

      </div>


      {/* ================================================= */}
      {/* ERROR */}
      {/* ================================================= */}

      {error && (

        <div className="alert alert-danger">

          Error al cargar la información:

          <strong className="ms-1">
            {error}
          </strong>

        </div>

      )}


      {/* ================================================= */}
      {/* TARJETAS */}
      {/* ================================================= */}

      <div className="row g-3 mb-4">

        {/* CLIENTES */}

        <div className="col-md-4">

          <div
            className="card shadow-sm h-100"
            style={{
              borderLeft: "3px solid #0d6efd"
            }}
          >

            <div className="card-body text-center">

              <p className="mb-1">
                CLIENTES REGISTRADOS
              </p>

              <h2 className="fw-bold">

                {cargando
                  ? "..."
                  : datos.clientesRegistrados}

              </h2>

            </div>

          </div>

        </div>


        {/* VENTAS DEL MES */}

        <div className="col-md-4">

          <div
            className="card shadow-sm h-100"
            style={{
              borderLeft: "3px solid #198754"
            }}
          >

            <div className="card-body text-center">

              <p className="mb-1">
                VENTAS DEL MES
              </p>

              <h2 className="fw-bold">

                {cargando
                  ? "..."
                  : formatoDinero(
                      datos.ventasMes
                    )}

              </h2>

            </div>

          </div>

        </div>


        {/* CLIENTES PROGRAMADOS */}

        <div className="col-md-4">

          <div
            className="card shadow-sm h-100"
            style={{
              borderLeft: "3px solid #ffc107"
            }}
          >

            <div className="card-body text-center">

              <p className="mb-1">
                CLIENTES PROGRAMADOS
              </p>

              <h2 className="fw-bold">

                {cargando
                  ? "..."
                  : datos.clientesProgramados}

              </h2>

            </div>

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* ÚLTIMAS VENTAS */}
      {/* ================================================= */}

      <div className="card shadow-sm">

        <div className="card-body">

          <h5 className="fw-bold text-center mb-3">

            Últimas ventas registradas

          </h5>


          {cargando ? (

            <div className="text-center py-4">

              <div
                className="spinner-border text-primary"
                role="status"
              />

              <p className="text-muted mt-2">
                Cargando ventas...
              </p>

            </div>

          ) : datos.ultimasVentas.length === 0 ? (

            <div className="alert alert-info text-center">

              No hay ventas registradas.

            </div>

          ) : (

            <div className="table-responsive">

              <table className="table table-hover text-center">

                <thead>

                  <tr>

                    <th>
                      #Venta
                    </th>

                    <th>
                      Cliente
                    </th>

                    <th>
                      Fecha
                    </th>

                    <th>
                      Total
                    </th>

                    <th>
                      Estado
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {datos.ultimasVentas.map(
                    (venta) => (

                      <tr key={venta.idVenta}>

                        <td className="fw-bold">

                          #{venta.idVenta}

                        </td>

                        <td>

                          Cliente #{venta.idCliente}

                        </td>

                        <td>

                          {venta.fechaVenta
                            ? new Date(
                                venta.fechaVenta
                              ).toLocaleDateString(
                                "es-CO"
                              )
                            : "-"}

                        </td>

                        <td className="fw-bold">

                          {formatoDinero(
                            venta.total
                          )}

                        </td>

                        <td>

                          <span
                            className={
                              venta.estado === "Pagado"
                                ? "badge bg-success"
                                : "badge bg-secondary"
                            }
                          >

                            {mostrarEstado(
                              venta.estado
                            )}

                          </span>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </div>

  );

}