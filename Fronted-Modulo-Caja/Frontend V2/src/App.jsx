import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Header from "./Componentes/HeaderC";
import Nav from "./Componentes/NavC";
import Footer from "./Componentes/FooterC";

// =====================================================
// PÁGINAS PRINCIPALES
// =====================================================

import Inicio from "./Pages/Inicio";
import Login from "./Pages/Login";
import Inicioo from "./Pages/Inicioo";

// =====================================================
// CLIENTES
// =====================================================

import ConsultarCliente from "./Pages/ConsultarCliente";
import RegistrarDatosCliente from "./Pages/RegistrarDatosCliente";

// =====================================================
// CONSULTAS
// =====================================================

import AgendarConsulta from "./Pages/AgendarConsulta";
import Consultas from "./Pages/Consultas";

// =====================================================
// SERVICIOS
// =====================================================

import RegistrarServicio from "./Pages/RegistrarServicio";

// =====================================================
// PRODUCTOS Y VENTAS
// =====================================================

import AgregarProductos from "./Pages/AgregarProductos";
import ConfirmarVenta from "./Pages/ConfirmarVenta";
import VisualizarVenta from "./Pages/VisualizarVenta";
import VisualizarProductoVendido from "./Pages/VisualizarProductoVendido";
import CantidadProductosVendidos from "./Pages/CantidadProductosVendidos";
import PrecioCadaProducto from "./Pages/PrecioCadaProducto";

// =====================================================
// PAGOS
// =====================================================

import FormasPago from "./Pages/FormasPago";
import Efectivo from "./Pages/Efectivo";
import TarjetaCredito from "./Pages/TarjetaCredito";
import TarjetaDebito from "./Pages/TarjetaDebito";
import ConfirmacionBanco from "./Pages/ConfirmacionBanco";
import Plataformas from "./Pages/Plataformas";

// =====================================================
// ESTILOS
// =====================================================

import "./estilos/estilosproyecto.css";
import "bootstrap/dist/css/bootstrap.min.css";


// =====================================================
// APP
// =====================================================

function App() {

  // ===================================================
  // COMPROBAR SI YA EXISTE UN USUARIO EN SESSIONSTORAGE
  // ===================================================

  const [isAuthenticated, setIsAuthenticated] = useState(() => {

    const usuario = sessionStorage.getItem("usuario");

    if (!usuario) {
      return false;
    }

    try {

      const usuarioParseado = JSON.parse(usuario);

      return !!(
        usuarioParseado &&
        usuarioParseado.id
      );

    } catch (error) {

      console.error(
        "Error leyendo la sesión:",
        error
      );

      sessionStorage.removeItem("usuario");

      return false;
    }

  });


  // ===================================================
  // CUANDO EL LOGIN ES EXITOSO
  // ===================================================

  const handleLogin = () => {

    console.log(
      "Login correcto. Usuario autenticado."
    );

    setIsAuthenticated(true);

  };


  // ===================================================
  // CERRAR SESIÓN
  // ===================================================

  const handleLogout = () => {

    sessionStorage.removeItem("usuario");
    sessionStorage.removeItem("clienteSeleccionado");
    sessionStorage.removeItem("ventaActiva");

    setIsAuthenticated(false);

  };


  return (

    <BrowserRouter>

      {/* =================================================
          HEADER
      ================================================= */}

      {isAuthenticated && <Header />}


      {/* =================================================
          NAV
      ================================================= */}

      {isAuthenticated && (
        <Nav
          onLogout={handleLogout}
        />
      )}


      {/* =================================================
          CONTENIDO
      ================================================= */}

      <div
        className="container mt-4"
        style={{
          minHeight: "70vh"
        }}
      >

        <Routes>

          {/* =================================================
              PÁGINA DE BIENVENIDA
          ================================================= */}

          <Route
            path="/"
            element={
              !isAuthenticated
                ? <Inicio />
                : <Navigate to="/inicioo" replace />
            }
          />


          {/* =================================================
              LOGIN
          ================================================= */}

          <Route
            path="/login"
            element={
              !isAuthenticated
                ? (
                  <Login
                    onLogin={handleLogin}
                  />
                )
                : (
                  <Navigate
                    to="/inicioo"
                    replace
                  />
                )
            }
          />


          {/* =================================================
              INICIO DEL MÓDULO CAJA
          ================================================= */}

          <Route
            path="/inicioo"
            element={
              isAuthenticated
                ? <Inicioo />
                : <Navigate to="/login" replace />
            }
          />


          {/* =================================================
              CLIENTES
          ================================================= */}

          <Route
            path="/consultar-cliente"
            element={
              isAuthenticated
                ? <ConsultarCliente />
                : <Navigate to="/login" replace />
            }
          />

          <Route
            path="/registrar-datos-cliente"
            element={
              isAuthenticated
                ? <RegistrarDatosCliente />
                : <Navigate to="/login" replace />
            }
          />

          <Route
            path="/registrar-cliente"
            element={
              isAuthenticated
                ? <RegistrarDatosCliente />
                : <Navigate to="/login" replace />
            }
          />


          {/* =================================================
              CONSULTAS
          ================================================= */}

          <Route
            path="/agendar-consulta"
            element={
              isAuthenticated
                ? <AgendarConsulta />
                : <Navigate to="/login" replace />
            }
          />

          <Route
            path="/agregar-consulta"
            element={
              isAuthenticated
                ? <AgendarConsulta />
                : <Navigate to="/login" replace />
            }
          />

          <Route
            path="/consultas"
            element={
              isAuthenticated
                ? <Consultas />
                : <Navigate to="/login" replace />
            }
          />


          {/* =================================================
              SERVICIOS
          ================================================= */}

          <Route
            path="/registrar-servicio"
            element={
              isAuthenticated
                ? <RegistrarServicio />
                : <Navigate to="/login" replace />
            }
          />


          {/* =================================================
              PRODUCTOS
          ================================================= */}

          <Route
            path="/agregar-productos"
            element={
              isAuthenticated
                ? <AgregarProductos />
                : <Navigate to="/login" replace />
            }
          />

          <Route
            path="/precio-producto"
            element={
              isAuthenticated
                ? <PrecioCadaProducto />
                : <Navigate to="/login" replace />
            }
          />


          {/* =================================================
              VENTAS
          ================================================= */}

          <Route
            path="/confirmar-venta"
            element={
              isAuthenticated
                ? <ConfirmarVenta />
                : <Navigate to="/login" replace />
            }
          />

          <Route
            path="/visualizar-venta"
            element={
              isAuthenticated
                ? <VisualizarVenta />
                : <Navigate to="/login" replace />
            }
          />

          <Route
            path="/producto-vendido"
            element={
              isAuthenticated
                ? <VisualizarProductoVendido />
                : <Navigate to="/login" replace />
            }
          />

          <Route
            path="/cantidad-vendidos"
            element={
              isAuthenticated
                ? <CantidadProductosVendidos />
                : <Navigate to="/login" replace />
            }
          />


          {/* =================================================
              FORMAS DE PAGO
          ================================================= */}

          <Route
            path="/formas-pago"
            element={
              isAuthenticated
                ? <FormasPago />
                : <Navigate to="/login" replace />
            }
          />

          <Route
            path="/efectivo"
            element={
              isAuthenticated
                ? <Efectivo />
                : <Navigate to="/login" replace />
            }
          />

          <Route
            path="/tarjeta-credito"
            element={
              isAuthenticated
                ? <TarjetaCredito />
                : <Navigate to="/login" replace />
            }
          />

          <Route
            path="/tarjeta-debito"
            element={
              isAuthenticated
                ? <TarjetaDebito />
                : <Navigate to="/login" replace />
            }
          />

          <Route
            path="/confirmacion-banco"
            element={
              isAuthenticated
                ? <ConfirmacionBanco />
                : <Navigate to="/login" replace />
            }
          />

          <Route
            path="/plataformas"
            element={
              isAuthenticated
                ? <Plataformas />
                : <Navigate to="/login" replace />
            }
          />


          {/* =================================================
              RUTA DESCONOCIDA
          ================================================= */}

          <Route
            path="*"
            element={
              <Navigate
                to={
                  isAuthenticated
                    ? "/inicioo"
                    : "/"
                }
                replace
              />
            }
          />

        </Routes>

      </div>


      {/* =================================================
          FOOTER
      ================================================= */}

      <Footer />

    </BrowserRouter>

  );
}

export default App;