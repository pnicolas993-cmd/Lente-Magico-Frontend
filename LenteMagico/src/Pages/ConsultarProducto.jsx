import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../components/Nav';
import '../styles/productos.css';

const API_URL = "http://localhost:3000/productos";

const productoVacio = {
  nombre: '',
  descripcion: '',
  categoria: 'Monturas',
  precio_venta: '',
  stock_actual: '',
  stock_minimo: '',
  estado: 'Disponible',
};

function ConsultarProducto() {
  const [productos, setProductos] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);
  const [productoEliminando, setProductoEliminando] = useState(null);
  const [mostrarAgregar, setMostrarAgregar] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState(productoVacio);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    axios.get(API_URL)
      .then(res => setProductos(res.data))
      .catch(err => console.error("Error al cargar productos:", err));
  }, []);

  const abrirModal = (producto) => setProductoEditando({ ...producto });
  const cerrarModal = () => setProductoEditando(null);

  const guardarCambios = () => {
    const editado = {
      ...productoEditando,
      codigo_producto: Number(productoEditando.codigo_producto),
      precio_venta: Number(productoEditando.precio_venta),
      stock_actual: Number(productoEditando.stock_actual),
      stock_minimo: Number(productoEditando.stock_minimo),
    };
    axios.put(`${API_URL}/${productoEditando.id}`, editado)
      .then(() => {
        setProductos(productos.map(p => p.id === productoEditando.id ? editado : p));
        cerrarModal();
      })
      .catch(err => console.error("Error al editar:", err));
  };

  const abrirAgregar = () => {
    const maxCodigo = productos.length > 0
      ? Math.max(...productos.map(p => Number(p.codigo_producto || 0)))
      : 0;
    setNuevoProducto({ ...productoVacio, codigo_producto: maxCodigo + 1 });
    setMostrarAgregar(true);
  };

  const cerrarAgregar = () => setMostrarAgregar(false);

  const handleChange = (e, isEditing) => {
    if (isEditing) {
      setProductoEditando({ ...productoEditando, [e.target.name]: e.target.value });
    } else {
      setNuevoProducto({ ...nuevoProducto, [e.target.name]: e.target.value });
    }
  };

  const agregarProducto = () => {
    const nuevo = { ...nuevoProducto, id: Date.now() };
    axios.post(API_URL, nuevo)
      .then(res => {
        setProductos([...productos, res.data]);
        cerrarAgregar();
        setNuevoProducto(productoVacio);
      })
      .catch(err => console.error("Error al agregar:", err));
  };

  const abrirEliminar = (producto) => setProductoEliminando({ ...producto });
  const cerrarEliminar = () => setProductoEliminando(null);
  const confirmarEliminar = () => {
    console.log("ID intentando eliminar:", productoEliminando.id); // Verifica esto en la consola del navegador
    axios.delete(`${API_URL}/${String(productoEliminando.id)}`)
      .then(() => {
        setProductos(productos.filter(p => p.id !== productoEliminando.id));
        cerrarEliminar();
      })
      .catch(err => console.error("Error al eliminar:", err));
  };

  const productosFiltrados = productos.filter(p =>
    (p?.nombre?.toLowerCase() || '').includes(busqueda.toLowerCase()) ||
    String(p?.codigo_producto || '').includes(busqueda)
  );

  return (
    <>
      <div className="page-container">
        <div className="top-bar">
          <h2>Consultar Productos</h2>
          <button className="btn-primary" onClick={abrirAgregar}>+ Agregar Producto</button>
        </div>

        <input type="text" className="buscador" placeholder="Buscar..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />

        <table className="tabla-productos">
          <thead>
            <tr><th>Código</th><th>Producto</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Acciones</th></tr>
          </thead>
          <tbody>
            {productosFiltrados.map(p => (
              <tr key={p.id}>
                <td>{p.codigo_producto}</td>
                <td><strong>{p.nombre}</strong></td>
                <td>{p.categoria}</td>
                <td>${Number(p.precio_venta || 0).toLocaleString()}</td>
                <td>{p.stock_actual}</td>
                <td>
                  <button className="btn-accion" onClick={() => abrirModal(p)}>Editar</button>
                  <button className="btn-accion eliminar" onClick={() => abrirEliminar(p)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {(productoEditando || mostrarAgregar) && (
          <div className="modal-overlay">
            <div className="modal-editar" style={{ maxWidth: '400px', width: '90%' }}>
              <h5 className="modal-titulo">{productoEditando ? "Editar Producto" : "Agregar Producto"}</h5>
              <div className="form-container" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="form-group">
                  <label style={{ fontWeight: 'bold' }}>Nombre del Producto</label>
                  <input type="text" name="nombre" className="form-control" value={productoEditando ? productoEditando.nombre : nuevoProducto.nombre} onChange={(e) => handleChange(e, !!productoEditando)} />
                </div>
                <div className="form-group">
                  <label style={{ fontWeight: 'bold' }}>Categoría</label>
                  <select name="categoria" className="form-select" value={productoEditando ? productoEditando.categoria : nuevoProducto.categoria} onChange={(e) => handleChange(e, !!productoEditando)}>
                    <option value="Monturas">Monturas</option>
                    <option value="Lentes">Lentes</option>
                    <option value="Accesorios">Accesorios</option>
                  </select>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label style={{ fontWeight: 'bold' }}>Stock Actual</label>
                    <input type="number" name="stock_actual" className="form-control" value={productoEditando ? productoEditando.stock_actual : nuevoProducto.stock_actual} onChange={(e) => handleChange(e, !!productoEditando)} />
                  </div>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label style={{ fontWeight: 'bold' }}>Stock Mínimo</label>
                    <input type="number" name="stock_minimo" className="form-control" value={productoEditando ? productoEditando.stock_minimo : nuevoProducto.stock_minimo} onChange={(e) => handleChange(e, !!productoEditando)} />
                  </div>
                </div>
                <div className="form-group">
                  <label style={{ fontWeight: 'bold' }}>Precio de Venta</label>
                  <input type="number" name="precio_venta" className="form-control" value={productoEditando ? productoEditando.precio_venta : nuevoProducto.precio_venta} onChange={(e) => handleChange(e, !!productoEditando)} />
                </div>
              </div>
              <div className="modal-btns" style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button className="btn-cancelar" onClick={productoEditando ? cerrarModal : cerrarAgregar}>Cancelar</button>
                <button className="btn-primary" onClick={productoEditando ? guardarCambios : agregarProducto}>Guardar Cambios</button>
              </div>
            </div>
          </div>
        )}

        {productoEliminando && (
          <div className="modal-overlay">
            <div className="modal-editar" style={{ textAlign: 'center', padding: '20px' }}>
              <h5 style={{ color: '#d9534f', marginBottom: '15px' }}>Confirmar Eliminación</h5>
              <p>¿Estás seguro de que deseas eliminar <strong>{productoEliminando.nombre}</strong>? Esta acción no se puede deshacer.</p>
              <div className="modal-btns" style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '20px' }}>
                <button className="btn-cancelar" onClick={cerrarEliminar}>Cancelar</button>
                <button className="btn-primary" style={{ backgroundColor: '#d9534f' }} onClick={confirmarEliminar}>Eliminar Producto</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ConsultarProducto;