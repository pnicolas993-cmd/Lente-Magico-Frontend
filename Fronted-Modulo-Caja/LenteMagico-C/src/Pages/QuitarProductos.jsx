import React, { useState } from "react";

import { QuitarProductoService } from "../Api/QuitarProductoService";

function QuitarProductos() {
  
  const [productos, setProductos] = useState([
    { id: 1, name: "Gotas para la resequedad del ojo" },
    { id: 2, name: "Líquido Limpiador 60ml" }
  ]);

  const borrar = async (id, nombreProducto) => {
    const confirmar = window.confirm(`¿Estás seguro de que deseas quitar este producto?\n"${nombreProducto}"`);
    if (!confirmar) return;

    
    const copiaProductosAntes = [...productos];

    
    setProductos(productos.filter((p) => p.id !== id));

    
    const datosEliminados = {
      producto_id: id,
      name: nombreProducto,
      estado: "Eliminado"
    };

    try {
      await QuitarProductoService.guardarEliminacion(datosEliminados);
      alert("✓ Producto eliminado de la interfaz y guardado exitosamente en la API.");

    } catch (error) {
      console.error("Error al conectar con la API:", error);
      
      setProductos(copiaProductosAntes);

      const statusError = error.response?.status || "Sin Conexión";
      const mensajeApi = error.response?.data?.mensaje || error.message;

      alert(
        `❌ El producto no se pudo registrar (Status: ${statusError}).\n` +
        `Detalle: ${mensajeApi}\n\n` +
        `Se ha restaurado el producto en la lista.`
      );
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "75vh" }}>
      <div className="card shadow border-0 p-4" style={{ width: "100%", maxWidth: "450px" }}>
        <div className="card-body">
          <h3 className="text-center fw-bold text-danger mb-4">Quitar Productos</h3>
          
          <div className="mt-2">
            {productos.length === 0 ? (
              <p className="text-muted text-center small my-3">No hay productos para eliminar.</p>
            ) : (
              productos.map((p) => (
                <div key={p.id} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                  <span className="small fw-semibold text-dark">{p.name}</span>
                  <button 
                    type="button"
                    className="btn btn-danger btn-sm fw-bold shadow-sm" 
                    onClick={() => borrar(p.id, p.name)}
                  >
                    Eliminar
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuitarProductos;
