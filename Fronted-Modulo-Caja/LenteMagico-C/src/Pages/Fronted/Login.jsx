import React from "react";

export default function Login({ onLogin }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Activa el estado de autenticación en App.jsx
    onLogin(); 
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px", backgroundColor: "#212529", color: "#fff" }}>
        <h3 className="text-center fw-bold mb-4">Iniciar Sesión</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small text-muted">Correo Electrónico</label>
            <input 
              type="email" 
              name="correo"
              className="form-control" 
              placeholder="cajam@lentemagico.com" 
              required 
            />
          </div>
          
          <div className="mb-4">
            <label className="form-label small text-muted">Contraseña</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="********" 
              required 
            />
          </div>
          
          <button type="submit" className="btn btn-primary w-100 fw-bold py-2">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}
