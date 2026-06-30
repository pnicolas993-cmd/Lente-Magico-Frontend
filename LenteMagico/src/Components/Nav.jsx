import React from "react";
import { Link, useNavigate } from "react-router-dom"; // 1. Importamos useNavigate

function Nav() {
  const navigate = useNavigate(); // 2. Inicializamos el hook

  
  const handleLogout = () => {
    localStorage.removeItem("usuario_logueado");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Lente Mágico
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto"/>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Inicio
              </Link>
            </li>

            {/* Dropdown Administrador */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Administrador
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/autorizaciones">01 - Autorizaciones</Link></li>
                <li><Link className="dropdown-item" to="/usuarios">03 - Usuarios</Link></li>
                <li><Link className="dropdown-item" to="/log-errores">62 - Log de Errores</Link></li>
              </ul>
            </li>

          
            {/* Dropdown Optómetra */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Optómetra
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/optometra/registrar-paciente">Registrar Paciente</Link></li>
                <li><Link className="dropdown-item" to="/optometra/agregar-consulta">Agregar Consulta</Link></li>
                <li><Link className="dropdown-item" to="/optometra/generar-formula">Generar Fórmula</Link></li>
                <li><Link className="dropdown-item" to="/optometra/historia-clinica">Historia Clínica</Link></li>
              </ul>
            </li>

         


          {/* 4. Botón de Cerrar Sesión con onClick */}
          <button
            className="btn btn-outline-light ms-auto"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Nav;





