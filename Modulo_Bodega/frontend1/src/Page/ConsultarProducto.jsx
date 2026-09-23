import React, { useState, useEffect } from 'react';
import '../styles/productos.css';
import Nav from '../components/Nav';


const API_URL = 'http://localhost:5000/api/productos';

function ConsultarProducto() {

    const [productos, setProductos] = useState([]);
    const [productoEditando, setProductoEditando] = useState(null);
    const [productoEliminando, setProductoEliminando] = useState(null);
    const [busqueda, setBusqueda] = useState('');
    const [mostrarInventario, setMostrarInventario] = useState(false);

    const cargarProductos = async () => {

        try {

            const respuesta = await fetch(API_URL);

            if (!respuesta.ok) {
                throw new Error('No se pudieron consultar los productos');
            }

            const datos = await respuesta.json();

            setProductos(datos);

        } catch (error) {

            console.error(
                'Error al cargar productos:',
                error
            );

        }

    };

    useEffect(() => {

        cargarProductos();

        window.addEventListener(
            'inventario-actualizado',
            cargarProductos
        );

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

        <>

            <Nav />

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

        </>

    );

}

export default ConsultarProducto;