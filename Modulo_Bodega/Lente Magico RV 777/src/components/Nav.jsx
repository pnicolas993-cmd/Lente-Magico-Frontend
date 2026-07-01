import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Nav() {
    const navigate = useNavigate();
    const [mostrarAlerta, setMostrarAlerta] = useState(false);

    const confirmarCerrarSesion = () => {
        navigate('/');
        setMostrarAlerta(false);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-primary navbar-dark" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/Index">Lente Magico</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/Index">inicio</Link>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Bodega
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/productos">Consultar producto</Link></li>
                                </ul>
                            </li>
                        </ul>

                        <button
                            className="btn btn-outline-light"
                            onClick={() => setMostrarAlerta(true)}
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </nav>

            {/* Modal cerrar sesión */}
            {mostrarAlerta && (
                <div className="modal-overlay">
                    <div className="modal-editar" style={{ maxWidth: '400px' }}>
                        <h5 className="modal-titulo">Cerrar Sesión</h5>
                        <hr />
                        <p style={{ color: '#1a1a1a' }}>¿Estás seguro que deseas cerrar la sesión?</p>
                        <div className="modal-btns">
                            <button className="btn-cancelar" onClick={() => setMostrarAlerta(false)}>Cancelar</button>
                            <button className="btn-primary" style={{ background: '#e24b4a' }} onClick={confirmarCerrarSesion}>
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Nav;