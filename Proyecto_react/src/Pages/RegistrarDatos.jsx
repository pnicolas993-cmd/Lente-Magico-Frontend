import React from "react";

import { RegistrarDatosService } from "../Api/RegistrarDatosServices";

export default function RegistrarDatos() {

  const manejarRegistro = async (e) => {
    e.preventDefault();

    const datosCliente = {
      primer_nombre: e.target.primer_nombre.value,
      segundo_nombre: e.target.segundo_nombre.value,
      primer_apellido: e.target.primer_apellido.value,
      segundo_apellido: e.target.segundo_apellido.value,
      tipo_documento: e.target.tipoDocumento.value,
      numero_documento: e.target.cedula.value,
      correo: e.target.correo.value
    };

    try {
      await RegistrarDatosService.registrar(datosCliente);
      alert("✓ ¡Cliente guardado con éxito en datos_personales!");
      e.target.reset();
    } catch (error) {
      console.error("Error técnico:", error);

      // Identificar si el error es de conexión o respuesta del servidor
      const mensaje = error.response
        ? `Error ${error.response.status}: ${error.response.statusText}`
        : "No se pudo conectar con el servidor (verificar puerto 3000)";

      alert(`❌ Error al registrar:\n${mensaje}`);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "75vh" }}>
      <div className="card shadow border-0 p-4" style={{ width: "100%", maxWidth: "450px" }}>
        <div className="card-body">
          <h3 className="text-center fw-bold text-primary mb-4">Registrar Datos Personales</h3>

          <form onSubmit={manejarRegistro}>
            <div className="mb-3">
              <input type="text" name="primer_nombre" className="form-control py-2" placeholder="Primer Nombre" required />
            </div>
            <div className="mb-3">
              <input type="text" name="segundo_nombre" className="form-control py-2" placeholder="Segundo Nombre" />
            </div>
            <div className="mb-3">
              <input type="text" name="primer_apellido" className="form-control py-2" placeholder="Primer Apellido" required />
            </div>
            <div className="mb-3">
              <input type="text" name="segundo_apellido" className="form-control py-2" placeholder="Segundo Apellido" />
            </div>

            <div className="mb-3">
              <select name="tipoDocumento" className="form-select py-2 text-muted" defaultValue="" required>
                <option value="" disabled hidden>Tipo de Documento</option>
                <option value="Cédula de Ciudadanía">Cédula de Ciudadanía (C.C.)</option>
                <option value="Cédula de Extranjería">Cédula de Extranjería (C.E.)</option>
                <option value="Tarjeta de Identidad">Tarjeta de Identidad (T.I.)</option>
                <option value="Pasaporte">Pasaporte</option>
              </select>
            </div>

            <div className="mb-3">
              <input type="text" name="cedula" className="form-control py-2" placeholder="Número de Documento" required />
            </div>

            <div className="mb-4">
              <input type="email" name="correo" className="form-control py-2" placeholder="Correo Electrónico" required />
            </div>

            <button type="submit" className="btn btn-success w-100 fw-bold py-2 shadow-sm">
              Guardar Cliente
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}