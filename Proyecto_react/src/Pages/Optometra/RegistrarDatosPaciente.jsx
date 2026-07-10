import { useState } from "react";
import "../../Styles/RegistrarDatosPaciente.css";
import axios from "axios";

const API_URL = "http://localhost:3000/pacientes"; 

function RegistrarDatosPaciente() {
  const [nombre, setNombre] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [genero, setGenero] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [direccion, setDireccion] = useState("");
  const [enfermedadesPrevias, setEnfermedadesPrevias] = useState("");
  const [usoLentesPrevios, setUsoLentesPrevios] = useState("");
  const [alergias, setAlergias] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  const manejarGuardar = (event) => {
    event.preventDefault();

    if (
      !nombre ||
      !tipoDocumento ||
      !numeroDocumento ||
      !fechaNacimiento ||
      !genero ||
      !telefono ||
      !correo ||
      !direccion
    ) {
      setError("Por favor completa todos los campos obligatorios (*)");
      return;
    }

    setError("");

    const paciente = {
      nombre,
      tipoDocumento,
      numeroDocumento,
      fechaNacimiento,
      genero,
      telefono,
      correo,
      direccion,
      enfermedadesPrevias,
      usoLentesPrevios,
      alergias,
    };

    axios.post(API_URL, paciente)
      .then((response) => {
        setExito("¡Paciente registrado con éxito!");
        setError("");
        manejarCancelarSinExito();
      })
      .catch((error) => {
        console.error("Error al registrar el paciente:", error);
        setError("Error al conectar con el servidor de la base de datos.");
        setExito("");
      });
  };

  const manejarCancelar = () => {
    manejarCancelarSinExito();
    setExito("");
  };

  const manejarCancelarSinExito = () => {
    setNombre("");
    setTipoDocumento("");
    setNumeroDocumento("");
    setFechaNacimiento("");
    setGenero("");
    setTelefono("");
    setCorreo("");
    setDireccion("");
    setEnfermedadesPrevias("");
    setUsoLentesPrevios("");
    setAlergias("");
    setError("");
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="card shadow-sm">
        <div className="card-body p-4">
          <h4>Registrar datos del paciente</h4>
          <p className="text-muted">
            Complete la información del paciente. Los campos marcados con{' '}
            <span className="text-danger">*</span> son obligatorios.
          </p>

          {error && <div className="alert alert-danger p-2 small">{error}</div>}
          {exito && <div className="alert alert-success p-2 small">{exito}</div>}

          <form onSubmit={manejarGuardar}>
            <div className="seccion-form mt-4">
              <h6>Datos Personales</h6>
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">
                  Nombre completo <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ej: Lorena Romero Cassiani"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">
                  Tipo de Documento <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  value={tipoDocumento}
                  onChange={(e) => setTipoDocumento(e.target.value)}
                >
                  <option value="" disabled>
                    Seleccione
                  </option>
                  <option value="CC">Cédula de ciudadanía</option>
                  <option value="TI">Tarjeta de Identidad</option>
                  <option value="CE">Cédula de Extranjería</option>
                  <option value="PA">Pasaporte</option>
                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label">
                  No. de Documento <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ej: 12345678910"
                  value={numeroDocumento}
                  onChange={(e) => setNumeroDocumento(e.target.value)}
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">
                  Fecha de Nacimiento <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  className="form-control"
                  value={fechaNacimiento}
                  onChange={(e) => setFechaNacimiento(e.target.value)}
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">
                  Género <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  value={genero}
                  onChange={(e) => setGenero(e.target.value)}
                >
                  <option value="" disabled>
                    Seleccione
                  </option>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                  <option value="O">Otro</option>
                </select>
              </div>
            </div>

            <div className="seccion-form mt-4">
              <h6>Información de Contacto</h6>
            </div>

            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">
                  Teléfono <span className="text-danger">*</span>
                </label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Ej: 3101-222-555"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">
                  Correo Electrónico <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Ej: lore@gmail.com"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">
                  Dirección <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ej: Calle 123 # 45-67, Bogotá"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                />
              </div>
            </div>

            <div className="seccion-form mt-4">
              <h6>Antecedentes Médicos</h6>
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Enfermedades Oculares Previas</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ej: Glaucoma, Cataratas, Astigmatismo"
                  value={enfermedadesPrevias}
                  onChange={(e) => setEnfermedadesPrevias(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Uso de Lentes Previos</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ej: SI o NO"
                  value={usoLentesPrevios}
                  onChange={(e) => setUsoLentesPrevios(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Alergias Conocidas</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ej: Polen, Polvo, Medicamento..."
                  value={alergias}
                  onChange={(e) => setAlergias(e.target.value)}
                />
              </div>
            </div>

            <div className="d-flex justify-content-center gap-2 mt-4">
              <button type="submit" className="btn btn-success px-4">
                Guardar Registro
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary px-4"
                onClick={manejarCancelar}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegistrarDatosPaciente;
