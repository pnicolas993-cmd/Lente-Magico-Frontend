import React, { useState, useEffect } from 'react';
import '../styles/productos.css';
import Nav from '../components/Nav';


const API_URL = 'http://localhost:5000/api/productos';

function ConsultarProducto() {

  
<<<<<<< HEAD
=======
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
>>>>>>> 9ac178e7225994d445cbcb86999111d77a7f94b7

    const [productos, setProductos] = useState([]);
    const [productoEditando, setProductoEditando] = useState(null);
    const [productoEliminando, setProductoEliminando] = useState(null);
    const [busqueda, setBusqueda] = useState('');
    const [mostrarInventario, setMostrarInventario] = useState(false);

<<<<<<< HEAD
    const cargarProductos = async () => {
=======
  const abrirModal = (producto) => setProductoEditando({ ...producto });
  const cerrarModal = () => setProductoEditando(null);
>>>>>>> 9ac178e7225994d445cbcb86999111d77a7f94b7

        try {

            const respuesta = await fetch(API_URL);

<<<<<<< HEAD
            if (!respuesta.ok) {
                throw new Error('No se pudieron consultar los productos');
            }
=======
  
  const abrirAgregar = () => {
    const maxCodigo = productos.length > 0
      ? Math.max(...productos.map(p => Number(p.codigo_producto)))
      : 0;
    setNuevoProducto({ ...productoVacio, codigo_producto: maxCodigo + 1 });
    setMostrarAgregar(true);
  };
>>>>>>> 9ac178e7225994d445cbcb86999111d77a7f94b7

            const datos = await respuesta.json();

            setProductos(datos);

        } catch (error) {

            console.error(
                'Error al cargar productos:',
                error
            );

        }

    };

<<<<<<< HEAD
    useEffect(() => {
=======
  
  const abrirEliminar = (producto) => setProductoEliminando({ ...producto });
  const cerrarEliminar = () => setProductoEliminando(null);
>>>>>>> 9ac178e7225994d445cbcb86999111d77a7f94b7

        cargarProductos();

<<<<<<< HEAD
        window.addEventListener(
            'inventario-actualizado',
            cargarProductos
        );
=======
  
  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    String(p.codigo_producto).includes(busqueda)
  );
>>>>>>> 9ac178e7225994d445cbcb86999111d77a7f94b7

        return () => {

            window.removeEventListener(
                'inventario-actualizado',
                cargarProductos
            );
        };
    }, []);

    const abrirModal = (producto) => {

        setProductoEditando({
            ...producto
        });

    };

    const cerrarModal = () => {

        setProductoEditando(null);

    };

    const guardarCambios = async () => {

        if (!productoEditando) {
            return;
        }

        const productoActualizado = {

            nombre: productoEditando.nombre,

            categoria: productoEditando.categoria,

            precio_venta:
                Number(productoEditando.precio_venta) || 0,

            stock_actual:
                Number(productoEditando.stock_actual) || 0,

            stock_minimo:
                Number(productoEditando.stock_minimo) || 0

        };

        try {

            const respuesta = await fetch(
                `${API_URL}/${productoEditando.id}`,
                {
                    method: 'PUT',

                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify(
                        productoActualizado
                    )
                }
            );

            const datos = await respuesta.json();

            if (!respuesta.ok) {

                throw new Error(
                    datos.mensaje ||
                    'No se pudo actualizar el producto'
                );
            }

            await cargarProductos();

            cerrarModal();

        } catch (error) {

            console.error(
                'Error al editar producto:',
                error
            );

            alert(
                error.message ||
                'No se pudo actualizar el producto'
            );
        }
    };

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setProductoEditando(prev => ({

            ...prev,

            [name]: value

        }));
    };

    const abrirEliminar = (producto) => {

        setProductoEliminando({
            ...producto
        });
    };

    const cerrarEliminar = () => {

        setProductoEliminando(null);

    };

    const confirmarEliminar = async () => {

        if (!productoEliminando) {
            return;
        }

        try {

            const respuesta = await fetch(
                `${API_URL}/${productoEliminando.id}`,
                {
                    method: 'DELETE'
                }
            );

            const datos = await respuesta.json();

            if (!respuesta.ok) {

                throw new Error(
                    datos.mensaje ||
                    'No se pudo eliminar el producto'
                );
            }

            await cargarProductos();

            cerrarEliminar();

        } catch (error) {

            console.error(
                'Error al eliminar producto:',
                error
            );

            alert(
                error.message ||
                'No se pudo eliminar el producto'
            );
        }
    };

    const productosFiltrados = productos.filter(producto => {

        const nombre =
            producto?.nombre?.toLowerCase() || '';

        const codigo =
            String(
                producto?.codigo_producto || ''
            );

        const textoBusqueda =
            busqueda.toLowerCase();

        return (
            nombre.includes(textoBusqueda) ||
            codigo.includes(textoBusqueda)
        );
    });

    return (

        <div className="page-container">

            <div className="top-bar">

                <h2>
                    Consultar Productos
                </h2>

                <div
                    style={{
                        display: 'flex',
                        gap: '10px'
                    }}
                >

                    <button
                        className="btn-primary"
                        onClick={() =>
                            setMostrarInventario(true)
                        }
                    >
                        📦 Inventario
                    </button>

                </div>

            </div>

            <input
                type="text"
                className="buscador"
                placeholder="Buscar..."
                value={busqueda}
                onChange={(e) =>
                    setBusqueda(e.target.value)
                }
            />

            <table className="tabla-productos">

                <thead>

                    <tr>

                        <th>
                            Código
                        </th>

                        <th>
                            Producto
                        </th>

                        <th>
                            Categoría
                        </th>

                        <th>
                            Precio
                        </th>

                        <th>
                            Stock
                        </th>

                        <th>
                            Acciones
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {productosFiltrados.map(producto => (

                        <tr
                            key={producto.id}
                        >

                            <td>
                                {producto.codigo_producto}
                            </td>

                            <td>
                                <strong>
                                    {producto.nombre}
                                </strong>
                            </td>

                            <td>
                                {producto.categoria}
                            </td>

                            <td>
                                $
                                {Number(
                                    producto.precio_venta || 0
                                ).toLocaleString()}
                            </td>

                            <td>
                                {producto.stock_actual}
                            </td>

                            <td>

                                <button
                                    className="btn-accion"
                                    title="Editar"
                                    aria-label="Editar"
                                    onClick={() =>
                                        abrirModal(producto)
                                    }
                                >
                                    ✏️
                                </button>

                                <button
                                    className="btn-accion eliminar"
                                    title="Eliminar"
                                    aria-label="Eliminar"
                                    onClick={() =>
                                        abrirEliminar(producto)
                                    }
                                >
                                    🗑️
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

            {productoEditando && (

                <div className="modal-overlay">

                    <div
                        className="modal-editar"
                        style={{
                            maxWidth: '400px',
                            width: '90%'
                        }}
                    >

                        <h5 className="modal-titulo">
                            Editar Producto
                        </h5>

                        <div
                            className="form-container"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px'
                            }}
                        >

                            <div className="form-group">

                                <label
                                    style={{
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Nombre del Producto
                                </label>

                                <input
                                    type="text"
                                    name="nombre"
                                    className="form-control"
                                    value={
                                        productoEditando.nombre || ''
                                    }
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="form-group">

                                <label
                                    style={{
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Categoría
                                </label>

                                <select
                                    name="categoria"
                                    className="form-select"
                                    value={
                                        productoEditando.categoria || ''
                                    }
                                    onChange={handleChange}
                                >

                                    <option value="">
                                        Seleccione una categoría
                                    </option>

                                    <option value="Monturas">
                                        Monturas
                                    </option>

                                    <option value="Lentes">
                                        Lentes
                                    </option>

                                    <option value="Accesorios">
                                        Accesorios
                                    </option>

                                </select>

                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    gap: '10px'
                                }}
                            >

                                <div
                                    className="form-group"
                                    style={{
                                        flex: 1
                                    }}
                                >

                                    <label
                                        style={{
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        Stock Actual
                                    </label>

                                    <input
                                        type="number"
                                        name="stock_actual"
                                        className="form-control"
                                        value={
                                            productoEditando.stock_actual ?? 0
                                        }
                                        onChange={handleChange}
                                    />

                                </div>

                                <div
                                    className="form-group"
                                    style={{
                                        flex: 1
                                    }}
                                >

                                    <label
                                        style={{
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        Stock Mínimo
                                    </label>

                                    <input
                                        type="number"
                                        name="stock_minimo"
                                        className="form-control"
                                        value={
                                            productoEditando.stock_minimo ?? 0
                                        }
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>

                            <div className="form-group">

                                <label
                                    style={{
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Precio de Venta
                                </label>

                                <input
                                    type="number"
                                    name="precio_venta"
                                    className="form-control"
                                    value={
                                        productoEditando.precio_venta ?? 0
                                    }
                                    onChange={handleChange}
                                />

                            </div>

                        </div>

                        <div
                            className="modal-btns"
                            style={{
                                marginTop: '20px',
                                display: 'flex',
                                justifyContent: 'flex-end',
                                gap: '10px'
                            }}
                        >

                            <button
                                className="btn-cancelar"
                                onClick={cerrarModal}
                            >
                                Cancelar
                            </button>


                            <button
                                className="btn-primary"
                                onClick={guardarCambios}
                            >
                                Guardar Cambios
                            </button>

                        </div>

                    </div>

                </div>
            )}

            {productoEliminando && (

                <div className="modal-overlay">

                    <div
                        className="modal-editar"
                        style={{
                            textAlign: 'center',
                            padding: '20px'
                        }}
                    >

                        <h5
                            style={{
                                color: '#d9534f',
                                marginBottom: '15px'
                            }}
                        >
                            Confirmar Eliminación
                        </h5>

                        <p>

                            ¿Estás seguro de que deseas
                            eliminar

                            {' '}

                            <strong>
                                {productoEliminando.nombre}
                            </strong>

                            ?

                            Esta acción no se puede deshacer.

                        </p>

                        <div
                            className="modal-btns"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '15px',
                                marginTop: '20px'
                            }}
                        >

                            <button
                                className="btn-cancelar"
                                onClick={cerrarEliminar}
                            >
                                Cancelar
                            </button>

                            <button
                                className="btn-primary"
                                style={{
                                    backgroundColor: '#d9534f'
                                }}
                                onClick={confirmarEliminar}
                            >
                                Eliminar Producto
                            </button>

                        </div>

                    </div>

                </div>
            )}

            {mostrarInventario && (

                <div className="modal-overlay">

                    <div
                        className="modal-editar"
                        style={{
                            maxWidth: '700px',
                            width: '95%'
                        }}
                    >

                        <h5 className="modal-titulo">
                            Estado del Inventario
                        </h5>


                        <table className="tabla-productos">

                            <thead>

                                <tr>

                                    <th>
                                        Producto
                                    </th>

                                    <th>
                                        Categoría
                                    </th>

                                    <th>
                                        Stock Actual
                                    </th>

                                    <th>
                                        Stock Mínimo
                                    </th>

                                    <th>
                                        Estado
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {productos.map(producto => {

                                    const bajoStock =
                                        Number(
                                            producto.stock_actual
                                        ) <=
                                        Number(
                                            producto.stock_minimo
                                        );


                                    return (

                                        <tr
                                            key={producto.id}
                                            style={{
                                                backgroundColor:
                                                    bajoStock
                                                        ? '#fdecea'
                                                        : 'transparent'
                                            }}
                                        >

                                            <td>
                                                <strong>
                                                    {producto.nombre}
                                                </strong>
                                            </td>


                                            <td>
                                                {producto.categoria}
                                            </td>


                                            <td>
                                                {producto.stock_actual}
                                            </td>


                                            <td>
                                                {producto.stock_minimo}
                                            </td>


                                            <td>

                                                <span
                                                    style={{
                                                        color:
                                                            bajoStock
                                                                ? '#d9534f'
                                                                : '#28a745',

                                                        fontWeight:
                                                            'bold'
                                                    }}
                                                >

                                                    {bajoStock
                                                        ? 'Stock Bajo'
                                                        : 'Suficiente'}

                                                </span>

                                            </td>

                                        </tr>

                                    );

                                })}

                            </tbody>

                        </table>

                        <div
                            className="modal-btns"
                            style={{
                                marginTop: '20px',
                                display: 'flex',
                                justifyContent: 'flex-end'
                            }}
                        >

                            <button
                                className="btn-cancelar"
                                onClick={() =>
                                    setMostrarInventario(false)
                                }
                            >
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

<<<<<<< HEAD
=======
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
>>>>>>> 9ac178e7225994d445cbcb86999111d77a7f94b7
}

export default ConsultarProducto;
