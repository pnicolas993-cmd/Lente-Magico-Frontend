import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
    const navigate = useNavigate();
    const [menuAbierto, setMenuAbierto] = useState(false);

    const cerrarMenu = () => setMenuAbierto(false);

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary px-3">
            <Link className="navbar-brand" to="/index" onClick={cerrarMenu}>Lente Mágico</Link>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/index" onClick={cerrarMenu}>Inicio</Link>
                    </li>

                    <li className={`nav-item dropdown ${menuAbierto ? 'show' : ''}`}>
                        <button
                            className="nav-link text-white dropdown-toggle btn btn-link border-0"
                            role="button"
                            onClick={() => setMenuAbierto(!menuAbierto)}
                            style={{ background: 'none', boxShadow: 'none' }}
                        >
                            Compras
                        </button>

                        <ul className={`dropdown-menu ${menuAbierto ? 'show' : ''}`}>
                            <li><Link className="dropdown-item" to="/consultar-proveedores" onClick={cerrarMenu}>Proveedores</Link></li>
                            <li><Link className="dropdown-item" to="/categorias" onClick={cerrarMenu}>Categorias</Link></li>
                            <li><Link className="dropdown-item" to="/registro-compras" onClick={cerrarMenu}>Registro de compras</Link></li>
                        </ul>
                    </li>
                </ul>
                <button className="btn btn-outline-light btn-sm" onClick={() => navigate('/')}>
                    Cerrar sesión
                </button>
            </div>
        </nav>
    );
}

export default Navbar;