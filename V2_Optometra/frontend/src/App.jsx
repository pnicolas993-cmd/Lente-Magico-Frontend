import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Nav from "./Components/Nav";
import Footer from "./Components/Footer";

import Login from "./Pages/Optometra/Login";
import Recuperar from "./Pages/Optometra/Recuperar";

import DashboardOptometra from "./Components/DeshboardOptometra.jsx";

import HistoriaClinica from "./Pages/Optometra/HistoriaClinica";
import AgregarConsulta from "./Pages/Optometra/AgregarConsulta";
import GenerarFormula from "./Pages/Optometra/GenerarFormula";
import Antecedentes from "./Pages/Optometra/Antecedentes";

function verificarSesion(elemento) {
  const usuarioLogueado = localStorage.getItem("usuario_logueado");

  // Si no existe la sesión, redirige al login
  // ("replace" evita que con el botón "atrás" se vuelva a la página protegida)
  if (!usuarioLogueado) {
    return <Navigate to="/login" replace />;
  }

  // Si sí hay sesión, muestra la página normalmente
  return elemento;
}

function AppRoutes() {
  const location = useLocation();
  const paginasSinNav = ["/login", "/recuperar"];

  const ocultarNav = paginasSinNav.includes(location.pathname);
  return (
    <div className="app">
      {!ocultarNav && <Nav />}

      {/* Contenido principal */}
      <main className="contenido">

        <Routes>

          {/* ==============================
              DASHBOARD DEL OPTÓMETRA
          ============================== */}
          <Route
            path="/"
            element={<DashboardOptometra />}
          />

          {/* ==============================
              LOGIN
          ============================== */}
          <Route
            path="/login"
            element={<Login />}
          />

          {/* ==============================
              RECUPERAR CONTRASEÑA
          ============================== */}
          <Route
            path="/recuperar"
            element={<Recuperar />}
          />

          {/* ==============================
              HISTORIA CLÍNICA
          ============================== */}
          <Route
            path="/optometra/historia-clinica"
            element={<HistoriaClinica />}
          />

          {/* ==============================
              AGREGAR CONSULTA
          ============================== */}
          <Route
            path="/optometra/agregar-consulta"
            element={<AgregarConsulta />}
          />

          {/* ==============================
              GENERAR FÓRMULA
          ============================== */}
          <Route
            path="/optometra/generar-formula"
            element={<GenerarFormula />}
          />

          {/* ==============================
              ANTECEDENTES
          ============================== */}
          <Route
            path="/optometra/antecedentes"
            element={<Antecedentes />}
          />

        </Routes>

      </main>

      {/* Footer */}
      {!ocultarNav && <Footer />}

    </div>
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