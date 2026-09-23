import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../config/api";

function ConsultarCliente() {
  const [busqueda, setBusqueda] = useState("");
  const [clientes, setClientes] = useState([]);
  const [buscado, setBuscado] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const manejarBusqueda = async (e) => {
    e.preventDefault();

    setCargando(true);
    setError(null);
    setBuscado(true);

    try {
      const data = await apiFetch(
        `/clientes?search=${encodeURIComponent(busqueda)}&limit=10`
      );

      setClientes(data.clientes || []);
    } catch (err) {
      console.error("Error al buscar clientes:", err);

      setError(err.message || "Error al consultar clientes");
      setClientes([]);
    } finally {
      setCargando(false);
    }
  };

  const seleccionarCliente = (cliente) => {
    sessionStorage.setItem(
      "clienteSeleccionado",
      JSON.stringify(cliente)
    );

    navigate("/confirmar-venta");
  };

  return (
    <div className="container py-4">

      {/* TÍTULO */}
      <h3 className="fw-bold text-primary mb-3">
        Consultar Cliente
      </h3>

      {/* BUSCADOR */}
      <form
        onSubmit={manejarBusqueda}
        className="d-flex gap-2 mb-4"
      >
        <input
          type="text"
          className="form-control"
          placeholder="Documento, nombre, apellido o correo..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <button
          type="submit"
          className="btn btn-primary"
          disabled={cargando}
        >
          {cargando ? "Buscando..." : "Buscar"}
        </button>
      </form>

      {/* ERROR */}
      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {/* SIN RESULTADOS */}
      {buscado &&
        !cargando &&
        clientes.length === 0 &&
        !error && (
          <div className="alert alert-warning d-flex justify-content-between align-items-center">

            <span>
              No se encontraron clientes con ese criterio.
            </span>

            <button
              type="button"
              className="btn btn-sm btn-success"
              onClick={() => navigate("/registrar-cliente")}
            >
              + Registrar nuevo cliente
            </button>

          </div>
        )}

      {/* TABLA DE CLIENTES */}
      {clientes.length > 0 && (
        <div className="table-responsive shadow-sm rounded">

          <table className="table table-striped table-hover align-middle mb-0 bg-white">

            <thead className="table-primary">
              <tr>
                <th>Documento</th>
                <th>Nombre completo</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>

              {clientes.map((c) => (
                <tr key={c.id_cliente}>

                  {/* DOCUMENTO */}
                  <td>
                    {c.sigla || ""}{" "}
                    {c.numero_documento}
                  </td>

                  {/* NOMBRE */}
                  <td>
                    {c.primer_nombre || ""}{" "}
                    {c.segundo_nombre || ""}{" "}
                    {c.primer_apellido || ""}{" "}
                    {c.segundo_apellido || ""}
                  </td>

                  {/* CORREO */}
                  <td>
                    {c.correo || "-"}
                  </td>

                  {/* TELÉFONO */}
                  <td>
                    {c.telefono || "-"}
                  </td>

                  {/* ACCIÓN */}
                  <td>
                    <button
                      type="button"
                      className="btn btn-sm btn-primary"
                      onClick={() => seleccionarCliente(c)}
                    >
                      Vender a este cliente
                    </button>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}

export default ConsultarCliente;
