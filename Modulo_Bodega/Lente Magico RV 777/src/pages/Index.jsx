import "../styles/Index.css";
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
            </div>
        </>
    );
}

export default Index;
