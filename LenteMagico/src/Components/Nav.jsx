import React from "react";
import { Link, useNavigate } from "react-router-dom"; // 1. Importamos useNavigate

function Nav() {
  const navigate = useNavigate(); // 2. Inicializamos el hook

<<<<<<< HEAD
  // 3. Función centralizada para cerrar sesión
=======
  
>>>>>>> origin/Lorena
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
<<<<<<< HEAD
          <ul className="navbar-nav me-auto">
=======
          <ul className="navbar-nav me-auto"/>
>>>>>>> origin/Lorena
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

<<<<<<< HEAD
            {/* Dropdown Caja */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Caja
              </a>
              <ul className="dropdown-menu">
                <li className="dropdown-header text-uppercase fs-7 fw-bold text-info">Clientes</li>
                <li><Link className="dropdown-item" to="/caja/consultar-cliente">Consultar Cliente</Link></li>
                <li><Link className="dropdown-item" to="/caja/RegistrarDatos">Registrar Datos</Link></li>

                <li><Link className="dropdown-item" to="/caja/registrar-cliente">Registrar Cliente</Link></li>
                <li><Link className="dropdown-item" to="/caja/agregar-consulta1">Agregar Consulta1</Link></li>
                <li><Link className="dropdown-item" to="/caja/quitar-consulta">Quitar Consulta</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li className="dropdown-header text-uppercase fs-7 fw-bold text-info">Productos</li>
                <li><Link className="dropdown-item" to="/caja/agregar-productos">Agregar Productos</Link></li>
                <li><Link className="dropdown-item" to="/caja/quitar-productos">Quitar Productos</Link></li>
                <li><Link className="dropdown-item" to="/caja/producto-vendido">Productos Vendidos</Link></li>
                <li><Link className="dropdown-item" to="/caja/cantidad-vendidos">Cantidad Vendidos</Link></li>
                <li><Link className="dropdown-item" to="/caja/precio-producto">Precio del Producto</Link></li>
                <li><Link className="dropdown-item" to="/caja/registrar-servicio">Registrar Servicio</Link></li>
                <li><Link className="dropdown-item" to="/caja/registrar-pedido">Registrar Pedido</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li className="dropdown-header text-uppercase fs-7 fw-bold text-info">Ventas</li>
                <li><Link className="dropdown-item" to="/caja/confirmar-venta">Confirmar Venta</Link></li>
                <li><Link className="dropdown-item" to="/caja/visualizar-venta">Visualizar Venta</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li className="dropdown-header text-uppercase fs-7 fw-bold text-info">Formas de Pago</li>
                <li><Link className="dropdown-item" to="/caja/efectivo">Efectivo</Link></li>
                <li><Link className="dropdown-item" to="/caja/tarjeta-credito">Tarjeta de Crédito</Link></li>
                <li><Link className="dropdown-item" to="/caja/tarjeta-debito">Tarjeta Débito</Link></li>
                <li><Link className="dropdown-item" to="/caja/plataformas">Plataformas</Link></li>
                <li><Link className="dropdown-item" to="/caja/confirmacion-banco">Confirmación de Banco</Link></li>
              </ul>
            </li>

=======
          
>>>>>>> origin/Lorena
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

<<<<<<< HEAD
            {/* Dropdown Compras */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Compras
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/compras/proveedores">Proveedores</Link></li>
                <li><Link className="dropdown-item" to="/compras/categorias">Categorías</Link></li>
                <li><Link className="dropdown-item" to="/compras/registro">Registro de Compras</Link></li>
              </ul>
            </li>

            {/* Dropdown Bodega */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Bodega
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/consultar-producto">
                    Consultar producto
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
=======
         

>>>>>>> origin/Lorena

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





