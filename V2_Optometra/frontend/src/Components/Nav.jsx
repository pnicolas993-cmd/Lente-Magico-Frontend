
import { Link, useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();

  // Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("usuario_logueado");
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      data-bs-theme="dark"
    >
      <div className="container-fluid">

        {/* Nombre del sistema */}
        <Link className="navbar-brand" to="/">
          Lente Mágico
        </Link>

        {/* Botón para dispositivos pequeños */}
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

        <div
          className="collapse navbar-collapse"
          id="navbarNavDropdown"
        >

          <ul className="navbar-nav me-auto">

            {/* =========================
                INICIO
            ========================= */}
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/"
              >
                Inicio
              </Link>
            </li>

         

            

            {/* =========================
                OPTÓMETRA
            ========================= */}
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

                {/* Agregar Consulta */}
                <li>
                  <Link
                    className="dropdown-item"
                    to="/optometra/agregar-consulta"
                  >
                    Agregar Consulta
                  </Link>
                </li>

                {/* Antecedentes */}
                <li>
                  <Link
                    className="dropdown-item"
                    to="/optometra/antecedentes"
                  >
                    Antecedentes
                  </Link>
                </li>

                {/* Generar Fórmula */}
                <li>
                  <Link
                    className="dropdown-item"
                    to="/optometra/generar-formula"
                  >
                    Generar Fórmula
                  </Link>
                </li>

                {/* Historia Clínica */}
                <li>
                  <Link
                    className="dropdown-item"
                    to="/optometra/historia-clinica"
                  >
                    Historia Clínica
                  </Link>
                </li>

              </ul>
            </li>

          </ul>

          {/* =========================
              CERRAR SESIÓN
          ========================= */}
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