import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import imagen from "../assets/Img/Logo.png";
import "../Styles/Login.css";

function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [errorMsg, setErrorMsg] = useState(""); 
  const navigate = useNavigate();

  const manejarIngresar = (e) => {
    e.preventDefault();
    setErrorMsg(""); 


    axios
      .post("http://localhost:3000/api/auth/login", {
        correo: correo,
        contrasena: contrasena,
      })
      .then((respuesta) => {
        const { usuario, token, rol } = respuesta.data;

       
        localStorage.setItem(
          "usuario_logueado",
          JSON.stringify({
            id: usuario.id,
            login: usuario.login,
            correo: usuario.correo,
            rol: rol,
            token: token,
          })
        );

        alert(`¡Bienvenido al sistema, ${usuario.login}!`);
        navigate("/"); 
      })
      .catch((error) => {
        console.error("Error en el login:", error);

       
        if (error.response) {
          setErrorMsg(error.response.data.mensaje || "Correo electrónico o contraseña incorrectos.");
        } else {
          setErrorMsg("Error de conexión con el servidor de autenticación.");
        }
      });
  };

  return (
    <div className="container">
      <div className="caja-login mx-auto" style={{ marginTop: "8% " }}>
        <h2 className="text-center titulo-sistema">
          <img src={imagen} width="60" height="60" alt="Logo" />
          <br />
          Lente Mágico
        </h2>
        <p className="text-center text-muted mb-4">Módulo Administrador</p>

        <div className="card shadow border-0">
          <div className="card-body p-4">
            <h5 className="card-title mb-3 fw-bold">Iniciar Sesión</h5>
            
           
            {errorMsg && (
              <div className="alert alert-danger py-2 small" role="alert">
                {errorMsg}
              </div>
            )}

            <form onSubmit={manejarIngresar}>
              <div className="mb-3">
                <label className="form-label text-muted small">Correo electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="admin@mail.com"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-muted small">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="****"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100 py-2 fw-medium">
                Ingresar
              </button>
            </form>

            <hr className="text-muted" />
            <p className="text-center mb-0 small">
              ¿Olvidaste tu contraseña? <a href="#" className="text-decoration-none">Recupérala aquí</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
