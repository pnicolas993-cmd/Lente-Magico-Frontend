import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function DashboardOptometra() {
  const [pacientes, setPacientes] = useState([]);
  const [consultas, setConsultas] = useState([]);
  const [historias, setHistorias] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [resPacientes, resConsultas, resHistorias] =
          await Promise.all([
            fetch("http://localhost:3000/clientes"),
            fetch("http://localhost:3000/agenda_consulta"),
            fetch("http://localhost:3000/historia_clinica"),
          ]);

        // Verificamos que las respuestas sean correctas
        if (!resPacientes.ok) {
          throw new Error("Error al obtener los pacientes");
        }

        if (!resConsultas.ok) {
          throw new Error("Error al obtener las consultas");
        }

        if (!resHistorias.ok) {
          throw new Error("Error al obtener las historias clínicas");
        }

        // Convertimos las respuestas a JSON
        const datosPacientes = await resPacientes.json();
        const datosConsultas = await resConsultas.json();
        const datosHistorias = await resHistorias.json();

        // Guardamos los datos
        setPacientes(Array.isArray(datosPacientes) ? datosPacientes : []);
        setConsultas(Array.isArray(datosConsultas) ? datosConsultas : []);
        setHistorias(Array.isArray(datosHistorias) ? datosHistorias : []);

      } catch (error) {
        console.error(
          "Error al sincronizar el panel del optómetra:",
          error
        );

        // Si ocurre algún error, dejamos los arreglos vacíos
        setPacientes([]);
        setConsultas([]);
        setHistorias([]);

      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  // ==========================================
  // MÉTRICAS
  // ==========================================

  const totalPacientes = pacientes.length;

  const totalConsultas = consultas.length;

  const totalHistorias = historias.length;

  // Consultas pendientes
  const consultasPendientes = consultas.filter(
    (consulta) =>
      consulta.estado?.toLowerCase() === "pendiente"
  ).length;

  // Últimos 5 pacientes
  const ultimosPacientes = pacientes
    .slice()
    .reverse()
    .slice(0, 5);

  // ==========================================
  // PANTALLA DE CARGA
  // ==========================================

  if (cargando) {
    return (
      <div className="container mt-4 text-center">

        <div
          className="spinner-border text-primary"
          role="status"
        >
          <span className="visually-hidden">
            Cargando...
          </span>
        </div>

        <p className="text-muted mt-2">
          Cargando información de Lente Mágico...
        </p>

      </div>
    );
  }

  // ==========================================
  // DASHBOARD
  // ==========================================

  return (
    <div className="container mt-4">

      {/* ======================================
          ENCABEZADO
      ====================================== */}

      <div className="mb-4">

        <h3 className="fw-bold mb-0">
          Bienvenido al Módulo de Optometría
        </h3>

        <p className="text-muted mb-0">
          Este es tu panel de control. Aquí puedes
          gestionar pacientes, consultas e historias
          clínicas.
        </p>

      </div>


      {/* ======================================
          TARJETAS INFORMATIVAS
      ====================================== */}

      <div className="row g-3 mb-4">

        {/* PACIENTES */}
        <div className="col-md-3">

          <div className="card h-100 border-0 shadow-sm border-start border-primary border-4 py-2">

            <div className="card-body">

              <h6 className="text-muted fw-normal mb-1">
                Pacientes registrados
              </h6>

              <h2 className="fw-bold mb-0">
                {totalPacientes}
              </h2>

            </div>

          </div>

        </div>


        {/* CONSULTAS */}
        <div className="col-md-3">

          <div className="card h-100 border-0 shadow-sm border-start border-success border-4 py-2">

            <div className="card-body">

              <h6 className="text-muted fw-normal mb-1">
                Consultas registradas
              </h6>

              <h2 className="fw-bold mb-0">
                {totalConsultas}
              </h2>

            </div>

          </div>

        </div>


        {/* HISTORIAS CLÍNICAS */}
        <div className="col-md-3">

          <div className="card h-100 border-0 shadow-sm border-start border-info border-4 py-2">

            <div className="card-body">

              <h6 className="text-muted fw-normal mb-1">
                Historias clínicas
              </h6>

              <h2 className="fw-bold mb-0">
                {totalHistorias}
              </h2>

            </div>

          </div>

        </div>


        {/* CONSULTAS PENDIENTES */}
        <div className="col-md-3">

          <div className="card h-100 border-0 shadow-sm border-start border-warning border-4 py-2">

            <div className="card-body">

              <h6 className="text-muted fw-normal mb-1">
                Consultas pendientes
              </h6>

              <h2 className="fw-bold mb-0">
                {consultasPendientes}
              </h2>

            </div>

          </div>

        </div>

      </div>


      {/* ======================================
          ACCIONES RÁPIDAS
      ====================================== */}

      <h5 className="fw-bold mb-3">
        Acciones rápidas
      </h5>

      <div className="row g-3 mb-4">

        {/* AGREGAR CONSULTA */}
        <div className="col-md-3">

          <Link
            to="/optometra/agregar-consulta"
            className="text-decoration-none text-dark"
          >

            <div className="card h-100 border-0 shadow-sm py-2">

              <div className="card-body">

                <h6 className="fw-bold mb-1">
                  Agregar Consulta
                </h6>

                <p className="text-muted small mb-0">
                  Registrar una nueva consulta para un paciente.
                </p>

              </div>

            </div>

          </Link>

        </div>


        {/* ANTECEDENTES */}
        <div className="col-md-3">

          <Link
            to="/optometra/antecedentes"
            className="text-decoration-none text-dark"
          >

            <div className="card h-100 border-0 shadow-sm py-2">

              <div className="card-body">

                <h6 className="fw-bold mb-1">
                  Antecedentes
                </h6>

                <p className="text-muted small mb-0">
                  Consultar y registrar antecedentes del paciente.
                </p>

              </div>

            </div>

          </Link>

        </div>


        {/* HISTORIA CLÍNICA */}
        <div className="col-md-3">

          <Link
            to="/optometra/historia-clinica"
            className="text-decoration-none text-dark"
          >

            <div className="card h-100 border-0 shadow-sm py-2">

              <div className="card-body">

                <h6 className="fw-bold mb-1">
                  Historia Clínica
                </h6>

                <p className="text-muted small mb-0">
                  Registrar y consultar historias clínicas.
                </p>

              </div>

            </div>

          </Link>

        </div>


        {/* GENERAR FÓRMULA */}
        <div className="col-md-3">

          <Link
            to="/optometra/generar-formula"
            className="text-decoration-none text-dark"
          >

            <div className="card h-100 border-0 shadow-sm py-2">

              <div className="card-body">

                <h6 className="fw-bold mb-1">
                  Fórmula Óptica
                </h6>

                <p className="text-muted small mb-0">
                  Generar y consultar fórmulas ópticas.
                </p>

              </div>

            </div>

          </Link>

        </div>

      </div>


      {/* ======================================
          ÚLTIMOS PACIENTES
      ====================================== */}

      <div className="card border-0 shadow-sm mb-4">

        <div className="card-header bg-white py-3 border-0">

          <h5 className="fw-bold mb-0">
            Últimos pacientes registrados
          </h5>

        </div>


        <div className="table-responsive px-3">

          <table className="table table-hover align-middle mb-0">

            <thead className="table-light">

              <tr>

                <th>#ID</th>

                <th>Paciente</th>

                <th>Documento</th>

                <th>Correo</th>

                <th className="text-end">
                  Acciones
                </th>

              </tr>

            </thead>


            <tbody>

              {ultimosPacientes.map((paciente) => (

                <tr key={paciente.id}>

                  <td>
                    P-{paciente.id}
                  </td>

                  <td className="fw-medium">
                    {paciente.nombre ||
                      paciente.nombre_completo ||
                      "Sin nombre registrado"}
                  </td>

                  <td>
                    {paciente.documento ||
                      paciente.numero_documento ||
                      "Sin documento"}
                  </td>

                  <td>
                    {paciente.correo ||
                      "Sin correo"}
                  </td>

                  <td className="text-end">

                    <Link
                      to="/optometra/agregar-consulta"
                      className="btn btn-sm btn-outline-primary"
                    >
                      Ver paciente
                    </Link>

                  </td>

                </tr>

              ))}


              {ultimosPacientes.length === 0 && (

                <tr>

                  <td
                    colSpan="5"
                    className="text-center text-muted py-3"
                  >
                    No se encontraron pacientes
                    registrados.
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

export default DashboardOptometra;