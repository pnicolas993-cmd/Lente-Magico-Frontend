import "../Styles/Style.css";
import { useNavigate, Link } from 'react-router-dom';
import Navbar from "../Components/Navbar.jsx";

function Index() {
    const navigate = useNavigate();

    return (
        <>
            <Navbar />

            <div className="container py-4">

                <h4 className="fw-bold mb-1">Bienvenido al módulo de compras</h4>
                <p className="text-muted mb-4">
                    En este panel puedes gestionar todos los proveedores, compras realizadas y categorías de los productos.
                </p>

                <div className="row g-3 mb-4">
                    <div className="col-md-3">
                        <div className="card tarjeta-resumen p-3">
                            <p className="text-muted mb-1" style={{ fontSize: '13px' }}>Productos ingresados</p>
                            <h4 className="fw-bold mb-0">80</h4>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card tarjeta-resumen verde p-3">
                            <p className="text-muted mb-1" style={{ fontSize: '13px' }}>Proveedores registrados</p>
                            <h4 className="fw-bold mb-0">6</h4>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card tarjeta-resumen naranja p-3">
                            <p className="text-muted mb-1" style={{ fontSize: '13px' }}>Categorías registradas</p>
                            <h4 className="fw-bold mb-0">4</h4>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card tarjeta-resumen morado p-3">
                            <p className="text-muted mb-1" style={{ fontSize: '13px' }}>Compras registradas</p>
                            <h4 className="fw-bold mb-0">19</h4>
                        </div>
                    </div>
                </div>

                <h6 className="fw-bold mb-3">Acciones rápidas</h6>
                <div className="row g-3 mb-4">
                    <div className="col-md-4">
                        <Link to="/consultar-proveedores" className="card p-3 accion-rapida d-block text-decoration-none">
                                <p className="fw-bold mb-1">Agregar nuevo proveedor</p>
                                <p className="text-muted mb-0" style={{ fontSize: '13px' }}>Agregar datos de un nuevo proveedor</p>
                            </Link>
                        </div>
                        <div className="col-md-4">
                        <Link to="/consultar-proveedores" className="card p-3 accion-rapida d-block text-decoration-none">
                                <p className="fw-bold mb-1">Editar proveedores</p>
                                <p className="text-muted mb-0" style={{ fontSize: '13px' }}>Modificar los datos de proveedores ya registrados</p>
                            </Link>
                        </div>
                        <div className="col-md-4">
                            <Link to="/categorias" className="card p-3 accion-rapida d-block text-decoration-none">
                                <p className="fw-bold mb-1">Revisar categorías</p>
                                <p className="text-muted mb-0" style={{ fontSize: '13px' }}>Consultar categorías existentes</p>
                            </Link>
                        </div>
                    </div>

                <div className="card">
                    <div className="card-header bg-white fw-bold" style={{ fontSize: '14px' }}>
                        Últimas compras registradas
                    </div>
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
                                <tr>
                                    <td style={{ fontSize: '13px' }}>C-001</td>
                                    <td style={{ fontSize: '13px' }}>Óptica Visión S.A.</td>
                                    <td style={{ fontSize: '13px' }}>11/06/2026</td>
                                    <td style={{ fontSize: '13px' }}>$1.200.000</td>
                                    <td><span className="badge bg-success">Completada</span></td>
                                    <td>
                                        <button className="btn btn-sm btn-outline-primary" onClick={() => navigate('/compra/C-001')}>Ver</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ fontSize: '13px' }}>C-002</td>
                                    <td style={{ fontSize: '13px' }}>Lentes del Sur</td>
                                    <td style={{ fontSize: '13px' }}>09/03/2026</td>
                                    <td style={{ fontSize: '13px' }}>$850.000</td>
                                    <td><span className="badge bg-warning text-dark">Pendiente</span></td>
                                    <td>
                                        <button className="btn btn-sm btn-outline-primary" onClick={() => navigate('/compra/C-002')}>Ver</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ fontSize: '13px' }}>C-003</td>
                                    <td style={{ fontSize: '13px' }}>Distribuidora Ocular</td>
                                    <td style={{ fontSize: '13px' }}>16/05/2026</td>
                                    <td style={{ fontSize: '13px' }}>$2.340.000</td>
                                    <td><span className="badge bg-success">Completada</span></td>
                                    <td>
                                        <button className="btn btn-sm btn-outline-primary" onClick={() => navigate('/compra/C-003')}>Ver</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Index;