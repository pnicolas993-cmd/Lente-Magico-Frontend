import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../Styles/GenerarFormula.css";

function GenerarFormula() {
  const [paciente, setPaciente] = useState("");
  const [documento, setDocumento] = useState("");
  const [numeroConsulta, setNumeroConsulta] = useState("");
  const [diagnostico, setDiagnostico] = useState("");
  const [recomendaciones, setRecomendaciones] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [tipoLente, setTipoLente] = useState("");
  const [uso, setUso] = useState("");
  const [fechaGeneracion, setFechaGeneracion] = useState("");

  
  const [esferaOD, setEsferaOD] = useState("");
  const [esferaOI, setEsferaOI] = useState("");
  const [cilindroOD, setCilindroOD] = useState("");
  const [cilindroOI, setCilindroOI] = useState("");
  const [ejeOD, setEjeOD] = useState("");
  const [ejeOI, setEjeOI] = useState("");

  
  const [resultadoExamen, setResultadoExamen] = useState("");

  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  const navigate = useNavigate();

  const manejarGenerar = (e) => {
    e.preventDefault();

    if (!paciente || !numeroConsulta || !recomendaciones || !tipoLente || !uso || !fechaGeneracion) {
      setError("Por favor completa todos los campos obligatorios (*)");
      return;
    }

    setError("");
    setExito("");

    const nuevaFormula = {
      id_consulta: numeroConsulta,
      paciente,
      documento,
      diagnostico,
      esfera_od: esferaOD,
      esfera_oi: esferaOI,
      cilindro_od: cilindroOD,
      cilindro_oi: cilindroOI,
      eje_od: ejeOD,
      eje_oi: ejeOI,
      recomendaciones,
      observaciones,
      resultado_examen: resultadoExamen, 
      tipo_lente: tipoLente,
      uso,
      fecha_generacion: fechaGeneracion,
    };

    axios
      .post("http://localhost:3000/formula_optica", nuevaFormula)
      .then(() => {
        setExito("¡Fórmula óptica guardada y generada con éxito!");
        setPaciente(""); setDocumento(""); setNumeroConsulta(""); setDiagnostico("");
        setEsferaOD(""); setEsferaOI(""); setCilindroOD(""); setCilindroOI("");
        setEjeOD(""); setEjeOI(""); setRecomendaciones(""); setObservaciones("");
        setTipoLente(""); setUso(""); setFechaGeneracion(""); setResultadoExamen("");
        setTimeout(() => navigate("/optometra/historia-clinica"), 2000);
      })
      .catch((err) => {
        console.error("Error al guardar la fórmula:", err);
        setError("Hubo un fallo en el servidor al intentar registrar la fórmula.");
      });
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="card shadow-sm">
        <div className="card-body p-4">
          <h4>Generar Fórmula Óptica</h4>
          <p className="text-muted">Complete los datos clínicos y genere la fórmula del paciente.</p>

          {error && <p className="alert alert-danger py-2 small">{error}</p>}
          {exito && <p className="alert alert-success py-2 small">{exito}</p>}

          <form onSubmit={manejarGenerar}>

           
            <div className="seccion-form mt-3">
              <h6>Consulta de referencia</h6>
            </div>
            <div className="row g-3">
              <div className="col-md-3">
                <label className="form-label">Nombre del Paciente <span className="text-danger">*</span></label>
                <input type="text" className="form-control" placeholder="Ej: Juan Pérez"
                  value={paciente} onChange={(e) => setPaciente(e.target.value)} />
              </div>
              <div className="col-md-3">
                <label className="form-label">Cédula / Documento</label>
                <input type="text" className="form-control" placeholder="Ej: 1020456789"
                  value={documento} onChange={(e) => setDocumento(e.target.value)} />
              </div>
              <div className="col-md-3">
                <label className="form-label">Número de consulta <span className="text-danger">*</span></label>
                <input type="text" className="form-control" placeholder="Ej: CON-2026-0027"
                  value={numeroConsulta} onChange={(e) => setNumeroConsulta(e.target.value)} />
              </div>
              <div className="col-md-3">
                <label className="form-label">38 - Diagnóstico</label>
                <select className="form-select" value={diagnostico} onChange={(e) => setDiagnostico(e.target.value)}>
                  <option value="">Seleccione...</option>
                  <option>Astigmatismo</option>
                  <option>Miopía</option>
                  <option>Hipermetropía</option>
                  <option>Presbicia</option>
                </select>
              </div>
            </div>

           
            <div className="seccion-form mt-4">
              <h6>Datos de la Fórmula (Graduación)</h6>
            </div>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Esfera - Ojo Derecho (OD)</label>
                <input type="text" className="form-control" placeholder="Ej: -1.50"
                  value={esferaOD} onChange={(e) => setEsferaOD(e.target.value)} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Esfera - Ojo Izquierdo (OI)</label>
                <input type="text" className="form-control" placeholder="Ej: -2.00"
                  value={esferaOI} onChange={(e) => setEsferaOI(e.target.value)} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Cilindro - Ojo Derecho (OD)</label>
                <input type="text" className="form-control" placeholder="Ej: -0.75"
                  value={cilindroOD} onChange={(e) => setCilindroOD(e.target.value)} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Cilindro - Ojo Izquierdo (OI)</label>
                <input type="text" className="form-control" placeholder="Ej: -1.00"
                  value={cilindroOI} onChange={(e) => setCilindroOI(e.target.value)} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Eje - Ojo Derecho (OD)</label>
                <input type="text" className="form-control" placeholder="Ej: 90°"
                  value={ejeOD} onChange={(e) => setEjeOD(e.target.value)} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Eje - Ojo Izquierdo (OI)</label>
                <input type="text" className="form-control" placeholder="Ej: 85°"
                  value={ejeOI} onChange={(e) => setEjeOI(e.target.value)} />
              </div>
            </div>

           
            <div className="seccion-form mt-4">
              <h6>Datos del Lente</h6>
            </div>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">42. Tipo de lente <span className="text-danger">*</span></label>
                <select className="form-select" value={tipoLente} onChange={(e) => setTipoLente(e.target.value)}>
                  <option value="" disabled>Seleccione</option>
                  <option>Monofocal</option>
                  <option>Bifocal</option>
                  <option>Progresivo</option>
                  <option>Contacto</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">43. Uso <span className="text-danger">*</span></label>
                <select className="form-select" value={uso} onChange={(e) => setUso(e.target.value)}>
                  <option value="" disabled>Seleccione</option>
                  <option>Permanente</option>
                  <option>Para lectura</option>
                  <option>Para distancia</option>
                  <option>Ocasional</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">44. Fecha de generación <span className="text-danger">*</span></label>
                <input type="date" className="form-control"
                  value={fechaGeneracion} onChange={(e) => setFechaGeneracion(e.target.value)} />
              </div>
            </div>

            
            <div className="seccion-form mt-4">
              <h6>Recomendaciones</h6>
            </div>
            <div className="row g-3">
              <div className="col-12">
                <label className="form-label">39. Recomendaciones <span className="text-danger">*</span></label>
                <textarea className="form-control" rows="2"
                  placeholder="Ej: Uso permanente, control en 6 meses..."
                  value={recomendaciones} onChange={(e) => setRecomendaciones(e.target.value)} />
              </div>
              <div className="col-12">
                <label className="form-label">40. Observaciones</label>
                <textarea className="form-control" rows="2"
                  placeholder="Información adicional relevante..."
                  value={observaciones} onChange={(e) => setObservaciones(e.target.value)} />
              </div>
              <div className="col-12">
                <label className="form-label">34. Resultado del Examen</label>
                <textarea className="form-control" rows="2"
                  placeholder="Describa el resultado del examen..."
                  value={resultadoExamen} onChange={(e) => setResultadoExamen(e.target.value)} />
              </div>
            </div>

            <div className="d-flex justify-content-center gap-2 mt-4">
              <button type="submit" className="btn btn-success px-4">41. Generar Fórmula</button>
              <button type="button" className="btn btn-outline-primary px-4">Imprimir Fórmula</button>
              <Link to="/optometra/agregar-consulta" className="btn btn-outline-secondary px-4">Cancelar</Link>
            </div>
          </form>
        </div>
      </div>

     
      <div className="card vista-formula mt-4 p-4 border-start border-3 border-info shadow-sm">
        <h5 className="text-info fw-bold mb-3">Vista previa de la fórmula</h5>
        <div className="row g-2">
          <div className="col-md-6"><strong>Paciente:</strong> {paciente || "---"}</div>
          <div className="col-md-6"><strong>Documento:</strong> {documento || "---"}</div>
          <div className="col-md-6"><strong>Diagnóstico:</strong> {diagnostico || "---"}</div>
          <div className="col-md-6"><strong>Tipo de lente:</strong> <span className="text-primary fw-medium">{tipoLente || "---"}</span></div>
          <div className="col-md-6"><strong>Uso:</strong> <span className="text-primary fw-medium">{uso || "---"}</span></div>
          <div className="col-md-6"><strong>Fecha:</strong> {fechaGeneracion || "---"}</div>

          <div className="col-12 mt-2"><hr /></div>

          <div className="col-md-6"><strong>Esfera OD:</strong> {esferaOD || "---"}</div>
          <div className="col-md-6"><strong>Esfera OI:</strong> {esferaOI || "---"}</div>
          <div className="col-md-6"><strong>Cilindro OD:</strong> {cilindroOD || "---"}</div>
          <div className="col-md-6"><strong>Cilindro OI:</strong> {cilindroOI || "---"}</div>
          <div className="col-md-6"><strong>Eje OD:</strong> {ejeOD || "---"}</div>
          <div className="col-md-6"><strong>Eje OI:</strong> {ejeOI || "---"}</div>

          <div className="col-12 mt-2"><hr /></div>
          <div className="col-12">
            <strong>Recomendaciones:</strong>
            <p className="bg-light p-2 rounded mt-1 text-secondary mb-0">{recomendaciones || "No ingresadas aún."}</p>
          </div>
          {observaciones && (
            <div className="col-12 mt-2">
              <strong>Observaciones:</strong>
              <p className="bg-light p-2 rounded mt-1 text-secondary mb-0">{observaciones}</p>
            </div>
          )}
          {resultadoExamen && (
            <div className="col-12 mt-2">
              <strong>Resultado del Examen:</strong>
              <p className="bg-light p-2 rounded mt-1 text-secondary mb-0">{resultadoExamen}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GenerarFormula;
