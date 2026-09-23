import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../config/api";

const inicial = {
  id_tipo_documento: "",
  numero_documento: "",
  primer_nombre: "",
  segundo_nombre: "",
  primer_apellido: "",
  segundo_apellido: "",
  fecha_nacimiento: "",
  genero: "",
  correo: "",
  telefono: ""
};

export default function RegistrarDatosCliente() {
  const [form, setForm] = useState(inicial);
  const [tiposDocumento, setTiposDocumento] = useState([]);
  const [error, setError] = useState(null);
  const [exito, setExito] = useState(null);
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const cargarTipos = async () => {
      try {
        const data = await apiFetch("/tipo-documento");

        setTiposDocumento(data || []);

        // Seleccionar automáticamente el primer tipo de documento
        if (data && data.length > 0) {
          setForm((prev) => ({
            ...prev,
            id_tipo_documento: data[0].id
          }));
        }
      } catch (err) {
        setError(
          "No se pudieron cargar los tipos de documento: " + err.message
        );
      }
    };

    cargarTipos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setExito(null);

    // Validación adicional antes de enviar
    if (
      !form.id_tipo_documento ||
      !form.numero_documento ||
      !form.primer_nombre ||
      !form.primer_apellido
    ) {
      setError(
        "El tipo de documento, número de documento, primer nombre y primer apellido son requeridos"
      );
      return;
    }

    setCargando(true);

    try {
      console.log("Datos enviados al backend:", form);

      const data = await apiFetch("/registrar-cliente", {
        method: "POST",
        body: JSON.stringify(form)
      });

      setExito(data.mensaje || "Cliente registrado exitosamente");

      // Guardar cliente seleccionado
      sessionStorage.setItem(
        "clienteSeleccionado",
        JSON.stringify(data.cliente)
      );

      // Limpiar formulario
      setForm(inicial);

      // Redireccionar después de un momento
      setTimeout(() => {
        navigate("/confirmar-venta");
      }, 1200);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div
      className="container py-4"
      style={{ maxWidth: 640 }}
    >
      <h3 className="fw-bold text-primary mb-3">
        Registrar Cliente
      </h3>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {exito && (
        <div className="alert alert-success">
          {exito}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        {/* Tipo de documento y número */}
        <div className="row g-2 mb-2">

          <div className="col-4">
            <label className="form-label small">
              Tipo doc. *
            </label>

            <select
              className="form-select"
              name="id_tipo_documento"
              value={form.id_tipo_documento}
              onChange={handleChange}
              required
              disabled={tiposDocumento.length === 0}
            >
              {tiposDocumento.length === 0 && (
                <option value="">
                  Cargando...
                </option>
              )}

              {tiposDocumento.map((t) => (
                <option
                  key={t.id}
                  value={t.id}
                >
                  {t.sigla} — {t.nombre_documento}
                </option>
              ))}
            </select>
          </div>

          <div className="col-8">
            <label className="form-label small">
              Número de documento *
            </label>

            <input
              className="form-control"
              name="numero_documento"
              value={form.numero_documento}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Nombres */}
        <div className="row g-2 mb-2">

          <div className="col-6">
            <label className="form-label small">
              Primer nombre *
            </label>

            <input
              className="form-control"
              name="primer_nombre"
              value={form.primer_nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-6">
            <label className="form-label small">
              Segundo nombre
            </label>

            <input
              className="form-control"
              name="segundo_nombre"
              value={form.segundo_nombre}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Apellidos */}
        <div className="row g-2 mb-2">

          <div className="col-6">
            <label className="form-label small">
              Primer apellido *
            </label>

            <input
              className="form-control"
              name="primer_apellido"
              value={form.primer_apellido}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-6">
            <label className="form-label small">
              Segundo apellido
            </label>

            <input
              className="form-control"
              name="segundo_apellido"
              value={form.segundo_apellido}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Fecha y género */}
        <div className="row g-2 mb-2">

          <div className="col-6">
            <label className="form-label small">
              Fecha de nacimiento *
            </label>

            <input
              type="date"
              className="form-control"
              name="fecha_nacimiento"
              value={form.fecha_nacimiento}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-6">
            <label className="form-label small">
              Género
            </label>

            <select
              className="form-select"
              name="genero"
              value={form.genero}
              onChange={handleChange}
            >
              <option value="">
                Seleccionar...
              </option>

              <option value="Femenino">
                Femenino
              </option>

              <option value="Masculino">
                Masculino
              </option>

              <option value="Otro">
                Otro
              </option>
            </select>
          </div>
        </div>

        {/* Correo y teléfono */}
        <div className="row g-2 mb-3">

          <div className="col-6">
            <label className="form-label small">
              Correo
            </label>

            <input
              type="email"
              className="form-control"
              name="correo"
              value={form.correo}
              onChange={handleChange}
            />
          </div>

          <div className="col-6">
            <label className="form-label small">
              Teléfono
            </label>

            <input
              className="form-control"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="btn btn-primary w-100 fw-bold"
          disabled={cargando}
        >
          {cargando
            ? "Guardando..."
            : "Registrar cliente"}
        </button>

      </form>
    </div>
  );
}
