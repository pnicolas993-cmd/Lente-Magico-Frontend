import React from "react";
import { Link } from "react-router-dom";

function Inicio() {
  return (
    // 1. Cambiamos las clases "bg-dark text-white" por estilos personalizados con el azul de tu Navbar
    <div 
      className="p-5 text-center rounded-3 shadow-sm mx-auto" 
      style={{ 
        maxWidth: "900px", 
        backgroundColor: "#4b9ff8", // Color del fondo del Inicio
        color: "#ffffff" 
      }}
    >
      <h1 className="fw-bold mb-3">¡Bienvenido a Lente Mágico!</h1>
  
      <div className="d-flex justify-content-center gap-3">
        {/* Botón de Iniciar Sesión */}
        <Link to="/login" className="btn btn-light text-primary fw-bold px-4 py-2 shadow-sm">
          Iniciar Sesión
        </Link>
      </div>
    </div>
  );
}

export default Inicio;