import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";
import Login from "./Pages/Login/Login";
import Recuperar from "./Pages/Login/Recuperar";
{
  /* Admin */
}
import DeshboardAdmin from "./Components/DeshboardAdmin";
import Usuarios from "./Pages/Administrador/Usuarios";
import Autorizaciones from "./Pages/Administrador/Autorizacion";
import LogErrores from "./Pages/Administrador/LogErrores";





// ============================================================
// PROTECCIÓN DE RUTAS
// ============================================================
// Función que revisa si hay un usuario logueado (en localStorage)
// antes de mostrar el elemento de una ruta. Si no hay sesión,
// redirige al login en vez de mostrar el contenido protegido.
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

      <main className="contenido">
        <Routes>
          <Route path="/" element={verificarSesion(<DeshboardAdmin />)} />
          <Route path="/usuarios" element={verificarSesion(<Usuarios />)} />
          <Route
            path="/autorizaciones"
            element={verificarSesion(<Autorizaciones />)}
          />
          <Route
            path="/log-errores"
            element={verificarSesion(<LogErrores />)}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/recuperar" element={<Recuperar />} />
        
        </Routes>
      </main>

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