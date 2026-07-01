import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function DashboardAdmin() {
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [errores, setErrores] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Peticiones paralelas utilizando los nombres exactos de tus colecciones
    Promise.all([
      axios.get("http://localhost:3000/usuarios").catch(() => ({ data: [] })),
      axios.get("http://localhost:3000/autorizaciones").catch(() => ({ data: [] })),
      axios.get("http://localhost:3000/log_errores").catch(() => ({ data: [] }))
    ])
      .then(([resUsuarios, resRoles, resErrores]) => {
        setUsuarios(resUsuarios.data);
        setRoles(resRoles.data);
        setErrores(resErrores.data);
      })
      .catch((err) => console.error("Error al sincronizar el panel:", err))
      .finally(() => setCargando(false));
  }, []);

  // Cálculos dinámicos basados en tu JSON real
  const totalUsuarios = usuarios.length;
  const totalRoles = roles.length;
  const totalLogs = errores.length;
  
  // Cuenta cuántos errores contienen la palabra "critico" o "alta" en su estructura (si aplica)
  const erroresCriticos = errores.filter(
    (e) => e.nivel?.toLowerCase() === "critico" || e.gravedad?.toLowerCase() === "alta"
  ).length;

  // Tomamos los últimos 3 usuarios registrados invirtiendo el arreglo original
  const ultimosUsuarios = usuarios.slice().reverse().slice(0, 3);

  if (cargando) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="text-muted mt-2">Cargando métricas de Lente Mágico...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Encabezado */}
      <div className="mb-4">
        <h3 className="fw-bold mb-0">Bienvenido al Módulo de Administrador</h3>
        <p className="text-muted mb-0">
          Este es tu panel de control. Aquí puedes gestionar accesos, roles de usuario y auditar los registros del sistema.
        </p>
      </div>

      {/* Tarjetas Informativas */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card h-100 border-0 shadow-sm border-start border-primary border-4 py-2">
            <div className="card-body">
              <h6 className="text-muted fw-normal mb-1">Usuarios registrados</h6>
              <h2 className="fw-bold mb-0">{totalUsuarios}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card h-100 border-0 shadow-sm border-start border-success border-4 py-2">
            <div className="card-body">
              <h6 className="text-muted fw-normal mb-1">Roles disponibles</h6>
              <h2 className="fw-bold mb-0">{totalRoles}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card h-100 border-0 shadow-sm border-start border-danger border-4 py-2">
            <div className="card-body">
              <h6 className="text-muted fw-normal mb-1">Errores críticos hoy</h6>
              <h2 className="fw-bold mb-0">{erroresCriticos}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card h-100 border-0 shadow-sm border-start border-warning border-4 py-2">
            <div className="card-body">
              <h6 className="text-muted fw-normal mb-1">Logs del sistema</h6>
              <h2 className="fw-bold mb-0">{totalLogs}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Acciones Rápidas */}
      <h5 className="fw-bold mb-3">Acciones rápidas</h5>
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <Link to="/usuarios" className="text-decoration-none text-dark">
            <div className="card h-100 border-0 shadow-sm py-2">
              <div className="card-body">
                <h6 className="fw-bold mb-1">Gestionar Usuarios</h6>
                <p className="text-muted small mb-0">Crear, editar o desactivar cuentas de acceso</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-4">
          <Link to="/autorizaciones" className="text-decoration-none text-dark">
            <div className="card h-100 border-0 shadow-sm py-2">
              <div className="card-body">
                <h6 className="fw-bold mb-1">Configurar Roles</h6>
                <p className="text-muted small mb-0">Administrar permisos y autorizaciones</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-4">
          <Link to="/log-errores" className="text-decoration-none text-dark">
            <div className="card h-100 border-0 shadow-sm py-2">
              <div className="card-body">
                <h6 className="fw-bold mb-1">Log de Errores</h6>
                <p className="text-muted small mb-0">Consultar antecedentes y fallos del sistema</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Tabla Dinámica Reciente */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header bg-white py-3 border-0">
          <h5 className="fw-bold mb-0">Últimos usuarios registrados</h5>
        </div>
        <div className="table-responsive px-3">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>#ID</th>
                <th>Usuario</th>
                <th>Correo</th>
                <th>Estado</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ultimosUsuarios.map((u) => (
                <tr key={u.id}>
                  <td>U-{u.id}</td>
                  <td className="fw-medium">{u.login || "Sin login registrado"}</td>
                  <td>{u.correo || "Sin correo"}</td>
                  <td>
                    <span className={`badge ${u.activar_usuario ? "text-bg-success" : "text-bg-secondary"}`}>
                      {u.activar_usuario ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="text-end">
                    <Link to="/usuarios" className="btn btn-sm btn-outline-primary">Ver panel</Link>
                  </td>
                </tr>
              ))}
              {ultimosUsuarios.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-3">
                    No se encontraron registros de usuarios en el servidor.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardAdmin;