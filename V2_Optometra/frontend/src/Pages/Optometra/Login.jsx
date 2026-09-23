import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import imagen from "../../assets/Img/Logo.png";
import "../../Styles/Login.css";

function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const manejarIngresar = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo,
          contrasena,
        }),
      });

      const respuesta = await res.json();

      if (!res.ok) {
        throw new Error(
          respuesta.mensaje ||
            "Correo electrónico o contraseña incorrectos."
        );
      }

      // Obtener usuario y token
      const { usuario, token } = respuesta;

      // Guardar usuario en localStorage
      localStorage.setItem(
        "usuario_logueado",
        JSON.stringify({
          id: usuario.id,
          nombre: usuario.nombre || usuario.login,
          correo: usuario.correo,
          token: token || null,
        })
      );

      alert(`¡Bienvenido al sistema, ${usuario.login}!`);

      navigate("/");
    } catch (error) {
      console.error("Error en el login:", error);

      setErrorMsg(
        error.message || "Error de conexión con el servidor."
      );
    }
  };

  return (
    <div className="container">
      <div
        className="caja-login mx-auto"
        style={{ marginTop: "8%" }}
      >
        {/* Logo y título */}
        <h2 className="text-center titulo-sistema">
          <img
            src={imagen}
            width="60"
            height="60"
            alt="Logo Lente Mágico"
          />

          <br />

          Lente Mágico
        </h2>

        <p className="text-center text-muted mb-4">
          Módulo Administrador
        </p>

        {/* Tarjeta del Login */}
        <div className="card shadow border-0">
          <div className="card-body p-4">

            <h5 className="card-title mb-3 fw-bold">
              Iniciar Sesión
            </h5>

            {/* Mensaje de error */}
            {errorMsg && (
              <div
                className="alert alert-danger py-2 small"
                role="alert"
              >
                {errorMsg}
              </div>
            )}

            <form onSubmit={manejarIngresar}>

              {/* Correo */}
              <div className="mb-3">
                <label className="form-label text-muted small">
                  Correo electrónico
                </label>

                <input
                  type="email"
                  className="form-control"
                  placeholder="admin@mail.com"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  required
                />
              </div>

              {/* Contraseña */}
              <div className="mb-3">
                <label className="form-label text-muted small">
                  Contraseña
                </label>

                <input
                  type="password"
                  className="form-control"
                  placeholder="****"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  required
                />
              </div>

              {/* Botón ingresar */}
              <button
                type="submit"
                className="btn btn-primary w-100 py-2 fw-medium"
              >
                Ingresar
              </button>

            </form>

            <hr className="text-muted" />

            {/* Recuperar contraseña */}
            <p className="text-center mb-0 small">
              ¿Olvidaste tu contraseña?{" "}

              <Link to="/recuperar">
                Recupérala aquí
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;