import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  "./Styles/Style.css";
import Login from "./Pages/Login.jsx";
import Index from "./Pages/Index.jsx";
import ConsultarProveedores from "./Pages/Proveedores.jsx";
import Categorias from "./Pages/Categorias.jsx";
import RegistroCompras from "./Pages/RegistroCompras.jsx";

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/index" element={<Index />} />
        <Route path="/consultar-proveedores" element={<ConsultarProveedores />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/registro-compras" element={<RegistroCompras />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;