import { useNavigate } from 'react-router-dom';
import { useState } from 'react'; 
import "../Styles/Style.css";

function Login() {
      const navigate = useNavigate();
    return (
        <div>
            <div className="container">
                <div className="caja-login mx-auto">

                    <h2 className="text-center titulo-sistema">
                        <img src="imagen.png" width="60" height="60" alt="logo" />
                        <br />
                        Lente Magico
                    </h2>
                    <p className="text-center text-muted mb-4">Módulo de Compras</p>

                    <div className="card shadow">
                        <div className="card-body p-4">

                            <h5 className="card-title mb-3">Iniciar Sesión</h5>

                            <div className="mb-3">
                                <label className="form-label">Correo electrónico</label>
                                <input type="email" className="form-control" placeholder="ModuloCompras@gmail.com" />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Contraseña</label>
                                <input type="password" className="form-control" placeholder="************" />
                            </div>

                            <button
                                className="btn btn-primary w-100"
                                onClick={() => navigate('/index')}
                            >
                                Ingresar
                            </button>

                            <hr />

                            <p className="text-center mb-0">
                                ¿Olvidaste tu contraseña? <a href="#">Recupérala aquí</a>
                            </p>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Login;




