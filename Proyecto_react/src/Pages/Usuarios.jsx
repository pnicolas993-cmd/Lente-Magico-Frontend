import { useState, useEffect } from "react";
import axios from "axios";

const URL_USUARIOS = "http://localhost:3000/usuarios";
const URL_AUTORIZACIONES = "http://localhost:3000/autorizaciones";
const URL_AUTORIZACION_USUARIO = "http://localhost:3000/autorizacion_usuario";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [autorizaciones, setAutorizaciones] = useState([]);
  const [asignaciones, setAsignaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [filtroRol, setFiltroRol] = useState("Todos");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [nombreUsuarioForm, setNombreUsuarioForm] = useState("");
  const [contrasenaForm, setContrasenaForm] = useState("");
  const [correoForm, setCorreoForm] = useState("");
  const [estadoForm, setEstadoForm] = useState(true); 
  const [idAutorizacionForm, setIdAutorizacionForm] = useState("");

  useEffect(() => {
    cargarTodo();
  }, []);

  function cargarTodo() {
    setCargando(true);
    Promise.all([
      axios.get(URL_USUARIOS),
      axios.get(URL_AUTORIZACIONES),
      axios.get(URL_AUTORIZACION_USUARIO),
    ])
      .then(([respUsuarios, respAutorizaciones, respAsignaciones]) => {
        setUsuarios(respUsuarios.data);
        setAutorizaciones(respAutorizaciones.data);
        setAsignaciones(respAsignaciones.data);
        setError("");
        if (respAutorizaciones.data.length > 0) {
          setIdAutorizacionForm(String(respAutorizaciones.data[0].id));
        }
      })
      .catch((err) => {
        setError("No se pudieron cargar los datos. ¿Está corriendo el backend personalizado?");
        console.error(err);
      })
      .finally(() => setCargando(false));
  }

  function obtenerNombreRol(idUsuario) {
    const asignacion = asignaciones.find((a) => String(a.id_sistema_usuario) === String(idUsuario));
    if (!asignacion) return "Sin rol asignado";
    const autorizacion = autorizaciones.find((a) => String(a.id) === String(asignacion.id_autorizacion));
    return autorizacion ? autorizacion.nombre : "Sin rol asignado";
  }

  function abrirFormularioNuevo() {
    setUsuarioEditando(null);
    setNombreUsuarioForm("");
    setContrasenaForm("");
    setCorreoForm("");
    setEstadoForm(true);
    setIdAutorizacionForm(autorizaciones[0]?.id ? String(autorizaciones[0].id) : "");
    setMostrarFormulario(true);
  }

  function abrirFormularioEditar(usuario) {
    const asignacion = asignaciones.find((a) => String(a.id_sistema_usuario) === String(usuario.id));
    setUsuarioEditando(usuario);
    setNombreUsuarioForm(usuario.login); 
    setContrasenaForm(""); // Vacío por seguridad. Si no escribe nada, no se cambia.
    setCorreoForm(usuario.correo);
    setEstadoForm(usuario.activar_usuario); 
    setIdAutorizacionForm(asignacion ? String(asignacion.id_autorizacion) : String(autorizaciones[0]?.id || ""));
    setMostrarFormulario(true);
  }

  function guardarUsuario(e) {
    e.preventDefault();
    if (nombreUsuarioForm.trim() === "" || correoForm.trim() === "") {
      alert("El nombre de usuario y el correo son obligatorios");
      return;
    }

    const datosUsuario = {
      login: nombreUsuarioForm,
      // Si se escribe en el input se manda plano al backend, si no se mantiene la contraseña previa
      password: contrasenaForm.trim() !== "" 
        ? contrasenaForm 
        : (usuarioEditando ? (usuarioEditando.password || usuarioEditando.contraseña) : ""),
      correo: correoForm,
      activar_usuario: estadoForm,
      clave_idioma: "es",
      clave_activacion: usuarioEditando ? usuarioEditando.clave_activacion : "ACT-USER",
      llave_reinicio: null,
      hora_reinicio: null,
    };

    if (usuarioEditando) {
      axios
        .put(`${URL_USUARIOS}/${usuarioEditando.id}`, datosUsuario) 
        .then(() => {
          const asignacionExistente = asignaciones.find(
            (a) => String(a.id_sistema_usuario) === String(usuarioEditando.id)
          );
          if (asignacionExistente) {
            return axios.put(`${URL_AUTORIZACION_USUARIO}/${asignacionExistente.id}`, {
              id: asignacionExistente.id,
              id_autorizacion: Number(idAutorizacionForm),
              id_sistema_usuario: String(usuarioEditando.id),
            });
          } else {
            const maxIdAsig = asignaciones.length > 0
              ? Math.max(...asignaciones.map(a => Number(a.id || 0)))
              : 0;
            return axios.post(URL_AUTORIZACION_USUARIO, {
              id: String(maxIdAsig + 1),
              id_autorizacion: Number(idAutorizacionForm),
              id_sistema_usuario: String(usuarioEditando.id),
            });
          }
        })
        .then(() => {
          cargarTodo();
          setMostrarFormulario(false);
        })
        .catch((err) => {
          alert("Error al editar el usuario");
          console.error(err);
        });
    } else {
      if (contrasenaForm.trim() === "") {
        alert("La contraseña es obligatoria para un usuario nuevo");
        return;
      }

      const maxId = usuarios.length > 0
        ? Math.max(...usuarios.map(u => Number(u.id || 0)))
        : 0;
      
      const nuevoIdUsuario = String(maxId + 1);

      axios
        .post(URL_USUARIOS, { ...datosUsuario, id: nuevoIdUsuario })
        .then((respuesta) => {
          const usuarioCreado = respuesta.data;
          
          const maxIdAsig = asignaciones.length > 0
            ? Math.max(...asignaciones.map(a => Number(a.id || 0)))
            : 0;

          return axios.post(URL_AUTORIZACION_USUARIO, {
            id: String(maxIdAsig + 1),
            id_autorizacion: Number(idAutorizacionForm),
            id_sistema_usuario: String(usuarioCreado.id),
          });
        })
        .then(() => {
          cargarTodo();
          setMostrarFormulario(false);
        })
        .catch((err) => {
          alert("Error al crear el usuario");
          console.error(err);
        });
    }
  }

  function eliminarUsuario(id) {
    const confirmar = window.confirm("¿Seguro que quieres eliminar este usuario?");
    if (!confirmar) return;

    const asignacionExistente = asignaciones.find(
      (a) => String(a.id_sistema_usuario) === String(id)
    );

    const limpiarAsignacion = asignacionExistente
      ? axios.delete(`${URL_AUTORIZACION_USUARIO}/${asignacionExistente.id}`)
      : Promise.resolve();

    limpiarAsignacion
      .then(() => axios.delete(`${URL_USUARIOS}/${id}`))
      .then(() => {
        cargarTodo();
      })
      .catch((err) => {
        alert("Error al eliminar el usuario");
        console.error(err);
      });
  }

  const usuariosFiltrados = usuarios.filter((u) => {
    const nombreValido = u.login ? u.login.toLowerCase() : "";
    const correoValido = u.correo ? u.correo.toLowerCase() : "";
    const coincideTexto =
      nombreValido.includes(busqueda.toLowerCase()) ||
      correoValido.includes(busqueda.toLowerCase());
    const rolUsuario = obtenerNombreRol(u.id);
    const coincideRol = filtroRol === "Todos" || rolUsuario === filtroRol;
    return coincideTexto && coincideRol;
  });

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h3 className="mb-0">Usuarios</h3>
          <p className="text-muted mb-0">Consulta, agrega, edita y elimina usuarios del sistema</p>
        </div>
        <button className="btn btn-primary" onClick={abrirFormularioNuevo}>
          + Nuevo usuario
        </button>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row mb-3 g-2">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por usuario o correo"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={filtroRol}
            onChange={(e) => setFiltroRol(e.target.value)}
          >
            <option value="Todos">Todos los roles</option>
            {autorizaciones.map((a) => (
              <option key={a.id} value={a.nombre}>
                {a.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>
      {mostrarFormulario && (
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">
              {usuarioEditando ? "Editar usuario" : "Nuevo usuario"}
            </h5>
            <form onSubmit={guardarUsuario}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Nombre de usuario</label>
                  <input
                    type="text"
                    className="form-control"
                    value={nombreUsuarioForm}
                    onChange={(e) => setNombreUsuarioForm(e.target.value)}
                    placeholder="Ej: admin"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Contraseña {usuarioEditando && <span className="text-muted" style={{fontSize: "0.75rem"}}>(dejar vacío para no cambiar)</span>}
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    value={contrasenaForm}
                    onChange={(e) => setContrasenaForm(e.target.value)}
                    placeholder="Contraseña"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Correo</label>
                  <input
                    type="email"
                    className="form-control"
                    value={correoForm}
                    onChange={(e) => setCorreoForm(e.target.value)}
                    placeholder="Ej: nombre@mail.com"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Rol</label>
                  <select
                    className="form-select"
                    value={idAutorizacionForm}
                    onChange={(e) => setIdAutorizacionForm(e.target.value)}
                  >
                    {autorizaciones.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Estado</label>
                <select
                  className="form-select"
                  value={estadoForm ? "Activo" : "Inactivo"}
                  onChange={(e) => setEstadoForm(e.target.value === "Activo")}
                >
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
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
        <p className="text-muted">Cargando usuarios...</p>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Usuario</th>
                  <th>Correo</th>
                  <th>Rol</th>
                  <th>Estado</th>
                  <th className="text-end">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuariosFiltrados.map((u) => (
                  <tr key={u.id}>
                    <td>{u.login}</td>
                    <td>{u.correo}</td>
                    <td>{obtenerNombreRol(u.id)}</td>
                    <td>
                      <span
                        className={
                          u.activar_usuario
                            ? "badge text-bg-success"
                            : "badge text-bg-danger"
                        }
                      >
                        {u.activar_usuario ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="text-end">
                      <button
                        className="btn btn-sm btn-outline-secondary me-2"
                        onClick={() => abrirFormularioEditar(u)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => eliminarUsuario(u.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
                {usuariosFiltrados.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-3">
                      No se encontraron usuarios
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <p className="text-muted">
            {usuariosFiltrados.length} usuario(s) encontrados
          </p>
        </>
      )}
    </div>
  );
}

export default Usuarios;