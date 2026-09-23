import "../styles/index.css"; // Usa ./ y 'index.css' en minúscula
import "../styles/productos.css"; // Para reutilizar el estilo de tabla-productos
import { useNavigate, Link } from 'react-router-dom';
import Nav from "../components/Nav.jsx";

function Index() {
    const navigate = useNavigate();

    return (
        <>
            <Nav />

            <div className="container py-4">
                <h4 className="fw-bold mb-1">Bienvenido al módulo de Bodega</h4>
                <p className="text-muted mb-4">
                    En este panel puede encontrar todo lo relacionado a productos desde consultar hasta actualizar
                </p>

                <div className="row g-3 mb-4">
                    
                    <div className="col-md-3">
                        <div className="card tarjeta-resumen borde-total p-3">
                            <p className="text-muted mb-1" style={{ fontSize: '13px' }}>cantidad Productos</p>
                            <h4 className="fw-bold mb-0">80</h4>
                        </div>
                    </div>

                    
                    <div className="col-md-3">
                        <div className="card tarjeta-resumen verde borde-consultados p-3">
                            <p className="text-muted mb-1" style={{ fontSize: '13px' }}>Productos Consultados</p>
                            <h4 className="fw-bold mb-0">15</h4>
                        </div>
                    </div>

                    
                    <div className="col-md-3">
                        <div className="card tarjeta-resumen naranja borde-editados p-3">
                            <p className="text-muted mb-1" style={{ fontSize: '13px' }}>Productos Editados</p>
                            <h4 className="fw-bold mb-0">5</h4>
                        </div>
                    </div>

                    
                    <div className="col-md-3">
                        <div className="card tarjeta-resumen morado borde-eliminados p-3">
                            <p className="text-muted mb-1" style={{ fontSize: '13px' }}>Productos Eliminados</p>
                            <h4 className="fw-bold mb-0">20</h4>
                        </div>
                    </div>
                </div>

                <h5 className="fw-bold mb-3">Últimos Productos Agregados</h5>

                <table className="tabla-productos tabla-inicio">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Producto</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>001</td>
                            <td>Montura Ray-Ban</td>
                            <td>Monturas</td>
                            <td>$250.000</td>
                            <td>12</td>
                        </tr>
                        <tr>
                            <td>002</td>
                            <td>Lente Progresivo</td>
                            <td>Lentes</td>
                            <td>$180.000</td>
                            <td>8</td>
                        </tr>
                        <tr>
                            <td>003</td>
                            <td>Estuche Rígido</td>
                            <td>Accesorios</td>
                            <td>$35.000</td>
                            <td>20</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Index;