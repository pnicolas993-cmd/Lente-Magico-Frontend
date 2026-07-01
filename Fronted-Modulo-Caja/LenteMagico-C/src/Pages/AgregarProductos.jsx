import React from "react";

import { AgregarProductosService } from "../Api/AgregarProductosService";

function AgregarProductos() {
  const guardar = async (e) => {
    e.preventDefault();
    
    const nuevoProducto = {
      nombre: e.target.nombreProducto.value,
      codigo: e.target.codigoProducto.value,
      valor: parseFloat(e.target.valorProducto.value), 
      cantidad: parseInt(e.target.cantidadProducto.value, 10) 
    };
    
    await AgregarProductosService.agregar(nuevoProducto);
    
    alert(`Producto agregado:\n${nuevoProducto.nombre} (Código: ${nuevoProducto.codigo})`);
    e.target.reset(); 
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "75vh" }}>
      
      <div className="card shadow border-0 p-4" style={{ width: "100%", maxWidth: "450px" }}>
        <div className="card-body">
          <h3 className="text-center fw-bold text-primary mb-4">Agregar Productos</h3>
          
          <form onSubmit={guardar}>
            
            {/* Nombre del Producto */}
            <div className="mb-3">
              <label className="small fw-bold text-muted mb-1">Nombre del Producto</label>
              <input 
                type="text" 
                name="nombreProducto"
                placeholder="(Ej: Montura Ray-Ban)" 
                className="form-control py-2" 
                required 
                onInvalid={(e) => e.target.setCustomValidity("Por favor, rellena este campo.")}
                onInput={(e) => e.target.setCustomValidity("")}
              />
            </div>

            {/* Código del Producto */}
            <div className="mb-3">
              <label className="small fw-bold text-muted mb-1">Codigo del Producto</label>
              <input 
                type="text" 
                name="codigoProducto"
                placeholder="Código único" 
                className="form-control py-2" 
                required 
                onInvalid={(e) => e.target.setCustomValidity("Por favor, rellena este campo.")}
                onInput={(e) => e.target.setCustomValidity("")}
              />
            </div>

            {/* Valor o Precio */}
            <div className="mb-3">
              <label className="small fw-bold text-muted mb-1">Valor del Producto</label>
              <input 
                type="number" 
                name="valorProducto"
                placeholder="Precio" 
                className="form-control py-2" 
                required 
                onInvalid={(e) => e.target.setCustomValidity("Por favor, rellena este campo.")}
                onInput={(e) => e.target.setCustomValidity("")}
              />
            </div>

            {/* Cantidad del Producto */}
            <div className="mb-4">
              <label className="small fw-bold text-muted mb-1">Cantidad del producto</label>
              <input 
                type="number" 
                name="cantidadProducto"
                placeholder="Cantidad del Producto" 
                className="form-control py-2" 
                required 
                onInvalid={(e) => e.target.setCustomValidity("Por favor, rellena este campo.")}
                onInput={(e) => e.target.setCustomValidity("")}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 fw-bold py-2 mb-3 shadow-sm">
              Agregar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AgregarProductos;