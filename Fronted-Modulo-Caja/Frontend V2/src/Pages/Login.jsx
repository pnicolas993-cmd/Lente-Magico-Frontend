import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  apiFetch,
  guardarSesion
} from "../config/api";

import logo from "../assets/LenteMagico-Logo.jpeg";

export default function Login({ onLogin }) {

  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =====================================================
  // INICIAR SESIÓN
  // =====================================================

  const iniciarSesion = async (e) => {

    e.preventDefault();
    setError("");

    if (!correo.trim() || !contrasenia.trim()) {

      setError(
        "El correo y la contraseña son obligatorios."
      );

      return;
    }

    setLoading(true);

    try {

      // Enviar correo y contraseña al backend

      const data = await apiFetch("/auth", {

        method: "POST",

        body: JSON.stringify({

          correo: correo.trim().toLowerCase(),

          contrasenia: contrasenia

        })

      });

      console.log(
        "Respuesta del login:",
        data
      );

      // Verificar respuesta

      if (
        !data ||
        !data.usuario ||
        !data.usuario.id
      ) {

        throw new Error(
          "El servidor no devolvió correctamente los datos del usuario."
        );

      }

      // Guardar sesión

      guardarSesion(data.usuario);

      // Avisar a App.jsx

      if (typeof onLogin === "function") {
        onLogin();
      }

      // Ir al inicio

      navigate("/inicioo", {
        replace: true
      });

    } catch (err) {

      console.error(
        "Error en login:",
        err
      );

      setError(
        err.message ||
        "No fue posible iniciar sesión."
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <>

      <style>{`

        * {
          box-sizing: border-box;
        }

        .login-page {
          min-height: 100vh;

          display: flex;
          justify-content: center;
          align-items: center;

          padding: 20px;

          background:
            linear-gradient(
              135deg,
              #edf3f8,
              #ffffff,
              #e5eef6
            );

          font-family: Arial, Helvetica, sans-serif;
        }

        .login-card {

          width: 100%;
          max-width: 410px;

          padding: 35px 40px 25px;

          background: white;

          border-radius: 22px;

          box-shadow:
            0 18px 45px
            rgba(8, 43, 73, 0.15);

          text-align: center;

        }

        .login-logo {

          display: flex;

          justify-content: center;

          align-items: center;

          margin-bottom: 5px;

        }

        .login-logo img {

          width: 190px;

          height: auto;

          object-fit: contain;

        }

        .login-title {

          margin: 5px 0;

          color: #092f50;

          font-size: 28px;

          font-weight: bold;

        }

        .login-subtitle {

          margin-bottom: 28px;

          color: #777;

          font-size: 14px;

        }

        .login-error {

          margin-bottom: 18px;

          padding: 11px;

          border-radius: 9px;

          background: #ffe9e9;

          border: 1px solid #ffcaca;

          color: #c62828;

          font-size: 13px;

        }

        .login-input-group {

          text-align: left;

          margin-bottom: 18px;

        }

        .login-label {

          display: block;

          margin-bottom: 7px;

          color: #092f50;

          font-size: 14px;

          font-weight: bold;

        }

        .login-input {

          display: flex;

          align-items: center;

          height: 48px;

          width: 100%;

          background: #f8fafc;

          border: 1px solid #d8e0e7;

          border-radius: 10px;

          transition: 0.25s;

        }

        .login-input:focus-within {

          background: white;

          border-color: #1769d1;

          box-shadow:
            0 0 0 3px
            rgba(23, 105, 209, 0.10);

        }

        .login-icon {

          width: 45px;

          display: flex;

          justify-content: center;

          align-items: center;

          font-size: 17px;

        }

        .login-input input {

          flex: 1;

          width: 100%;

          height: 100%;

          padding-right: 12px;

          border: none;

          outline: none;

          background: transparent;

          font-size: 14px;

          color: #263746;

        }

        .login-input input::placeholder {

          color: #9aa5af;

        }

        .login-button {

          width: 100%;

          height: 48px;

          margin-top: 8px;

          border: none;

          border-radius: 10px;

          background:
            linear-gradient(
              135deg,
              #1769d1,
              #0d58b7
            );

          color: white;

          font-size: 15px;

          font-weight: bold;

          cursor: pointer;

          transition: 0.25s;

          box-shadow:
            0 7px 16px
            rgba(23, 105, 209, 0.22);

        }

        .login-button:hover:not(:disabled) {

          transform: translateY(-2px);

          box-shadow:
            0 10px 20px
            rgba(23, 105, 209, 0.30);

        }

        .login-button:disabled {

          opacity: 0.65;

          cursor: not-allowed;

        }

        .login-footer {

          margin-top: 25px;

          color: #8a949d;

          font-size: 12px;

        }

      `}</style>


      <div className="login-page">

        <div className="login-card">

          {/* LOGO */}

          <div className="login-logo">

            <img
              src={logo}
              alt="Lente Mágico"
            />

          </div>


          {/* TÍTULO */}

          <h1 className="login-title">
            Bienvenido
          </h1>

          <p className="login-subtitle">
            Ingresa a tu cuenta de Lente Mágico
          </p>


          {/* ERROR */}

          {error && (

            <div className="login-error">
              {error}
            </div>

          )}


          <form onSubmit={iniciarSesion}>

            {/* CORREO */}

            <div className="login-input-group">

              <label
                className="login-label"
                htmlFor="correo"
              >
                Correo electrónico
              </label>

              <div className="login-input">

                <span className="login-icon">
                  ✉️
                </span>

                <input
                  id="correo"
                  type="email"
                  value={correo}
                  onChange={(e) =>
                    setCorreo(e.target.value)
                  }
                  placeholder="nicoleurrea@gmail.com"
                  autoComplete="email"
                  required
                />

              </div>

            </div>


            {/* CONTRASEÑA */}

            <div className="login-input-group">

              <label
                className="login-label"
                htmlFor="contrasenia"
              >
                Contraseña
              </label>

              <div className="login-input">

                <span className="login-icon">
                  🔒
                </span>

                <input
                  id="contrasenia"
                  type="password"
                  value={contrasenia}
                  onChange={(e) =>
                    setContrasenia(e.target.value)
                  }
                  placeholder="12345"
                  autoComplete="current-password"
                  required
                />

              </div>

            </div>


            {/* BOTÓN */}

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >

              {loading
                ? "Iniciando sesión..."
                : "Iniciar Sesión"
              }

            </button>

          </form>


          <div className="login-footer">
            © 2026 Lente Mágico
          </div>

        </div>

      </div>

    </>

  );

}