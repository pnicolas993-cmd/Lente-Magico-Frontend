import "./styles/style.css"
import Login from "./Page/Login.jsx";
import Index from "./Page/Index.jsx";
import ConsultarProducto from "./Page/ConsultarProducto.jsx";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Index" element={<Index />} />
        <Route path="/productos" element={<ConsultarProducto />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;