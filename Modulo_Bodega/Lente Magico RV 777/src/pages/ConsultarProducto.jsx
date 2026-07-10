import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import { ProductoService } from '../services/ProductoService';
import '../styles/productos.css';

const productoVacio = {
  codigo_producto: '',
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
  const [cargando, setCargando] = useState(true);
  const [productoEditando, setProductoEditando] = useState(null);
  const [productoEliminando, setProductoEliminando] = useState(null);
  const [mostrarAgregar, setMostrarAgregar] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState(productoVacio);
  const [busqueda, setBusqueda] = useState('');

  
  const cargarProductos = async () => {
    try {
      setCargando(true);
      const data = await ProductoService.obtenerTodos();
      setProductos(data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
      alert('❌ No se pudieron cargar los productos. ¿Está corriendo el json-server en el puerto 3000?');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const abrirModal = (producto) => setProductoEditando({ ...producto });
  const cerrarModal = () => setProductoEditando(null);

  const handleChangeEditar = (e) => {
    setProductoEditando({ ...productoEditando, [e.target.name]: e.target.value });
  };

  const guardarCambios = async () => {
    try {
      await ProductoService.actualizar(productoEditando.id, productoEditando);
      await cargarProductos();
      cerrarModal();
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      alert('❌ No se pudo guardar el cambio en la API.');
    }
  };

  
  const abrirAgregar = () => {
    const maxCodigo = productos.length > 0
      ? Math.max(...productos.map(p => Number(p.codigo_producto)))
      : 0;
    setNuevoProducto({ ...productoVacio, codigo_producto: maxCodigo + 1 });
    setMostrarAgregar(true);
  };

  const cerrarAgregar = () => setMostrarAgregar(false);

  const handleChangeAgregar = (e) => {
    setNuevoProducto({ ...nuevoProducto, [e.target.name]: e.target.value });
  };

  const agregarProducto = async () => {
    if (!nuevoProducto.nombre) return;
    const nuevo = {
      ...nuevoProducto,
      codigo_producto: Number(nuevoProducto.codigo_producto),
      precio_venta: Number(nuevoProducto.precio_venta),
      stock_actual: Number(nuevoProducto.stock_actual),
      stock_minimo: Number(nuevoProducto.stock_minimo),
    };
    try {
      await ProductoService.crear(nuevo);
      await cargarProductos();
      cerrarAgregar();
    } catch (error) {
      console.error('Error al crear producto:', error);
      alert('❌ No se pudo agregar el producto en la API.');
    }
  };

  
  const abrirEliminar = (producto) => setProductoEliminando({ ...producto });
  const cerrarEliminar = () => setProductoEliminando(null);

  const confirmarEliminar = async () => {
    try {
      await ProductoService.eliminar(productoEliminando.id);
      await cargarProductos();
      cerrarEliminar();
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      alert('❌ No se pudo eliminar el producto en la API.');
    }
  };

  
  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    String(p.codigo_producto).includes(busqueda)
  );

  return (
    <>
      <Nav />
      <div className="page-container">

        <div className="top-bar">
          <h2>Consultar Productos</h2>
          <button className="btn-primary" onClick={abrirAgregar}>+ Agregar Producto</button>
        </div>

        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Busca, filtra y gestiona los lentes y monturas disponibles.
        </p>

        <input
          type="text"
          placeholder="Buscar por nombre o código..."
          className="buscador"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <table className="tabla-productos">
          <thead>
            <tr>
              <th>Código</th>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cargando ? (
              <tr>
                <td colSpan="7" className="sin-resultados">Cargando productos...</td>
              </tr>
            ) : productosFiltrados.length === 0 ? (
              <tr>
                <td colSpan="7" className="sin-resultados">No se encontraron productos</td>
              </tr>
            ) : (
              productosFiltrados.map(p => (
                <tr key={p.id}>
                  <td>{p.codigo_producto}</td>
                  <td><strong>{p.nombre}</strong></td>
                  <td>{p.categoria}</td>
                  <td>${p.precio_venta.toLocaleString()}</td>
                  <td>{p.stock_actual} ud</td>
                  <td>
                    <span className={`badge ${p.stock_actual <= p.stock_minimo ? 'badge-low' : 'badge-ok'}`}>
                      {p.stock_actual <= p.stock_minimo ? 'Stock Bajo' : 'Disponible'}
                    </span>
                  </td>
                  <td>
                    <button className="btn-accion" onClick={() => abrirModal(p)}>Editar</button>
                    <button className="btn-accion eliminar" onClick={() => abrirEliminar(p)}>Eliminar</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        
        {productoEditando && (
          <div className="modal-overlay">
            <div className="modal-editar">
              <h5 className="modal-titulo">Editar Producto</h5>
              <hr />

              <div className="mb-3">
                <label className="form-label">Código del Producto</label>
                <input type="number" name="codigo_producto" className="form-control"
                  value={productoEditando.codigo_producto} onChange={handleChangeEditar} min="1" />
              </div>

              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input type="text" name="nombre" className="form-control"
                  value={productoEditando.nombre} onChange={handleChangeEditar} />
              </div>

              <div className="mb-3">
                <label className="form-label">Descripción</label>
                <input type="text" name="descripcion" className="form-control"
                  value={productoEditando.descripcion} onChange={handleChangeEditar} />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Precio de Venta</label>
                  <input type="number" name="precio_venta" className="form-control"
                    value={productoEditando.precio_venta} onChange={handleChangeEditar} />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Categoría</label>
                  <select name="categoria" className="form-select"
                    value={productoEditando.categoria} onChange={handleChangeEditar}>
                    <option value="Monturas">Monturas</option>
                    <option value="Lentes">Lentes de Contacto</option>
                    <option value="Accesorios">Accesorios</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Stock Actual</label>
                  <input type="number" name="stock_actual" className="form-control"
                    value={productoEditando.stock_actual} onChange={handleChangeEditar} />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Stock Mínimo</label>
                  <input type="number" name="stock_minimo" className="form-control"
                    value={productoEditando.stock_minimo} onChange={handleChangeEditar} />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Estado</label>
                <select name="estado" className="form-select"
                  value={productoEditando.estado} onChange={handleChangeEditar}>
                  <option value="Disponible">Disponible</option>
                  <option value="Stock Bajo">Stock Bajo</option>
                  <option value="Agotado">Agotado</option>
                </select>
              </div>

              <div className="modal-btns">
                <button className="btn-cancelar" onClick={cerrarModal}>Cancelar</button>
                <button className="btn-primary" onClick={guardarCambios}>Guardar Cambios</button>
              </div>
            </div>
          </div>
        )}

        
        {mostrarAgregar && (
          <div className="modal-overlay">
            <div className="modal-editar">
              <h5 className="modal-titulo">Agregar Producto</h5>
              <hr />

              <div className="mb-3">
                <label className="form-label">Código del Producto</label>
                <input type="number" name="codigo_producto" className="form-control"
                  value={nuevoProducto.codigo_producto} disabled
                  style={{ background: '#f0f0f0', cursor: 'not-allowed' }} />
              </div>

              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input type="text" name="nombre" className="form-control"
                  placeholder="Nombre del producto" value={nuevoProducto.nombre}
                  onChange={handleChangeAgregar} />
              </div>

              <div className="mb-3">
                <label className="form-label">Descripción</label>
                <input type="text" name="descripcion" className="form-control"
                  placeholder="Descripción breve" value={nuevoProducto.descripcion}
                  onChange={handleChangeAgregar} />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Precio de Venta</label>
                  <input type="number" name="precio_venta" className="form-control"
                    placeholder="Ej: 150000" value={nuevoProducto.precio_venta}
                    onChange={handleChangeAgregar} />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Categoría</label>
                  <select name="categoria" className="form-select"
                    value={nuevoProducto.categoria} onChange={handleChangeAgregar}>
                    <option value="Monturas">Monturas</option>
                    <option value="Lentes">Lentes de Contacto</option>
                    <option value="Accesorios">Accesorios</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Stock Actual</label>
                  <input type="number" name="stock_actual" className="form-control"
                    placeholder="Ej: 10" value={nuevoProducto.stock_actual}
                    onChange={handleChangeAgregar} />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Stock Mínimo</label>
                  <input type="number" name="stock_minimo" className="form-control"
                    placeholder="Ej: 5" value={nuevoProducto.stock_minimo}
                    onChange={handleChangeAgregar} />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Estado</label>
                <select name="estado" className="form-select"
                  value={nuevoProducto.estado} onChange={handleChangeAgregar}>
                  <option value="Disponible">Disponible</option>
                  <option value="Stock Bajo">Stock Bajo</option>
                  <option value="Agotado">Agotado</option>
                </select>
              </div>

              <div className="modal-btns">
                <button className="btn-cancelar" onClick={cerrarAgregar}>Cancelar</button>
                <button className="btn-primary" onClick={agregarProducto}>Agregar Producto</button>
              </div>
            </div>
          </div>
        )}

        
        {productoEliminando && (
          <div className="modal-overlay">
            <div className="modal-editar" style={{ maxWidth: '420px' }}>
              <h5 className="modal-titulo">Eliminar Producto</h5>
              <hr />
              <p style={{ color: '#1a1a1a' }}>
                ¿Estás seguro que deseas eliminar el producto:
              </p>
              <p style={{ color: '#1a1a1a' }}>
                <strong>{productoEliminando.nombre}</strong> (Código: {productoEliminando.codigo_producto})?
              </p>
              <p style={{ color: '#e24b4a', fontSize: '13px' }}>
                Esta acción no se puede deshacer.
              </p>
              <div className="modal-btns">
                <button className="btn-cancelar" onClick={cerrarEliminar}>Cancelar</button>
                <button className="btn-primary" style={{ background: '#e24b4a' }} onClick={confirmarEliminar}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}

export default ConsultarProducto;
