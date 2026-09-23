import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

const API_URL = "/api/consultas";

function Consultas() {
  const location = useLocation();

  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // CARGAR CONSULTAS
  // ==========================================

  useEffect(() => {
    const cargarConsultas = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(
            "Error al obtener las consultas."
          );
        }

        const resultado = await response.json();

        /*
         * Dependiendo de cómo responda tu backend,
         * puede devolver:
         *
         * [...]
         *
         * o:
         *
         * { consultas: [...] }
         */

        let data = Array.isArray(resultado)
          ? resultado
          : resultado.consultas || [];

        // ==========================================
        // CONSULTA NUEVA RECIBIDA DESDE OTRA VISTA
        // ==========================================

        if (location.state?.nuevaConsulta) {
          const nuevaConsulta =
            location.state.nuevaConsulta;

          const existe = data.some(
            (c) =>
              c.numero_documento ===
                nuevaConsulta.numero_documento &&
              c.fecha_hora ===
                nuevaConsulta.fecha_hora
          );

          if (!existe) {
            data = [
              nuevaConsulta,
              ...data
            ];
          }
        }

        setConsultas(data);

      } catch (error) {
        console.error(
          "Error al cargar consultas:",
          error
        );

        // Si falla la API pero existe una consulta
        // enviada desde otra pantalla, la mostramos.
        if (location.state?.nuevaConsulta) {
          setConsultas([
            location.state.nuevaConsulta
          ]);
        } else {
          setConsultas([]);
        }

      } finally {
        setLoading(false);
      }
    };

    cargarConsultas();

  }, [location.state]);

  // ==========================================
  // ELIMINAR CONSULTA
  // ==========================================

  const handleEliminar = async (
    index,
    consulta
  ) => {

    const confirmacion = window.confirm(
      `¿Estás seguro de eliminar la consulta de ${consulta.primer_nombre} ${consulta.primer_apellido}?`
    );

    if (!confirmacion) {
      return;
    }

    try {

      /*
       * Se intenta utilizar el ID.
       * Si tu backend utiliza numeroDocumento
       * como identificador, se utiliza ese.
       */

      const identificador = consulta.numero_documento;

      const response = await fetch(
        `${API_URL}/${identificador}`,
        {
          method: "DELETE"
        }
      );

      if (!response.ok) {

        const resultado =
          await response.json().catch(
            () => ({})
          );

        throw new Error(
          resultado.mensaje ||
          resultado.error ||
          "No se pudo eliminar la consulta."
        );
      }

      // ==========================================
      // ACTUALIZAR LISTA
      // ==========================================

      setConsultas(
        (prevConsultas) =>
          prevConsultas.filter(
            (_, i) => i !== index
          )
      );

      alert(
        "Consulta eliminada correctamente."
      );

    } catch (error) {

      console.error(
        "Error al eliminar la consulta:",
        error
      );

      alert(
        `❌ Hubo un error al intentar eliminar la consulta.\n\n${error.message}`
      );
    }
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="container py-5">

      {/* ==========================================
          ENCABEZADO
      ========================================== */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2 className="fw-bold text-primary">
          Consultas Agendadas
        </h2>

        <Link
          to="/agendar-consulta"
          className="btn btn-primary fw-semibold"
        >
          + Agendar Nueva Consulta
        </Link>

      </div>

      {/* ==========================================
          CARGANDO
      ========================================== */}

      {loading ? (

        <div className="text-center py-5">

          <div
            className="spinner-border text-primary"
            role="status"
          >

            <span className="visually-hidden">
              Cargando...
            </span>

          </div>

          <p className="text-muted mt-2">
            Cargando consultas...
          </p>

        </div>

      ) : consultas.length === 0 ? (

        /* ==========================================
           SIN CONSULTAS
        ========================================== */

        <div
          className="alert alert-info text-center"
          role="alert"
        >
          No hay consultas agendadas actualmente.
        </div>

      ) : (

        /* ==========================================
           LISTADO
        ========================================== */

        <div className="row g-4">

          {consultas.map(
            (consulta, index) => (

              <div
                key={`${consulta.numero_documento}-${index}`}
                className="col-12 col-md-6 col-lg-4"
              >

                <div className="card h-100 shadow-sm border-0 d-flex flex-column">

                  {/* ==================================
                      HEADER
                  ================================== */}

                  <div className="card-header bg-primary text-white fw-bold d-flex justify-content-between align-items-center">

                    <span>

                      {consulta.id_tipo_documento}:

                      {" "}

                      {consulta.numero_documento}

                    </span>

                    <span className="badge bg-light text-primary">

                      {consulta.fecha_hora
                        ? new Date(
                            consulta.fecha_hora
                          ).toLocaleDateString(
                            "es-CO"
                          )
                        : "Sin fecha"}

                    </span>

                  </div>

                  {/* ==================================
                      BODY
                  ================================== */}

                  <div className="card-body flex-grow-1">

                    <h5 className="card-title fw-bold text-dark mb-2">

                      {consulta.primer_nombre}{" "}
                      {consulta.primer_apellido}

                    </h5>

                    <p className="card-text text-muted mb-3">

                      <strong>
                        Motivo:
                      </strong>{" "}

                      {consulta.motivo}

                    </p>

                    <p className="card-text mb-0">

                      <small className="text-secondary">

                        <strong>
                          Hora:
                        </strong>{" "}

                        {consulta.fecha_hora
                          ? new Date(
                              consulta.fecha_hora
                            ).toLocaleTimeString(
                              "es-CO",
                              {
                                hour: "2-digit",
                                minute: "2-digit"
                              }
                            )
                          : "Sin hora"}

                      </small>

                    </p>

                  </div>

                  {/* ==================================
                      FOOTER
                  ================================== */}

                  <div className="card-footer bg-transparent border-0 pb-3">

                    <button
                      onClick={() =>
                        handleEliminar(
                          index,
                          consulta
                        )
                      }
                      className="btn btn-danger w-100 fw-semibold"
                    >

                      Eliminar consulta

                    </button>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      )}

    </div>
  );
}

export default Consultas;