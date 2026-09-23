import React, {
  useState,
  useEffect,
  useCallback
} from 'react';

import {
  Modal,
  Button,
  Form,
  Table,
  Pagination,
  Alert,
  InputGroup
} from 'react-bootstrap';


// ============================================================
// URL CORRECTA DEL BACKEND
// ============================================================
const API_URL = 'http://localhost:5000/api/agendar-consulta';


// ============================================================
// FORMULARIO INICIAL
// ============================================================
const formularioInicial = {
  id_tipo_documento: '',
  numero_documento: '',
  primer_nombre: '',
  segundo_nombre: '',
  primer_apellido: '',
  segundo_apellido: '',
  fecha_nacimiento: '',
  motivo: '',
  fecha_hora: '',
  estado: 'Pendiente'
};


function AgendarConsulta() {

  // ============================================================
  // ESTADOS
  // ============================================================

  const [consultas, setConsultas] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const [success, setSuccess] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');

  const [debouncedSearch, setDebouncedSearch] = useState('');

  const [showModal, setShowModal] = useState(false);

  const [editingConsulta, setEditingConsulta] = useState(null);

  const [formData, setFormData] = useState(
    formularioInicial
  );

  const [validated, setValidated] = useState(false);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    limit: 5,
    hasNextPage: false,
    hasPrevPage: false
  });


  // ============================================================
  // BÚSQUEDA
  // ============================================================

  useEffect(() => {

    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);

  }, [searchTerm]);


  // ============================================================
  // CARGAR CONSULTAS
  // ============================================================

  const loadConsultas = useCallback(
    async (page = 1) => {

      try {

        setLoading(true);
        setError(null);

        const response = await fetch(
          `${API_URL}?page=${page}&limit=5&search=${encodeURIComponent(
            debouncedSearch
          )}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || 'Error al cargar consultas'
          );
        }

        setConsultas(data.consultas || []);

        if (data.pagination) {
          setPagination(data.pagination);
        }

      } catch (err) {

        console.error(err);

        setError(err.message);

      } finally {

        setLoading(false);

      }

    },
    [debouncedSearch]
  );


  // ============================================================
  // CARGAR AL INICIAR
  // ============================================================

  useEffect(() => {
    loadConsultas(1);
  }, [loadConsultas]);


  // ============================================================
  // CAMBIAR PÁGINA
  // ============================================================

  const handlePageChange = (page) => {
    loadConsultas(page);
  };


  // ============================================================
  // BUSCAR
  // ============================================================

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };


  // ============================================================
  // NUEVA CONSULTA
  // ============================================================

  const handleNewConsulta = () => {

    setEditingConsulta(null);

    setFormData(formularioInicial);

    setValidated(false);

    setError(null);

    setSuccess(null);

    setShowModal(true);
  };


  // ============================================================
  // EDITAR CONSULTA
  // ============================================================

  const handleEditConsulta = (consulta) => {

    setEditingConsulta(consulta.id_agenda);

    setFormData({
      id_tipo_documento:
        consulta.id_tipo_documento || '',

      numero_documento:
        consulta.numero_documento || '',

      primer_nombre:
        consulta.primer_nombre || '',

      segundo_nombre:
        consulta.segundo_nombre || '',

      primer_apellido:
        consulta.primer_apellido || '',

      segundo_apellido:
        consulta.segundo_apellido || '',

      fecha_nacimiento:
        consulta.fecha_nacimiento
          ? String(
              consulta.fecha_nacimiento
            ).substring(0, 10)
          : '',

      motivo:
        consulta.motivo || '',

      fecha_hora:
        consulta.fecha_hora
          ? String(
              consulta.fecha_hora
            ).substring(0, 16)
          : '',

      estado:
        consulta.estado || 'Pendiente'
    });

    setValidated(false);

    setError(null);

    setSuccess(null);

    setShowModal(true);
  };


  // ============================================================
  // CAMBIOS EN EL FORMULARIO
  // ============================================================

  const handleInputChange = (e) => {

    const {
      name,
      value
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

  };


  // ============================================================
  // TIPO DE DOCUMENTO
  // ============================================================

  const getTipoDocumentoNombre = (id) => {

    const tipos = {
      1: 'C.C.',
      2: 'C.E.',
      3: 'T.I.',
      4: 'Pasaporte'
    };

    return tipos[id] || id;
  };


  // ============================================================
  // GUARDAR / ACTUALIZAR
  // ============================================================

  const handleSaveConsulta = async (e) => {

    e.preventDefault();

    const form = e.currentTarget;

    if (!form.checkValidity()) {

      e.stopPropagation();

      setValidated(true);

      return;
    }

    setValidated(true);

    setError(null);

    try {

      const payload = {

        id_tipo_documento:
          parseInt(
            formData.id_tipo_documento,
            10
          ),

        numero_documento:
          formData.numero_documento,

        fecha_hora:
          formData.fecha_hora,

        motivo:
          formData.motivo,

        estado:
          formData.estado || 'Pendiente'
      };


      const url = editingConsulta
        ? `${API_URL}/${editingConsulta}`
        : API_URL;


      const method = editingConsulta
        ? 'PUT'
        : 'POST';


      const response = await fetch(
        url,
        {
          method: method,

          headers: {
            'Content-Type':
              'application/json'
          },

          body:
            JSON.stringify(payload)
        }
      );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data.error ||
          'Error al guardar la consulta'
        );
      }


      setSuccess(
        editingConsulta
          ? 'Consulta actualizada exitosamente'
          : 'Consulta agendada exitosamente'
      );


      setShowModal(false);

      setFormData(
        formularioInicial
      );

      setEditingConsulta(null);


      await loadConsultas(
        pagination.currentPage
      );


      setTimeout(() => {
        setSuccess(null);
      }, 3000);

    } catch (err) {

      console.error(err);

      setError(err.message);

    }

  };


  // ============================================================
  // ELIMINAR
  // ============================================================

  const handleDeleteConsulta = async (
    idAgenda
  ) => {

    if (!idAgenda) {

      setError(
        'No se encontró el ID de la consulta'
      );

      return;
    }


    const confirmar =
      window.confirm(
        '¿Está seguro de eliminar esta consulta?'
      );


    if (!confirmar) {
      return;
    }


    try {

      setError(null);


      const response =
        await fetch(
          `${API_URL}/${idAgenda}`,
          {
            method: 'DELETE'
          }
        );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data.error ||
          'Error al eliminar la consulta'
        );
      }


      setSuccess(
        data.mensaje ||
        'Consulta eliminada exitosamente'
      );


      await loadConsultas(
        pagination.currentPage
      );


      setTimeout(() => {
        setSuccess(null);
      }, 3000);

    } catch (err) {

      console.error(err);

      setError(err.message);

    }

  };


  // ============================================================
  // PAGINACIÓN
  // ============================================================

  const renderPagination = () => {

    const items = [];

    for (
      let number = 1;
      number <= pagination.totalPages;
      number++
    ) {

      items.push(

        <Pagination.Item
          key={number}
          active={
            number ===
            pagination.currentPage
          }
          onClick={() =>
            handlePageChange(number)
          }
        >
          {number}
        </Pagination.Item>

      );

    }

    return items;
  };


  // ============================================================
  // RENDER
  // ============================================================

  return (

    <div className="container-fluid">

      <h2 className="mb-4">
        Gestión de Consultas
      </h2>


      {/* ERROR */}

      {error && (

        <Alert
          variant="danger"
          dismissible
          onClose={() =>
            setError(null)
          }
        >
          {error}
        </Alert>

      )}


      {/* ÉXITO */}

      {success && (

        <Alert
          variant="success"
          dismissible
          onClose={() =>
            setSuccess(null)
          }
        >
          {success}
        </Alert>

      )}


      {/* BARRA DE BÚSQUEDA */}

      <div className="row mb-3">

        <div className="col-md-6">

          <InputGroup>

            <InputGroup.Text>
              <i className="bi bi-search"></i>
            </InputGroup.Text>

            <Form.Control
              type="text"
              placeholder="Buscar por documento, paciente o motivo..."
              value={searchTerm}
              onChange={handleSearch}
            />

          </InputGroup>

        </div>


        <div className="col-md-6 text-end">

          <Button
            variant="primary"
            onClick={
              handleNewConsulta
            }
          >
            <i className="bi bi-plus-circle me-2"></i>

            Nueva Consulta

          </Button>

        </div>

      </div>


      {/* TABLA */}

      <Table
        striped
        bordered
        hover
        responsive
      >

        <thead className="table-dark">

          <tr>

            <th>Documento</th>

            <th>Tipo Doc.</th>

            <th>Paciente</th>

            <th>F. Nacimiento</th>

            <th>Motivo</th>

            <th>Fecha y Hora</th>

            <th>Estado</th>

            <th>Acciones</th>

          </tr>

        </thead>


        <tbody>

          {loading ? (

            <tr>

              <td
                colSpan="8"
                className="text-center"
              >

                <div
                  className="spinner-border text-primary"
                  role="status"
                >

                  <span className="visually-hidden">
                    Cargando...
                  </span>

                </div>

              </td>

            </tr>

          ) : consultas.length === 0 ? (

            <tr>

              <td
                colSpan="8"
                className="text-center"
              >
                No se encontraron consultas
              </td>

            </tr>

          ) : (

            consultas.map(
              (consulta) => (

                <tr
                  key={
                    consulta.id_agenda
                  }
                >

                  <td>
                    {
                      consulta.numero_documento
                    }
                  </td>


                  <td>
                    {
                      getTipoDocumentoNombre(
                        consulta.id_tipo_documento
                      )
                    }
                  </td>


                  <td>

                    {`
                      ${consulta.primer_nombre || ''}
                      ${consulta.segundo_nombre || ''}
                      ${consulta.primer_apellido || ''}
                      ${consulta.segundo_apellido || ''}
                    `
                      .replace(
                        /\s+/g,
                        ' '
                      )
                      .trim()}

                  </td>


                  <td>

                    {consulta.fecha_nacimiento
                      ? new Date(
                          consulta.fecha_nacimiento
                        ).toLocaleDateString()
                      : '-'}

                  </td>


                  <td>
                    {consulta.motivo}
                  </td>


                  <td>

                    {consulta.fecha_hora
                      ? new Date(
                          consulta.fecha_hora
                        ).toLocaleString()
                      : '-'}

                  </td>


                  <td>

                    <span
                      className={`badge bg-${
                        consulta.estado ===
                        'Completada'
                          ? 'success'
                          : consulta.estado ===
                            'Cancelada'
                          ? 'danger'
                          : 'warning'
                      }`}
                    >

                      {
                        consulta.estado ||
                        'Pendiente'
                      }

                    </span>

                  </td>


                  <td>

                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() =>
                        handleEditConsulta(
                          consulta
                        )
                      }
                    >
                      ✏️
                    </Button>


                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() =>
                        handleDeleteConsulta(
                          consulta.id_agenda
                        )
                      }
                    >
                      🗑️
                    </Button>

                  </td>

                </tr>

              )
            )

          )}

        </tbody>

      </Table>


      {/* PAGINACIÓN */}

      {pagination.totalPages > 1 && (

        <div className="d-flex justify-content-between align-items-center">

          <div>
            Mostrando {consultas.length} de{' '}
            {pagination.totalItems} consultas
          </div>


          <Pagination>

            <Pagination.First
              onClick={() =>
                handlePageChange(1)
              }
              disabled={
                pagination.currentPage === 1
              }
            />


            <Pagination.Prev
              onClick={() =>
                handlePageChange(
                  pagination.currentPage - 1
                )
              }
              disabled={
                !pagination.hasPrevPage
              }
            />


            {renderPagination()}


            <Pagination.Next
              onClick={() =>
                handlePageChange(
                  pagination.currentPage + 1
                )
              }
              disabled={
                !pagination.hasNextPage
              }
            />


            <Pagination.Last
              onClick={() =>
                handlePageChange(
                  pagination.totalPages
                )
              }
              disabled={
                pagination.currentPage ===
                pagination.totalPages
              }
            />

          </Pagination>

        </div>

      )}


      {/* MODAL */}

      <Modal
        show={showModal}
        onHide={() =>
          setShowModal(false)
        }
        size="lg"
      >

        <Modal.Header closeButton>

          <Modal.Title>

            {editingConsulta
              ? 'Editar Consulta'
              : 'Nueva Consulta'}

          </Modal.Title>

        </Modal.Header>


        <Form
          noValidate
          validated={validated}
          onSubmit={
            handleSaveConsulta
          }
        >

          <Modal.Body>

            <div className="row">


              {/* TIPO DOCUMENTO */}

              <div className="col-md-6 mb-3">

                <Form.Group>

                  <Form.Label>
                    Tipo Documento *
                  </Form.Label>

                  <Form.Select
                    name="id_tipo_documento"
                    value={
                      formData.id_tipo_documento
                    }
                    onChange={
                      handleInputChange
                    }
                    required
                  >

                    <option value="">
                      Seleccione un tipo
                    </option>

                    <option value="1">
                      Cédula de Ciudadanía (C.C.)
                    </option>

                    <option value="2">
                      Cédula de Extranjería (C.E.)
                    </option>

                    <option value="3">
                      Tarjeta de Identidad (T.I.)
                    </option>

                    <option value="4">
                      Pasaporte
                    </option>

                  </Form.Select>

                  <Form.Control.Feedback type="invalid">
                    El tipo de documento es requerido
                  </Form.Control.Feedback>

                </Form.Group>

              </div>


              {/* DOCUMENTO */}

              <div className="col-md-6 mb-3">

                <Form.Group>

                  <Form.Label>
                    Número de Documento *
                  </Form.Label>

                  <Form.Control
                    type="text"
                    name="numero_documento"
                    value={
                      formData.numero_documento
                    }
                    onChange={
                      handleInputChange
                    }
                    required
                    disabled={
                      editingConsulta !== null
                    }
                    maxLength="20"
                    placeholder="Número de documento"
                  />

                  <Form.Control.Feedback type="invalid">
                    El número de documento es requerido
                  </Form.Control.Feedback>

                </Form.Group>

              </div>


              {/* FECHA DE NACIMIENTO */}

              <div className="col-md-6 mb-3">

                <Form.Group>

                  <Form.Label>
                    Fecha de Nacimiento *
                  </Form.Label>

                  <Form.Control
                    type="date"
                    name="fecha_nacimiento"
                    value={
                      formData.fecha_nacimiento
                    }
                    onChange={
                      handleInputChange
                    }
                    required
                  />

                  <Form.Control.Feedback type="invalid">
                    La fecha de nacimiento es requerida
                  </Form.Control.Feedback>

                </Form.Group>

              </div>


              {/* FECHA Y HORA */}

              <div className="col-md-6 mb-3">

                <Form.Group>

                  <Form.Label>
                    Fecha y Hora de la Consulta *
                  </Form.Label>

                  <Form.Control
                    type="datetime-local"
                    name="fecha_hora"
                    value={
                      formData.fecha_hora
                    }
                    onChange={
                      handleInputChange
                    }
                    required
                  />

                  <Form.Control.Feedback type="invalid">
                    La fecha y hora son requeridas
                  </Form.Control.Feedback>

                </Form.Group>

              </div>


              {/* MOTIVO */}

              <div className="col-12 mb-3">

                <Form.Group>

                  <Form.Label>
                    Motivo de la Consulta *
                  </Form.Label>

                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="motivo"
                    value={
                      formData.motivo
                    }
                    onChange={
                      handleInputChange
                    }
                    required
                    placeholder="Ej: Valoración de agudeza visual y control de fórmula"
                  />

                  <Form.Control.Feedback type="invalid">
                    El motivo es requerido
                  </Form.Control.Feedback>

                </Form.Group>

              </div>

            </div>

          </Modal.Body>


          <Modal.Footer>

            <Button
              variant="secondary"
              onClick={() =>
                setShowModal(false)
              }
            >
              Cancelar
            </Button>


            <Button
              variant="primary"
              type="submit"
            >

              {editingConsulta
                ? 'Actualizar'
                : 'Guardar'}

            </Button>

          </Modal.Footer>

        </Form>

      </Modal>

    </div>

  );
}


export default AgendarConsulta;