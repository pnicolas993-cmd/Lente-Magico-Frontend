import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/imagen LM.png";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/Index');
  };

  return (
    <>
      <div className="container d-flex align-items-center justify-content-center min-vh-100 py-5">
        <div className="row w-100 justify-content-center">
          <div className="col-12 col-sm-8 col-md-6 col-lg-4">
            <div className="caja-login mx-auto">
              
              <h2 className="text-center titulo-sistema">
                <img src={logo} width="130" alt="Logo Lente Mágico" className="img-fluid"/><br/>
                Lente Mágico
              </h2>
              <p className="text-center text-muted mb-4">Módulo de Bodega</p>

              <div className="card shadow border-0">
                <div className="card-body p-4">

                  <h5 className="card-title mb-3 text-center fw-bold">Iniciar Sesión</h5>

                  <div className="mb-3">
                    <label className="form-label">Correo electrónico</label>
                    <input type="email" className="form-control" placeholder="ModuloBodega@gmail.com"/>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input type="password" className="form-control" placeholder="*************"/>
                  </div>

                  <button className="btn btn-primary w-100 mt-2" onClick={handleLogin}>
                    Ingresar
                  </button>

                  <hr className="text-muted"/>

                  <p className="text-center mb-0" style={{ fontSize: '14px' }}>
                    ¿Olvidaste tu contraseña? <a href="#" className="text-decoration-none">Recupérala aquí</a>
                  </p>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
