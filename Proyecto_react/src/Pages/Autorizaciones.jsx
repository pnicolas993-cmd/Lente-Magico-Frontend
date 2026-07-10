import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/autorizaciones";

function Autorizaciones() {
  const [autorizaciones, setAutorizaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const [busqueda, setBusqueda] = useState("");

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [autorizacionEditando, setAutorizacionEditando] = useState(null);
  const [nombreForm, setNombreForm] = useState("");

 
  useEffect(() => {
    cargarAutorizaciones();
  }, []);

  function cargarAutorizaciones() {
    setCargando(true);
    axios
      .get(API_URL)
      .then((respuesta) => {
        setAutorizaciones(respuesta.data);
        setError("");
      })
      .catch((err) => {
        setError("No se pudieron cargar las autorizaciones. ¿Está corriendo json-server?");
        console.error(err);
      })
      .finally(() => setCargando(false));
  }

  function abrirFormularioNuevo() {
    setAutorizacionEditando(null);
    setNombreForm("");
    setMostrarFormulario(true);
  }

  function abrirFormularioEditar(autorizacion) {
    setAutorizacionEditando(autorizacion);
    setNombreForm(autorizacion.nombre);
    setMostrarFormulario(true);
  }

  function guardarAutorizacion(e) {
    e.preventDefault();

    if (nombreForm.trim() === "") {
      alert("El nombre de la autorización es obligatorio");
      return;
    }

    if (autorizacionEditando) {
   
      axios
        .put(`${API_URL}/${autorizacionEditando.id}`, {
         
          nombre: nombreForm,
        })
        .then(() => {
          cargarAutorizaciones();
          setMostrarFormulario(false);
        })
        .catch((err) => {
          alert("Error al editar la autorización");
          console.error(err);
        });
    } else {
      
      axios
        .post(API_URL, { nombre: nombreForm })
        .then(() => {
          cargarAutorizaciones();
          setMostrarFormulario(false);
        })
        .catch((err) => {
          alert("Error al crear la autorización");
          console.error(err);
        });
    }
  }

  function eliminarAutorizacion(id) {
    const confirmar = window.confirm("¿Seguro que quieres eliminar esta autorización?");
    if (!confirmar) return;

    axios
      .delete(`${API_URL}/${id}`)
      .then(() => cargarAutorizaciones())
      .catch((err) => {
        alert("Error al eliminar la autorización");
        console.error(err);
      });
  }

  const autorizacionesFiltradas = autorizaciones.filter((a) =>
    a.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h3 className="mb-0">Autorizaciones</h3>
          <p className="text-muted mb-0">Roles disponibles en el sistema</p>
        </div>
        <button className="btn btn-primary" onClick={abrirFormularioNuevo}>
          + Nueva autorización
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row mb-3 g-2">
        <div className="col-md-12">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar autorización"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>

      {mostrarFormulario && (
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">
              {autorizacionEditando ? "Editar autorización" : "Nueva autorización"}
            </h5>
            <form onSubmit={guardarAutorizacion}>
              <div className="mb-3">
                <label className="form-label">Nombre de la autorización</label>
                <input
                  type="text"
                  className="form-control"
                  value={nombreForm}
                  onChange={(e) => setNombreForm(e.target.value)}
                  placeholder="Ej: Administrador"
                />
              </div>

              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">
                  Guardar
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setMostrarFormulario(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {cargando ? (
        <p className="text-muted">Cargando autorizaciones...</p>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Id</th>
                  <th>Nombre de la autorización</th>
                  <th className="text-end">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {autorizacionesFiltradas.map((a) => (
                  <tr key={a.id}>
                    <td>{a.id}</td>
                    <td>{a.nombre}</td>
                    <td className="text-end">
                      <button
                        className="btn btn-sm btn-outline-secondary me-2"
                        onClick={() => abrirFormularioEditar(a)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => eliminarAutorizacion(a.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}

                {autorizacionesFiltradas.length === 0 && (
                  <tr>
                    <td colSpan="3" className="text-center text-muted py-3">
                      No se encontraron autorizaciones
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <p className="text-muted">
            {autorizacionesFiltradas.length} autorización(es) encontradas
          </p>
        </>
      )}
    </div>
  );
}

export default Autorizaciones;
