import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/log_errores";

function LogErrores() {
  const [errores, setErrores] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const [busqueda, setBusqueda] = useState("");
  const [filtroNivel, setFiltroNivel] = useState("Todos");

  useEffect(() => {
    cargarErrores();
  }, []);

  function cargarErrores() {
    setCargando(true);
    axios
      .get(API_URL)
      .then((respuesta) => {
        setErrores(respuesta.data);
        setError("");
      })
      .catch((err) => {
        setError("No se pudieron cargar los errores. ¿Está corriendo json-server?");
        console.error(err);
      })
      .finally(() => setCargando(false));
  }

  function colorBadge(nivel) {
    if (nivel === "Crítico") return "badge text-bg-danger";
    if (nivel === "Advertencia") return "badge text-bg-warning";
    return "badge text-bg-secondary";
  }

  const erroresFiltrados = errores.filter((e) => {
    const coincideTexto =
      e.nombre_usuario.toLowerCase().includes(busqueda.toLowerCase()) ||
      e.mensaje_error.toLowerCase().includes(busqueda.toLowerCase());
    const coincideNivel = filtroNivel === "Todos" || e.nivel_error === filtroNivel;
    return coincideTexto && coincideNivel;
  });

  return (
    <div className="container mt-4">
      <div className="mb-3">
        <h3 className="mb-0">Log de errores</h3>
        <p className="text-muted mb-0">
          Registro automático de errores generados por el sistema
        </p>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Buscador y filtro */}
      <div className="row mb-3 g-2">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por usuario o mensaje"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={filtroNivel}
            onChange={(e) => setFiltroNivel(e.target.value)}
          >
            <option value="Todos">Todos los niveles</option>
            <option value="Crítico">Crítico</option>
            <option value="Advertencia">Advertencia</option>
            <option value="Info">Info</option>
          </select>
        </div>
      </div>

      {cargando ? (
        <p className="text-muted">Cargando registros...</p>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Nivel</th>
                  <th>Usuario</th>
                  <th>Mensaje</th>
                  <th>Fecha y hora</th>
                </tr>
              </thead>
              <tbody>
                {erroresFiltrados.map((e) => (
                  <tr key={e.id}>
                    <td>
                      <span className={colorBadge(e.nivel_error)}>{e.nivel_error}</span>
                    </td>
                    <td>{e.nombre_usuario}</td>
                    <td>{e.mensaje_error}</td>
                    <td>{e.fecha_hora}</td>
                  </tr>
                ))}

                {erroresFiltrados.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center text-muted py-3">
                      No se encontraron registros de error
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <p className="text-muted">
            {erroresFiltrados.length} registro(s) encontrados
          </p>
        </>
      )}
    </div>
  );
}

export default LogErrores;
