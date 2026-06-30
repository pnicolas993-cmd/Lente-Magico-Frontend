// Servidor de prueba para simular el backend de Lente Magico
const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

const db = router.db;

// -------------------------------------------------------
// Crear usuario administrador si no existe
// -------------------------------------------------------

const ADMIN_CORREO = "admin@mail.com";
const ADMIN_PASSWORD = "1234";
const ID_AUTORIZACION_ADMIN = 1; // 1 = Administrador en la tabla autorizaciones

const adminExists = db.get("usuarios").find({ correo: ADMIN_CORREO }).value();

if (!adminExists) {
    // Calcular el siguiente id disponible en usuarios
    const usuarios = db.get("usuarios").value();
    const nuevoId = usuarios.length > 0
        ? Math.max(...usuarios.map(u => u.id)) + 1
        : 1;

    // Crear el usuario admin
    db.get("usuarios")
        .push({
            id: nuevoId,
            login: "admin",
            correo: ADMIN_CORREO,
            contraseña: ADMIN_PASSWORD,
            activar_usuario: true,
            clave_idioma: "es",
            clave_activacion: "ACT-ADMIN",
            llave_reinicio: null,
            hora_reinicio: null
        })
        .write();

    // Asociar el usuario admin con la autorizacion de Administrador
    db.get("autorizacion_usuario")
        .push({
            id_autorizacion: ID_AUTORIZACION_ADMIN,
            id_sistema_usuario: nuevoId
        })
        .write();
    console.log(`Usuario admin creado -> correo: ${ADMIN_CORREO} / password: ${ADMIN_PASSWORD} (id: ${nuevoId})`);
} else {
    console.log("El usuario admin ya existe, no se vuelve a crear.");
}

// -------------------------------------------------------
// Ruta de login -> POST /login
// Body esperado: { "correo": "...", "contraseña": "..." }
// -------------------------------------------------------

server.post("/login", (req, res) => {
    const { correo, contraseña } = req.body;

    if (!correo || !contraseña) {
        return res.status(400).json({ error: "Debes enviar correo y contraseña." });
    }

    const usuario = db.get("usuarios").find({ correo }).value();

    if (!usuario) {
        return res.status(404).json({ error: "Usuario no encontrado." });
    }

    if (usuario.contraseña !== contraseña) {
        return res.status(401).json({ error: "Contraseña incorrecta." });
    }

    if (usuario.activar_usuario === false) {
        return res.status(403).json({ error: "El usuario no está activado." });
    }

    // Buscar la autorizacion (rol) del usuario
    const relacion = db.get("autorizacion_usuario")
        .find({ id_sistema_usuario: usuario.id })
        .value();

    const autorizacion = relacion
        ? db.get("autorizaciones").find({ id: relacion.id_autorizacion }).value()
        : null;

    // No devolvemos la contraseña en la respuesta
    const { contraseña: _omit, ...usuarioSinPassword } = usuario;

    return res.status(200).json({
        mensaje: "Login exitoso",
        usuario: usuarioSinPassword,
        rol: autorizacion ? autorizacion.nombre : "Sin rol asignado"
    });
});

// -------------------------------------------------------
// Rutas normales de json-server (CRUD para todas las colecciones)
// -------------------------------------------------------

server.use(router);

server.listen(3000, () => {
    console.log("Api corriendo ");
});