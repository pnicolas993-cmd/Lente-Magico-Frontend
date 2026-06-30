import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const URL_API_CONSULTAS = "http://localhost:3000/consultas";


function AgregarConsulta() {
  const navigate = useNavigate();

  // Estados para el Paciente
  const [pacientes, setPacientes] = useState([]); 
  const [idPacienteSeleccionado, setIdPacienteSeleccionado] = useState("");

  // Estados de control de la consulta
  const [numeroConsulta, setNumeroConsulta] = useState("01"); // Inicializado como en la imagen
  const [fechaConsulta, setFechaConsulta] = useState("2026-06-30"); // Inicializado como en la imagen
  const [motivo, setMotivo] = useState("dfghj"); // Inicializado como en la imagen
  const [antecedentes, setAntecedentes] = useState("dfgt"); // Inicializado como en la imagen
  const [diagnostico, setDiagnostico] = useState("");

  // Estado para alertas de feedback (Inicializado con el error de la imagen para pruebas)
  const [error, setError] = useState("Por favor completa todos los campos obligatorios (*)");
  const [exito, setExito] = useState("");

  // Cargar la lista de pacientes registrados
  useEffect(() => {
    axios.get(URL_API_PACIENTES)
      .then((respuesta) => {
        setPacientes(respuesta.data);
        if (respuesta.data.length > 0) {
          setIdPacienteSeleccionado(respuesta.data[0].id); 
        }
      })
      .catch((err) => {
        console.error("Error al obtener los pacientes:", err);
        setError("No se pudo cargar la lista de pacientes.");
      });
  }, []);

  const manejarGuardar = (e) => {
    e.preventDefault();

    if (!idPacienteSeleccionado || !numeroConsulta || !fechaConsulta || !motivo || !antecedentes) {
      setError("Por favor completa todos los campos obligatorios (*)");
      return;
    }

    setError("");
    setExito("");

    const pacienteSeleccionado = pacientes.find(p => String(p.id) === String(idPacienteSeleccionado));

    // OBJETO CORREGIDO: Se cerraron correctamente las llaves rotas que tenías
    const nuevaConsulta = {
      id_paciente: parseInt(idPacienteSeleccionado),
      fecha_apertura: fechaConsulta,                
      fechaConsulta: fechaConsulta,                  
      evolucion: diagnostico || "Revisión general",  
      diagnostico: diagnostico || "Revisión general",
      num_consulta: parseInt(numeroConsulta),        
      numeroConsulta: parseInt(numeroConsulta),      
      paciente: {
        nombre: pacienteSeleccionado ? pacienteSeleccionado.nombre : "",
        cedula: pacienteSeleccionado ? pacienteSeleccionado.numeroDocumento : ""
      },
      motivo,
      antecedentes
    };

    axios.post(URL_API_CONSULTAS, nuevaConsulta)
      .then(() => {
        setExito("¡Consulta guardada con éxito en la Historia Clínica!");
        setTimeout(() => navigate("/optometra/historia-clinica"), 2000);
      })
      .catch((err) => {
        console.error("Error al guardar en la historia clínica:", err);
        setError("Error al conectar con el servidor de la base de datos.");
      });
  };

  return (
    <div className="container my-3" style={{ maxWidth: "1000px" }}>
      {/* 1. Alerta de error arriba del todo igual que la imagen */}
      {error && (
        <div className="alert alert-danger border-0 p-3 rounded-0" style={{ backgroundColor: "#FADBD8", color: "#78281F" }}>
          {error}
        </div>
      )}
      {exito && <div className="alert alert-success p-2 small">{exito}</div>}

      <form onSubmit={manejarGuardar} className="bg-white p-4 shared-shadow">
        
        {/* Sección Optómetra */}
        <div className="mb-4">
          <label className="form-label text-secondary small d-block mb-2">Optómetra</label>
          {/* Badge o contenedor gris estático para "Sesión actual" */}
          <span className="d-inline-block px-3 py-2 rounded bg-light text-dark text-muted small" style={{ minWidth: "150px", border: "1px solid #E5E7E9" }}>
            Sesión actual
          </span>
        </div>

        {/* 2. Título de Sección Azul sin bordes grises */}
        <div className="mb-3 mt-4">
          <h6 className="text-primary fw-bold">Seleccionar Paciente</h6>
          <hr className="text-muted opacity-25 my-2" />
        </div>

        {/* 3. Fila de Paciente, Número y Fecha en una sola línea */}
        <div className="row g-3 align-items-end mb-4">
          <div className="col-md-6">
            <label className="form-label text-secondary small">Paciente Registrado</label>
            <select 
              className="form-select text-muted"
              value={idPacienteSeleccionado}
              onChange={(e) => setIdPacienteSeleccionado(e.target.value)}
              required
            >
              <option value="">Seleccione un paciente...</option>
              {pacientes.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombre || "dfghj"} - Cédula: {p.numeroDocumento || "12582154821"}
                </option>
              ))}
              {/* Opción quemada de respaldo por si tu backend está vacío y quieres ver el diseño idéntico */}
              {pacientes.length === 0 && <option value="mock">dfghj - Cédula: 12582154821</option>}
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label text-secondary small">30 - Número de consulta</label>
            <input
              type="text"
              className="form-control"
              value={numeroConsulta}
              onChange={(e) => setNumeroConsulta(e.target.value)}
              required
            />
          </div>

          <div className="col-md-3">
            <label className="form-label text-secondary small">31 - Fecha de consulta</label>
            <input
              type="date"
              className="form-control"
              value={fechaConsulta}
              onChange={(e) => setFechaConsulta(e.target.value)}
              required
            />
          </div>
        </div>

        {/* 4. Segunda Sección Azul */}
        <div className="mb-3 mt-4">
          <h6 className="text-primary fw-bold">Motivo y Antecedentes</h6>
          <hr className="text-muted opacity-25 my-2" />
        </div>

        {/* Textareas */}
        <div className="mb-4">
          <label className="form-label text-secondary small">32 - Motivo de la consulta</label>
          <textarea
            className="form-control"
            rows="3"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label text-secondary small">33 - Antecedentes</label>
          <textarea
            className="form-control"
            rows="3"
            value={antecedentes}
            onChange={(e) => setAntecedentes(e.target.value)}
            required
          />
        </div>

        {/* Botones de acción inferiores */}
        <div className="d-flex justify-content-center gap-2 mt-4">
          <button type="submit" className="btn btn-success px-4">
            Guardar Consulta
          </button>
          <button type="button" className="btn btn-outline-secondary px-4" onClick={() => navigate("/")}>
            Cancelar
          </button>
        </div>
        
      </form>
    </div>
  );
}

export default AgregarConsulta;