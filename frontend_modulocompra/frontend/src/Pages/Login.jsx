import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import "../Styles/Style.css";

const LOGIN_API_URL = 'http://localhost:5000/api/login'; // Asegúrate de que esta URL coincida con la ruta de tu backend


function Login() {
    const navigate = useNavigate();

    // Estados para controlar el formulario, errores y UI
    const [correo, setCorreo] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault(); // Detiene la recarga de página por defecto
        setError('');
        setCargando(true);

        // Validación inicial en el cliente
        if (!correo || !contrasenia) {
            setError('Por favor, completa todos los campos.');
            setCargando(false);
            return;
        }

        try {
            const response = await fetch(LOGIN_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ correo, contrasenia })
            });

            const data = await response.json();

            if (!response.ok) {
                // El backend respondió con un error controlado (401, 403, 400, etc.)
                setError(data.error || 'Credenciales incorrectas.');
                setCargando(false);
                return;
            }

            // Guardamos el token para futuras peticiones autenticadas
            if (data.token) {
                localStorage.setItem('token', data.token);
            }

            navigate('/index');
        } catch (err) {
            // Este catch solo se dispara si la petición ni siquiera llegó al servidor
            // (backend caído, problema de red, CORS, etc.)
            console.error("Error capturado en la vista de Login:", err);
            setError('No se recibió respuesta del servidor. Verifica que tu backend esté corriendo.');
        } finally {
            // SÍ O SÍ se ejecuta esta línea: garantiza que el botón vuelva a decir "Ingresar"
            setCargando(false);
        }
    };

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

                            {/* Contenedor dinámico para mostrar las alertas del catch */}
                            {error && (
                                <div className="alert alert-danger p-2" style={{ fontSize: '13px' }}>
                                    ⚠️ {error}
                                </div>
                            )}

                            {/* Formulario con estructura HTML semántica correcta */}
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label className="form-label">Correo electrónico</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="ModuloCompras@gmail.com"
                                        value={correo}
                                        onChange={(e) => setCorreo(e.target.value)}
                                        disabled={cargando}
                                        autoComplete="username"
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="************"
                                        value={contrasenia}
                                        onChange={(e) => setContrasenia(e.target.value)}
                                        disabled={cargando}
                                        autoComplete="current-password"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={cargando}
                                >
                                    {cargando ? 'Verificando...' : 'Ingresar'}
                                </button>
                            </form>

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