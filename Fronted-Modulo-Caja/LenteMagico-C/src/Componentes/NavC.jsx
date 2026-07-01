import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

// Importa la imagen desde la carpeta assets
import logo from "../assets/LenteMagico-Logo.jpeg"; 

function NavC({ onLogout }) {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm py-2">
      <Container fluid className="px-4">
        
        <Navbar.Brand as={Link} to="/" className="fw-bold d-flex align-items-center gap-2">
          <img
            src={logo}
            alt="Logo Lente Mágico"
            width="35" // Ancho de la imagen
            height="35" // Alto de la imagen
            className="d-inline-block align-top rounded-circle bg-white p-1" // Redondear la Imagen
          />
          LENTE MÁGICO - Caja
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="menu-optica" />
        
        <Navbar.Collapse id="menu-optica">
          <Nav className="me-auto ms-3 gap-2">
            <Nav.Link as={Link} to="/inicioo">Inicio</Nav.Link>

            
            {/*Clientes */}
            <NavDropdown title="Clientes" id="dropdown-clientes">
              <NavDropdown.Item as={Link} to="/consultar-cliente">Consultar Cliente</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/registrar-cliente">Registrar Cliente</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/agregar-consulta">Agregar Consulta</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/quitar-consulta">Quitar Consulta</NavDropdown.Item>
            </NavDropdown>

            {/* Productos*/}
            <NavDropdown title="Productos" id="dropdown-productos">
              <NavDropdown.Item as={Link} to="/agregar-productos">Agregar Productos</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/quitar-productos">Quitar Productos</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/producto-vendido">Productos Vendidos</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/cantidad-vendidos">Cantidad de Productos Vendidos</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/precio-producto">Precio del Producto</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/registrar-servicio">Registrar Servicio</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/registrar-pedido">Registrar Pedido</NavDropdown.Item>
            </NavDropdown>

           {/* Confirmar una venta */}
            <NavDropdown title="Confirmar Venta" id="dropdown-ventas">
              <NavDropdown.Item as={Link} to="/confirmar-venta">Confirmar Venta</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/visualizar-venta">Visualizar Venta</NavDropdown.Item>
            </NavDropdown>

            {/* Formas de pago */}
            <NavDropdown title="Formas de Pago" id="dropdown-pagos">
              <NavDropdown.Item as={Link} to="/efectivo">Efectivo</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/tarjeta-credito">Tarjeta de Crédito</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/tarjeta-debito">Tarjeta Débito</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/plataformas">Plataformas</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/confirmacion-banco">Confirmacion de Banco</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {/* Botones de Cerrar Sesion*/}
          <Nav className="ms-auto">
            <button className="btn btn-outline-light btn-sm px-3 fw-bold" onClick={onLogout}>
               Cerrar sesión
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavC;