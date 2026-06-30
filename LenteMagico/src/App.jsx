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
