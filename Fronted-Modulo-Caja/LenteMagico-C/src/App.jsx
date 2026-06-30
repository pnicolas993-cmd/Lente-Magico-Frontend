import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Header from './Componentes/HeaderC';
import Nav from './Componentes/NavC';
import Footer from './Componentes/FooterC';

// Páginas de Frontend
import Inicio from './Pages/Fronted/Inicio';
import Login from './Pages/Fronted/Login';

// Importaciones del taller Lente Mágico
import Inicioo from "./Pages/Inicioo";
import ConsultarCliente from "./Pages/ConsultarCliente";
import RegistrarCliente from "./Pages/RegistrarCliente";
import AgregarConsulta from "./Pages/AgregarConsulta";
import QuitarConsulta from "./Pages/QuitarConsulta";
import RegistrarServicio from "./Pages/RegistrarServicio";
import RegistrarPedido from "./Pages/RegistrarPedido";
import AgregarProductos from "./Pages/AgregarProductos";
import QuitarProductos from "./Pages/QuitarProductos";
import ConfirmarVenta from "./Pages/ConfirmarVenta";
import VisualizarVenta from "./Pages/VisualizarVenta";
import VisualizarProductoVendido from "./Pages/VisualizarProductoVendido"; 
import CantidadProductosVendidos from "./Pages/CantidadProductosVendidos"; 
import PrecioCadaProducto from "./Pages/PrecioCadaProducto";     
import FormasPago from "./Pages/FormasPago";
import Efectivo from "./Pages/Efectivo";
import TarjetaCredito from "./Pages/TarjetaCredito";
import ConfirmacionBanco from "./Pages/ConfirmacionBanco";
import TarjetaDebito from "./Pages/TarjetaDebito";
import Plataformas from "./Pages/Plataformas";

import "./estilos/estilosproyecto.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // Estado para controlar la sesión
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      {isAuthenticated && <Header />}
      {isAuthenticated && <Nav onLogout={handleLogout} />}
      
      <div className="container mt-4" style={{ minHeight: '70vh' }}>
        <Routes>
          <Route 
            path="/" 
            element={!isAuthenticated ? <Inicio /> : <Navigate to="/consultar-cliente" />} 
          />

          {/* Ruta del Login: Al completarse con éxito, cambia "isAuthenticated" a true y automáticamente el sistema lo redirigirá a los módulos internos.*/}
          <Route 
            path="/login" 
            element={!isAuthenticated ? <Login onLogin={() => setIsAuthenticated(true)} /> : <Navigate to="/inicioo" />} 
          />
          
          <Route path="/inicioo" element={isAuthenticated ? <Inicioo /> : <Navigate to="/" />}/>
          <Route path="/consultar-cliente" element={isAuthenticated ? <ConsultarCliente /> : <Navigate to="/" />} />
          <Route path="/registrar-cliente" element={isAuthenticated ? <RegistrarCliente /> : <Navigate to="/" />} />
          <Route path="/agregar-consulta" element={isAuthenticated ? <AgregarConsulta /> : <Navigate to="/" />} />
          <Route path="/quitar-consulta" element={isAuthenticated ? <QuitarConsulta /> : <Navigate to="/" />} />
          <Route path="/registrar-servicio" element={isAuthenticated ? <RegistrarServicio /> : <Navigate to="/" />} />
          <Route path="/registrar-pedido" element={isAuthenticated ? <RegistrarPedido /> : <Navigate to="/" />} />
          <Route path="/agregar-productos" element={isAuthenticated ? <AgregarProductos /> : <Navigate to="/" />} />
          <Route path="/quitar-productos" element={isAuthenticated ? <QuitarProductos /> : <Navigate to="/" />} />
          <Route path="/confirmar-venta" element={isAuthenticated ? <ConfirmarVenta /> : <Navigate to="/" />} />
          <Route path="/visualizar-venta" element={isAuthenticated ? <VisualizarVenta /> : <Navigate to="/" />} />
          <Route path="/producto-vendido" element={isAuthenticated ? <VisualizarProductoVendido /> : <Navigate to="/" />} />
          <Route path="/cantidad-vendidos" element={isAuthenticated ? <CantidadProductosVendidos /> : <Navigate to="/" />} />
          <Route path="/precio-producto" element={isAuthenticated ? <PrecioCadaProducto /> : <Navigate to="/" />} />
          <Route path="/formas-pago" element={isAuthenticated ? <FormasPago /> : <Navigate to="/" />} />
          <Route path="/efectivo" element={isAuthenticated ? <Efectivo /> : <Navigate to="/" />} />
          <Route path="/tarjeta-credito" element={isAuthenticated ? <TarjetaCredito /> : <Navigate to="/" />} />
          <Route path="/confirmacion-banco" element={isAuthenticated ? <ConfirmacionBanco /> : <Navigate to="/" />} />
          <Route path="/tarjeta-debito" element={isAuthenticated ? <TarjetaDebito /> : <Navigate to="/" />} />
          <Route path="/plataformas" element={isAuthenticated ? <Plataformas /> : <Navigate to="/" />} />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default App;