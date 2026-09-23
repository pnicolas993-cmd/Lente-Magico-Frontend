import "../Styles/Style.css";
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from "../Components/Navbar.jsx";

const COMPRAS_API_URL = "http://localhost:5000/api/compras";

function Index() {
    const navigate = useNavigate();
    const [compras, setCompras] = useState([]);
    const [facturaVista, setFacturaVista] = useState(null);

    const comprasRespaldo = [
        { id: 'C-001', idProveedor: 'Óptica Visión S.A.', fechaCompra: '11/06/2026', totalFijo: 1200000, estado: 'Completada', detalle: [] },
        { id: 'C-002', idProveedor: 'Lentes del Sur', fechaCompra: '09/03/2026', totalFijo: 850000, estado: 'Pendiente', detalle: [] },
        { id: 'C-003', idProveedor: 'Distribuidora Ocular', fechaCompra: '16/05/2026', totalFijo: 2340000, estado: 'Completada', detalle: [] }
    ];

    useEffect(() => {
        const cargarComprasIndex = async () => {
            try {
                const response = await fetch(COMPRAS_API_URL);
                if (!response.ok) throw new Error('Error al obtener compras');
                const data = await response.json();
                if (data && Array.isArray(data) && data.length > 0) {
                    setCompras(data);
                } else {
                    setCompras(comprasRespaldo);
                }
            } catch (error) {
                setCompras(comprasRespaldo);
            }
        };
        cargarComprasIndex();
    }, []);

    const obtenerTotalCompra = (c) => {
        if (c.totalFijo) return c.totalFijo;
        if (c.total) return Number(c.total);
        if (c.detalle && c.detalle.length > 0) {
            return c.detalle.reduce((acc, d) => acc + (Number(d.cantidad || 0) * Number(d.costoUnitario || 0)), 0);
        }
        return 0;
    };

    const formatPeso = (valor) =>
        '$' + Number(valor).toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

    return (
        <>
            <Navbar />

            {/* Modal de visualización */}
            {facturaVista && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999 }}>
                    <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '90%' }}>
                        <h5 className="fw-bold">Detalle de {facturaVista.id}</h5>
                        <p className="text-muted" style={{ fontSize: '13px' }}>Proveedor: {facturaVista.idProveedor || facturaVista.proveedor}</p>
                        <p style={{ fontSize: '14px' }}>Total: <strong>{formatPeso(obtenerTotalCompra(facturaVista))}</strong></p>
                        <button className="btn btn-outline-secondary btn-sm" onClick={() => setFacturaVista(null)}>Cerrar</button>
                    </div>
                </div>
            )}

            <div className="container py-4">
                <h4 className="fw-bold mb-1">Bienvenido al módulo de compras</h4>
                <p className="text-muted mb-4">
                    En este panel puedes gestionar todos los proveedores, compras realizadas y categorías de los productos.
                </p>

                <div className="row g-3 mb-4">
                    <div className="col-md-3"><div className="card tarjeta-resumen p-3"><p className="text-muted mb-1" style={{ fontSize: '13px' }}>Productos ingresados</p><h4 className="fw-bold mb-0">80</h4></div></div>
                    <div className="col-md-3"><div className="card tarjeta-resumen verde p-3"><p className="text-muted mb-1" style={{ fontSize: '13px' }}>Proveedores registrados</p><h4 className="fw-bold mb-0">6</h4></div></div>
                    <div className="col-md-3"><div className="card tarjeta-resumen naranja p-3"><p className="text-muted mb-1" style={{ fontSize: '13px' }}>Categorías registradas</p><h4 className="fw-bold mb-0">4</h4></div></div>
                    <div className="col-md-3"><div className="card tarjeta-resumen morado p-3"><p className="text-muted mb-1" style={{ fontSize: '13px' }}>Compras registradas</p><h4 className="fw-bold mb-0">{compras.length}</h4></div></div>
                </div>

                <h6 className="fw-bold mb-3">Acciones rápidas</h6>
                <div className="row g-3 mb-4">
                    <div className="col-md-4"><Link to="/consultar-proveedores" className="card p-3 accion-rapida d-block text-decoration-none"><p className="fw-bold mb-1">Agregar nuevo proveedor</p><p className="text-muted mb-0" style={{ fontSize: '13px' }}>Agregar datos de un nuevo proveedor</p></Link></div>
                    <div className="col-md-4"><Link to="/consultar-proveedores" className="card p-3 accion-rapida d-block text-decoration-none"><p className="fw-bold mb-1">Editar proveedores</p><p className="text-muted mb-0" style={{ fontSize: '13px' }}>Modificar los datos de proveedores ya registrados</p></Link></div>
                    <div className="col-md-4"><Link to="/categorias" className="card p-3 accion-rapida d-block text-decoration-none"><p className="fw-bold mb-1">Revisar categorías</p><p className="text-muted mb-0" style={{ fontSize: '13px' }}>Consultar categorías existentes</p></Link></div>
                </div>

                <div className="card">
                    <div className="card-header bg-white fw-bold" style={{ fontSize: '14px' }}>Últimas compras registradas</div>
                    <div className="card-body p-0">
                        <table className="table table-borderless mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th style={{ fontSize: '12px' }}># Compra</th>
                                    <th style={{ fontSize: '12px' }}>Proveedor</th>
                                    <th style={{ fontSize: '12px' }}>Fecha</th>
                                    <th style={{ fontSize: '12px' }}>Total</th>
                                    <th style={{ fontSize: '12px' }}>Estado</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {compras.slice(0, 5).map((c) => (
                                    <tr key={c.id}>
                                        <td style={{ fontSize: '13px' }}>{c.id}</td>
                                        <td style={{ fontSize: '13px' }}>{c.idProveedor || c.proveedor}</td>
                                        <td style={{ fontSize: '13px' }}>{c.fechaCompra || c.fecha || "Sin fecha"}</td>
                                        <td style={{ fontSize: '13px' }}>{formatPeso(obtenerTotalCompra(c))}</td>
                                        <td><span className={`badge ${c.estado === 'Completada' ? 'bg-success' : 'bg-warning text-dark'}`}>{c.estado}</span></td>
                                        <td>
                                            <button className="btn btn-sm btn-outline-primary" onClick={() => setFacturaVista(c)}>Ver</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Index;