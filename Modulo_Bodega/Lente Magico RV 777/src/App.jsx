import Login from "./pages/login";
import Index from "./pages/Index";
import ConsultarProducto from "./pages/ConsultarProducto";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Index" element={<Index />} />
                <Route path="/productos" element={<ConsultarProducto />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;