import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Nav from "./Components/Nav";
import Login from "./Pages/Login";

// Módulo Administrador
import DeshboardAdmin from "./Components/DeshboardAdmin";
import Usuarios from "./Pages/Usuarios";
import Autorizaciones from "./Pages/Autorizaciones";
import LogErrores from "./Pages/LogErrores";


// Módulo Optómetra
import HistoriaClinica from "./Pages/Optometra/HistoriaClinica";
import AgregarConsulta from "./Pages/Optometra/AgregarConsulta";
import GenerarFormula from "./Pages/Optometra/GenerarFormula";
import RegistrarDatosPaciente from "./Pages/Optometra/RegistrarDatosPaciente";

import "bootstrap/dist/css/bootstrap.min.css";


<<<<<<< HEAD
// Modulo Compras
import ConsultarProveedores from "./Pages/Proveedores.jsx";
import Categorias from "./Pages/Categorias.jsx";
import RegistroCompras from "./Pages/Registrocompras.jsx";


// Modulo Caja
import FormasPago from "./Pages/FormasPago.jsx";
import Efectivo from "./Pages/Efectivo.jsx";
import ConfirmarVenta from "./Pages/ConfirmarVenta.jsx";
import AgregarProductos from "./Pages/AgregarProductos.jsx";
import AgregarConsulta1 from "./Pages/AgregarConsulta1.jsx";
import CantidadProductosVendidos from "./Pages/CantidadProductosVendidos.jsx";
import ConfirmacionBanco from "./Pages/ConfirmacionBanco.jsx";
import ConsultarCliente from "./Pages/ConsultarCliente.jsx";
import Plataformas from "./Pages/Plataformas.jsx";
import PrecioCadaProducto from "./Pages/PrecioCadaProducto.jsx";
import QuitarConsulta from "./Pages/QuitarConsulta.jsx";
import QuitarProductos from "./Pages/QuitarProductos.jsx";
import RegistrarCliente from "./Pages/RegistrarCliente.jsx";
import RegistrarPedido from "./Pages/RegistrarPedido.jsx";
import RegistrarServicio from "./Pages/RegistrarServicio.jsx";
import TarjetaCredito from "./Pages/TarjetaCredito.jsx";
import TarjetaDebito from "./Pages/TarjetaDebito.jsx";
import VisualizarProductoVendido from "./Pages/VisualizarProductoVendido.jsx";
import VisualizarVenta from "./Pages/VisualizarVenta.jsx";
import RegistrarDatos from "./Pages/RegistrarDatos.jsx";

// Modulo bodega 
import ConsultarProducto from "./Pages/ConsultarProducto.jsx";
=======
>>>>>>> origin/Lorena



function AppRoutes() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/login" && <Nav />}
      <div>
        <Routes>
        
          <Route path="/" element={<DeshboardAdmin />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/autorizaciones" element={<Autorizaciones />} />
          <Route path="/log-errores" element={<LogErrores />} />
          <Route path="/login" element={<Login />} />
          <Route path="/optometra/historia-clinica" element={<HistoriaClinica />} />
          <Route path="/optometra/agregar-consulta" element={<AgregarConsulta />} />
          <Route path="/optometra/generar-formula" element={<GenerarFormula />} />
          <Route path="/optometra/registrar-paciente" element={<RegistrarDatosPaciente />} />
<<<<<<< HEAD
          <Route path="/compras/proveedores" element={<ConsultarProveedores />} />
          <Route path="/compras/categorias" element={<Categorias />} />
          <Route path="/compras/registro" element={<RegistroCompras />} />
        <Route path="/caja/formas-pago" element={<FormasPago />} />
          <Route path="/caja/efectivo" element={<Efectivo />} />
          <Route path="/caja/confirmar-venta" element={<ConfirmarVenta />} />
          <Route path="/caja/agregar-productos" element={<AgregarProductos />} />
          <Route path="/caja/RegistrarDatos" element={<RegistrarDatos />} />
          <Route path="/caja/agregar-consulta1" element={<AgregarConsulta1 />} />
          <Route path="/caja/cantidad-productos" element={<CantidadProductosVendidos />} />
          <Route path="/caja/cantidad-vendidos" element={<CantidadProductosVendidos />} />
          <Route path="/caja/confirmacion-banco" element={<ConfirmacionBanco />} />
          <Route path="/caja/consultar-cliente" element={<ConsultarCliente />} />
          <Route path="/caja/plataformas" element={<Plataformas />} />
          <Route path="/caja/precio-producto" element={<PrecioCadaProducto />} />
          <Route path="/caja/quitar-consulta" element={<QuitarConsulta />} />
          <Route path="/caja/quitar-productos" element={<QuitarProductos />} />
          <Route path="/caja/registrar-cliente" element={<RegistrarCliente />} />
          <Route path="/caja/registrar-pedido" element={<RegistrarPedido />} />
          <Route path="/caja/registrar-servicio" element={<RegistrarServicio />} />
          <Route path="/caja/tarjeta-credito" element={<TarjetaCredito />} />
          <Route path="/caja/tarjeta-debito" element={<TarjetaDebito />} />
          <Route path="/caja/visualizar-producto-vendido" element={<VisualizarProductoVendido />} />
          <Route path="/caja/producto_vendido" element={<VisualizarProductoVendido />} />
          <Route path="/caja/producto-vendido" element={<VisualizarProductoVendido />} />
          <Route path="/caja/visualizar-venta" element={<VisualizarVenta />} />
          <Route path="/consultar-producto" element={<ConsultarProducto />} />
          <Route path="/caja/RegistrarDatos" element={<RegistrarDatos />} />

=======
  
>>>>>>> origin/Lorena

        </Routes>



      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
