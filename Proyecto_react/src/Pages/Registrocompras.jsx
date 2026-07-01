import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'; // 1. Agrega useEffect
import "../Styles/Style.css";
import Nav from '../Components/Nav.jsx';
import { comprasService } from '../api/comprasService'; // 2. Importa el servicio

// Eliminamos "comprasIniciales" estáticas porque ahora vendrán de la API
const proveedoresLista = [
    'Óptica Visión S.A.',
    'Lentes del Sur',
    'Distribuidora Ocular',
    'Visión Total Ltda.',
];

const productosLista = [
    { id: 'PR-001', nombre: 'Lente bifocal 2.5' },
    { id: 'PR-002', nombre: 'Montura titanio' },
    { id: 'PR-003', nombre: 'Lente contacto diario' },
    { id: 'PR-004', nombre: 'Estuche rígido' },
];

const formVacio = {
    idProveedor: '',
    fechaCompra: '',
    numComprobante: '',
    estado: 'Pendiente',
    detalle: [{ idProducto: '', cantidad: '', costoUnitario: '' }],
};

function RegistroCompras() {
    const navigate = useNavigate();
    const [busqueda, setBusqueda] = useState('');
    const [compras, setCompras] = useState([]); // 3. Inicializa como array vacío
    const [mostrarAgregar, setMostrarAgregar] = useState(false);
    const [formNuevo, setFormNuevo] = useState(formVacio);
    const [facturaVista, setFacturaVista] = useState(null);

    // 4. Cargar las compras desde el servidor al montar el componente
    useEffect(() => {
        cargarCompras();
    }, []);

    const cargarCompras = async () => {
        try {
            const data = await comprasService.getCompras();
            setCompras(data);
        } catch (error) {
            console.error("Error al traer las compras de la API:", error);
        }
    };

    const comprasFiltradas = compras.filter((c) =>
        c.id?.toString().toLowerCase().includes(busqueda.toLowerCase()) ||
        c.idProveedor?.toLowerCase().includes(busqueda.toLowerCase()) ||
        c.numComprobante?.toLowerCase().includes(busqueda.toLowerCase()) ||
        c.estado?.toLowerCase().includes(busqueda.toLowerCase())
    );

    const calcularTotal = (detalle) =>
        detalle ? detalle.reduce((acc, d) => acc + (Number(d.cantidad) * Number(d.costoUnitario)), 0) : 0;

    const formatPeso = (valor) =>
        '$' + Number(valor).toLocaleString('es-CO');

    const getNombreProducto = (id) =>
        productosLista.find((p) => p.id === id)?.nombre || id;

    const totalGeneral = compras.reduce((acc, c) => acc + calcularTotal(c.detalle), 0);
    const totalCompletadas = compras.filter(c => c.estado === 'Completada').length;
    const totalPendientes = compras.filter(c => c.estado === 'Pendiente').length;

    const handleChangeNuevo = (e) => setFormNuevo({ ...formNuevo, [e.target.name]: e.target.value });

    const handleChangeDetalleNuevo = (index, e) => {
        const nuevaLinea = [...formNuevo.detalle];
        nuevaLinea[index][e.target.name] = e.target.value;
        setFormNuevo({ ...formNuevo, detalle: nuevaLinea });
    };

    const handleAgregarLineaNuevo = () =>
        setFormNuevo({ ...formNuevo, detalle: [...formNuevo.detalle, { idProducto: '', cantidad: '', costoUnitario: '' }] });

    const handleEliminarLineaNuevo = (index) =>
        setFormNuevo({ ...formNuevo, detalle: formNuevo.detalle.filter((_, i) => i !== index) });

    // 5. Ajustamos para guardar en la API mediante POST
    const handleAgregar = async () => {
        try {
            // Nota: JSON-Server autogenerará un ID único numérico o string, 
            // pero si deseas conservar tu patrón "C-00X", mapeamos los datos antes de enviar:
            const nuevoId = `C-00${compras.length + 1}`;
            const objetoAEnviar = {
                ...formNuevo,
                id: nuevoId,
                // Validamos que los números se guarden como enteros/flotantes en la BD
                detalle: formNuevo.detalle.map(d => ({
                    idProducto: d.idProducto,
                    cantidad: Number(d.cantidad),
                    costoUnitario: Number(d.costoUnitario)
                }))
            };

            await comprasService.crearCompra(objetoAEnviar);

            // Recargamos el estado local consultando la API fresca
            cargarCompras();

            setFormNuevo(formVacio);
            setMostrarAgregar(false);
        } catch (error) {
            console.error("Error al guardar la compra en el servidor:", error);
        }
    };

    const estadoColor = (estado) => {
        if (estado === 'Completada') return { bg: '#d1fae5', color: '#065f46', border: '#6ee7b7' };
        if (estado === 'Pendiente') return { bg: '#fef3c7', color: '#92400e', border: '#fcd34d' };
        return { bg: '#f3f4f6', color: '#374151', border: '#d1d5db' };
    };

    return (
        <>


            {/* Modal Ver Factura */}
            {facturaVista && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                    style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 9999 }}>
                    <div className="shadow-lg rounded-4 bg-white p-4" style={{ maxWidth: '580px', width: '100%' }}>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div>
                                <h5 className="fw-bold mb-0">🧾 Factura de compra</h5>
                                <small className="text-muted">{facturaVista.numComprobante}</small>
                            </div>
                            <span style={{
                                ...(() => { const s = estadoColor(facturaVista.estado); return { backgroundColor: s.bg, color: s.color, border: `1px solid ${s.border}` }; })(),
                                padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600'
                            }}>
                                {facturaVista.estado}
                            </span>
                        </div>
                        <hr />
                        <div className="row g-2 mb-3" style={{ fontSize: '13px' }}>
                            {[
                                ['N° Compra', facturaVista.id],
                                ['Proveedor', facturaVista.idProveedor],
                                ['Fecha', facturaVista.fechaCompra],
                                ['Comprobante', facturaVista.numComprobante],
                            ].map(([label, val]) => (
                                <div className="col-6" key={label}>
                                    <div className="rounded-3 p-2" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                                        <div className="text-muted" style={{ fontSize: '11px' }}>{label}</div>
                                        <div className="fw-semibold">{val}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <table className="table table-sm mb-3" style={{ fontSize: '13px' }}>
                            <thead style={{ backgroundColor: '#f1f5f9' }}>
                                <tr>
                                    <th>Producto</th>
                                    <th className="text-center">Cant.</th>
                                    <th className="text-end">Costo unit.</th>
                                    <th className="text-end">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {facturaVista.detalle.map((d, i) => (
                                    <tr key={i}>
                                        <td>{getNombreProducto(d.idProducto)}</td>
                                        <td className="text-center">{d.cantidad}</td>
                                        <td className="text-end">{formatPeso(d.costoUnitario)}</td>
                                        <td className="text-end">{formatPeso(Number(d.cantidad) * Number(d.costoUnitario))}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="3" className="text-end fw-bold">Total</td>
                                    <td className="text-end fw-bold" style={{ color: '#0f172a' }}>{formatPeso(calcularTotal(facturaVista.detalle))}</td>
                                </tr>
                            </tfoot>
                        </table>
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-sm btn-outline-secondary rounded-pill px-4" onClick={() => setFacturaVista(null)}>Cerrar</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="container py-4">

                {/* Encabezado con stats */}
                <div className="row g-3 mb-4 align-items-center">
                    <div className="col-md-5">
                        <h4 className="fw-bold mb-0">Registro de compras</h4>
                        <p className="text-muted mb-0" style={{ fontSize: '13px' }}>Gestión de compras a proveedores</p>
                    </div>
                    <div className="col-md-7">
                        <div className="d-flex gap-3 justify-content-md-end flex-wrap">
                            {[
                                { label: 'Total compras', value: compras.length, color: '#3b82f6', bg: '#eff6ff' },
                                { label: 'Completadas', value: totalCompletadas, color: '#10b981', bg: '#ecfdf5' },
                                { label: 'Pendientes', value: totalPendientes, color: '#f59e0b', bg: '#fffbeb' },
                            ].map(({ label, value, color, bg }) => (
                                <div key={label} className="rounded-3 px-3 py-2 text-center" style={{ backgroundColor: bg, minWidth: '90px' }}>
                                    <div className="fw-bold" style={{ color, fontSize: '20px' }}>{value}</div>
                                    <div style={{ fontSize: '11px', color: '#64748b' }}>{label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Formulario agregar */}
                {mostrarAgregar && (
                    <div className="card rounded-4 border-0 shadow-sm p-4 mb-4" style={{ borderLeft: '4px solid #3b82f6 !important' }}>
                        <h6 className="fw-bold mb-3"> Registrar nueva compra</h6>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label" style={{ fontSize: '13px' }}>Proveedor</label>
                                <select className="form-select" name="idProveedor" value={formNuevo.idProveedor} onChange={handleChangeNuevo}>
                                    <option value="">Seleccionar proveedor</option>
                                    {proveedoresLista.map((p) => <option key={p} value={p}>{p}</option>)}
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label" style={{ fontSize: '13px' }}>Fecha de compra</label>
                                <input type="date" className="form-control" name="fechaCompra" value={formNuevo.fechaCompra} onChange={handleChangeNuevo} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label" style={{ fontSize: '13px' }}>N° Comprobante</label>
                                <input type="text" className="form-control" name="numComprobante" value={formNuevo.numComprobante} onChange={handleChangeNuevo} placeholder="FAC-0000" />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label" style={{ fontSize: '13px' }}>Estado</label>
                                <select className="form-select" name="estado" value={formNuevo.estado} onChange={handleChangeNuevo}>
                                    <option value="Pendiente">Pendiente</option>
                                    <option value="Completada">Completada</option>
                                    <option value="Anulada">Anulada</option>
                                </select>
                            </div>
                            <div className="col-12">
                                <label className="form-label fw-bold" style={{ fontSize: '13px' }}>Detalle de compra</label>
                                <table className="table table-bordered table-sm">
                                    <thead className="table-light">
                                        <tr>
                                            <th style={{ fontSize: '12px' }}>Producto</th>
                                            <th style={{ fontSize: '12px' }}>Cantidad</th>
                                            <th style={{ fontSize: '12px' }}>Costo unitario</th>
                                            <th style={{ fontSize: '12px' }}>Subtotal</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {formNuevo.detalle.map((d, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <select className="form-select form-select-sm" name="idProducto" value={d.idProducto} onChange={(e) => handleChangeDetalleNuevo(index, e)}>
                                                        <option value="">Seleccionar</option>
                                                        {productosLista.map((p) => <option key={p.id} value={p.id}>{p.nombre}</option>)}
                                                    </select>
                                                </td>
                                                <td><input type="number" className="form-control form-control-sm" name="cantidad" value={d.cantidad} onChange={(e) => handleChangeDetalleNuevo(index, e)} min="1" /></td>
                                                <td><input type="number" className="form-control form-control-sm" name="costoUnitario" value={d.costoUnitario} onChange={(e) => handleChangeDetalleNuevo(index, e)} min="0" /></td>
                                                <td style={{ fontSize: '13px', verticalAlign: 'middle' }}>{formatPeso(Number(d.cantidad || 0) * Number(d.costoUnitario || 0))}</td>
                                                <td>{formNuevo.detalle.length > 1 && <button className="btn btn-sm btn-outline-danger" onClick={() => handleEliminarLineaNuevo(index)}>✕</button>}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan="3" className="text-end fw-bold" style={{ fontSize: '13px' }}>Total</td>
                                            <td className="fw-bold" style={{ fontSize: '13px' }}>{formatPeso(calcularTotal(formNuevo.detalle))}</td>
                                            <td></td>
                                        </tr>
                                    </tfoot>
                                </table>
                                <button className="btn btn-outline-primary btn-sm" onClick={handleAgregarLineaNuevo}>+ Agregar producto</button>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end gap-2 mt-3">
                            <button className="btn btn-outline-secondary btn-sm rounded-pill px-4" onClick={() => { setFormNuevo(formVacio); setMostrarAgregar(false); }}>Cancelar</button>
                            <button className="btn btn-primary btn-sm rounded-pill px-4" onClick={handleAgregar}>Registrar compra</button>
                        </div>
                    </div>
                )}

                {/* Barra de búsqueda + botón */}
                <div className="d-flex gap-2 mb-4 align-items-center">
                    <div className="input-group" style={{ maxWidth: '380px' }}>
                        <span className="input-group-text bg-white border-end-0">🔍</span>
                        <input
                            type="text"
                            className="form-control border-start-0"
                            placeholder="Buscar por ID, proveedor, estado..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            style={{ boxShadow: 'none' }}
                        />
                    </div>
                    <button className="btn btn-primary rounded-pill px-4 ms-auto" onClick={() => setMostrarAgregar(true)}>
                        + Registrar compra
                    </button>
                </div>

                {/* Cards de compras */}
                <div className="row g-3 mb-4">
                    {comprasFiltradas.length > 0 ? comprasFiltradas.map((c) => {
                        const est = estadoColor(c.estado);
                        return (
                            <div className="col-12" key={c.id}>
                                <div className="rounded-4 bg-white shadow-sm p-3 d-flex align-items-center gap-3"
                                    style={{ border: '1px solid #e2e8f0', transition: 'box-shadow 0.2s' }}>

                                    {/* ID badge */}
                                    <div className="rounded-3 d-flex align-items-center justify-content-center fw-bold"
                                        style={{ minWidth: '60px', height: '50px', backgroundColor: '#eff6ff', color: '#3b82f6', fontSize: '13px' }}>
                                        {c.id}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-grow-1">
                                        <div className="fw-semibold" style={{ fontSize: '14px' }}>{c.idProveedor}</div>
                                        <div className="text-muted" style={{ fontSize: '12px' }}>
                                            📅 {c.fechaCompra} &nbsp;·&nbsp; 📄 {c.numComprobante}
                                        </div>
                                    </div>

                                    {/* Total */}
                                    <div className="text-end me-3">
                                        <div className="fw-bold" style={{ fontSize: '15px', color: '#0f172a' }}>{formatPeso(calcularTotal(c.detalle))}</div>
                                        <div className="text-muted" style={{ fontSize: '11px' }}>Total</div>
                                    </div>

                                    {/* Estado */}
                                    <span className="rounded-pill px-3 py-1 me-2"
                                        style={{ backgroundColor: est.bg, color: est.color, border: `1px solid ${est.border}`, fontSize: '12px', fontWeight: '600', whiteSpace: 'nowrap' }}>
                                        {c.estado}
                                    </span>

                                    {/* Acción */}
                                    <button className="btn btn-sm rounded-pill px-3"
                                        style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', fontSize: '12px', whiteSpace: 'nowrap' }}
                                        onClick={() => setFacturaVista(c)}>
                                        🧾 Ver factura
                                    </button>
                                </div>
                            </div>
                        );
                    }) : (
                        <div className="col-12 text-center text-muted py-5" style={{ fontSize: '14px' }}>
                            No se encontraron compras con ese criterio.
                        </div>
                    )}
                </div>

                {/* Resumen total */}
                <div className="rounded-4 p-3 mb-4 d-flex justify-content-between align-items-center"
                    style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <span className="text-muted" style={{ fontSize: '13px' }}>
                        {comprasFiltradas.length} compra(s) encontrada(s)
                    </span>
                    <span className="fw-bold" style={{ fontSize: '15px' }}>
                        Total general: <span style={{ color: '#3b82f6' }}>{formatPeso(comprasFiltradas.reduce((a, c) => a + calcularTotal(c.detalle), 0))}</span>
                    </span>
                </div>

                <button className="btn btn-outline-secondary btn-sm rounded-pill px-4" onClick={() => navigate('/index')}>
                    ← Volver al inicio
                </button>

            </div>
        </>
    );
}

export default RegistroCompras;