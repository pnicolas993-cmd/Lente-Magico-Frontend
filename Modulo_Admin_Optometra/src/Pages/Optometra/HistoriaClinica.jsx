import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../Styles/HistoriaClinica.css";


const PACIENTES_URL = "http://localhost:3000/pacientes";
const CONSULTAS_URL = "http://localhost:3000/consultas";

const URL_API = "http://localhost:3000/historia_clinica";

function HistoriaClinica() {
  const navigate = useNavigate();
  
  
  const [listaPacientes, setListaPacientes] = useState([]);
  const [idPacienteSeleccionado, setIdPacienteSeleccionado] = useState("");
  const [datosPaciente, setDatosPaciente] = useState(null);
  const [consultasPaciente, setConsultasPaciente] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  
  useEffect(() => {
    axios
      .get(PACIENTES_URL)
      .then((respuesta) => {
        const datos = respuesta.data;
        setListaPacientes(datos);
        
        if (datos.length > 0) {
          setIdPacienteSeleccionado(datos[0].id);
        }
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error al cargar pacientes:", err);
        setError("No se pudo conectar con el servidor de historias clínicas.");
        setCargando(false);
      });
  }, []);


  useEffect(() => {
    if (!idPacienteSeleccionado) return;

    
    axios
      .get(`${PACIENTES_URL}/${idPacienteSeleccionado}`)
      .then((resPaciente) => {
        const paciente = resPaciente.data;
        setDatosPaciente(paciente);

       
        return axios.get(URL_API).then((resConsultas) => {
          const todasLasConsultas = resConsultas.data;
          
         
          const filtradas = todasLasConsultas.filter(
            (c) => 
              (c.id_paciente && String(c.id_paciente) === String(paciente.id)) ||
              (c.paciente && String(c.paciente.cedula) === String(paciente.numeroDocumento))
          );
          setConsultasPaciente(filtradas);
        });
      })
      .catch((err) => {
        console.error("Error al obtener el historial clínico:", err);
      });
  }, [idPacienteSeleccionado]);

  if (cargando) {
    return <div className="container mt-4 text-center"><h5>Cargando historias clínicas...</h5></div>;
  }

  if (error) {
    return <div className="container mt-4 alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-4 mb-5">
      <h4>Historia clínica del paciente</h4>
      <p className="text-muted">
        Consulte los antecedentes y el historial de consultas registradas.
      </p>

     
      <div className="card shadow-sm mb-3">
        <div className="card-body">
          <div className="row g-2">
            <div className="col-md-8">
              <select
                className="form-select"
                value={idPacienteSeleccionado}
                onChange={(e) => setIdPacienteSeleccionado(e.target.value)}
              >
                {listaPacientes.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombre} - {p.numeroDocumento}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <button 
                className="btn btn-primary w-100" 
                type="button" 
                onClick={() => navigate("/optometra/generar-formula")}
              >
                Ir a Fórmula
              </button>
            </div>
          </div>
        </div>
      </div>

     
      {datosPaciente && (
        <div className="card shadow-sm">
          <div className="card-body p-4">
            <div className="seccion-form d-flex justify-content-between align-items-center">
              <h6 className="mb-0 fw-bold">Datos del Paciente</h6>
              <div className="text-end">
                <span className="ficha-dato">
                  N° Registro Sistema: <strong>P-00{datosPaciente.id}</strong>
                </span>
              </div>
            </div>

            <div className="row g-3 mb-2 mt-1">
              <div className="col-md-3">
                <span className="text-muted small">Nombre completo</span>
                <p className="mb-0 fw-bold">{datosPaciente.nombre}</p>
              </div>
              <div className="col-md-3">
                <span className="text-muted small">Documento</span>
                <p className="mb-0 fw-bold">{datosPaciente.tipoDocumento || "CC"} {datosPaciente.numeroDocumento}</p>
              </div>
              <div className="col-md-3">
                <span className="text-muted small">Teléfono</span>
                <p className="mb-0 fw-bold">{datosPaciente.telefono || "---"}</p>
              </div>
              <div className="col-md-3">
                <span className="text-muted small">Correo electrónico</span>
                <p className="mb-0 fw-bold">{datosPaciente.correo || "---"}</p>
              </div>
            </div>

            <div className="row g-3 mt-1">
              <div className="col-md-4">
                <span className="text-muted small">Enfermedades oculares previas</span>
                <p className="mb-0 fw-bold">{datosPaciente.enfermedadesPrevias || "Ninguna"}</p>
              </div>
              <div className="col-md-4">
                <span className="text-muted small">Uso de lentes previos</span>
                <p className="mb-0 fw-bold">{datosPaciente.usoLentesPrevios === "true" || datosPaciente.usoLentesPrevios === true ? "Sí" : "No"}</p>
              </div>
              <div className="col-md-4">
                <span className="text-muted small">Alergias conocidas</span>
                <p className="mb-0 fw-bold">{datosPaciente.alergias || "Ninguna"}</p>
              </div>
            </div>

            <div className="seccion-form mt-4">
              <h6 className="fw-bold">Historial de Consultas</h6>
            </div>

            
            {consultasPaciente.length > 0 ? (
              consultasPaciente.map((consulta, index) => (
                <div className="border-start border-primary border-3 ps-3 mb-4 py-1" key={consulta.id || index}>
                  <div className="d-flex justify-content-between">
                    <strong>Consulta N° {consulta.numeroConsulta || (index + 1)} - Fecha: {consulta.fechaConsulta}</strong>
                    <span className="badge bg-success align-self-start">
                      {consulta.resultadoExamen || "Fórmula registrada"}
                    </span>
                  </div>
                  <p className="mb-1 text-muted small">Motivo: {consulta.motivo}</p>
                  <p className="mb-1">Diagnóstico: <strong>{consulta.diagnostico}</strong></p>
                  <p className="mb-0 text-secondary small">
                    Antecedentes reportados en consulta: {consulta.antecedentes || "Ninguno"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-muted text-center my-4 py-2 border rounded bg-light">
                Este paciente no registra consultas anteriores en el sistema.
              </p>
            )}

            <div className="text-center mt-4">
              <button className="btn btn-outline-primary" onClick={() => navigate("/optometra/agregar-consulta")}>
                + Agregar nueva consulta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HistoriaClinica;
